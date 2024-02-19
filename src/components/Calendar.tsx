import React, { Component, ChangeEvent } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import multiMonthPlugin from '@fullcalendar/multimonth';

interface Holiday {
  country: string;
  iso: string;
  year: number;
  date: string;
  day: string;
  name: string;
  type: string;
}

interface CalendarState {
  holidays: any[];
  isLoading: boolean;
  selectedYear: number;
  location: string;
  geolocationError: boolean;
}

class Calendar extends Component<{}, CalendarState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      holidays: [],
      isLoading: false,
      selectedYear: new Date().getFullYear(),
      location: 'US',
      geolocationError: false,
    };
  }

  componentDidMount() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        this.handleLocationSuccess,
        this.handleLocationError
      );
    } else {
      console.error('Geolocation is not supported.');
      this.setState({ geolocationError: true });
      this.fetchHolidays();
    }
  }

  handleLocationSuccess = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    const geocode_key = process.env.REACT_APP_GEOCODE_API_KEY
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${geocode_key}`)
      .then(response => response.json())
      .then(data => {
        const countryCode = data.results[0].components['ISO_3166-1_alpha-2'];
        console.log(countryCode);
        this.setState({ location: countryCode });
        this.fetchHolidays();
      })
      .catch(error => {
        console.error('Error fetching default location:', error);
        this.fetchHolidays();
      });
  };

  handleLocationError = (error: GeolocationPositionError) => {
    console.error('Error getting location:', error.message);
    this.setState({ geolocationError: true });
    this.fetchHolidays();
  };

  handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ location: event.target.value });
    this.fetchHolidays();
  };

  fetchHolidays = () => {
    const { selectedYear, location } = this.state;

    this.setState({ isLoading: true });

    fetch(`https://api.api-ninjas.com/v1/holidays?country=${location}&year=${selectedYear}&type=major_holiday`, {
      headers: {
        'X-Api-Key': process.env.REACT_APP_HOLIDAYS_API_KEY || ''
      }
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          const events = data.map((holiday: Holiday, index: number) => ({
            id: `${holiday.iso}-${holiday.date}-${index}`,
            title: holiday.name,
            start: holiday.date
          }));
          this.setState({
            holidays: events,
            isLoading: false
          });
        }
      })
      .catch(error => console.error('Error fetching holidays:', error));
  };

  render() {
    const { holidays, isLoading, location, geolocationError } = this.state;

    if (geolocationError) {
      return <div>Error: Geolocation is not supported.</div>;
    }

    if (isLoading) {
      return <div>Loading...</div>;
    }

    const calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, multiMonthPlugin],
      events: holidays,
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,multiMonthYear'
      }
    };

    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center mb-4">
          <div className="text-lg font-semibold bg-blue-500 text-white py-2 px-4 rounded">
            Holiday Calendar
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="mr-2">Location (Enter ISO 3166 code) :</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={this.handleLocationChange}
          />
          <button type="submit" onClick={this.fetchHolidays} style={{ backgroundColor: '#2c3e50', color: 'white' }}>Get Holidays</button>
        </div>
        <FullCalendar {...calendarOptions} />
      </div>
    );
  }
}

export default Calendar;
