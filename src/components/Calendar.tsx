import React, { Component, ChangeEvent } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

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
  selectedCountry: string;
  selectedYear: number;
}

class Calendar extends Component<{}, CalendarState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      holidays: [],
      isLoading: false,
      selectedCountry: 'CA',
      selectedYear: new Date().getFullYear()
    };
  }

  handleChangeCountry = (event: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedCountry: event.target.value }, () => {
      this.fetchHolidays();
    });
  };

  fetchHolidays = () => {
    const { selectedCountry, selectedYear } = this.state;

    this.setState({ isLoading: true });

    fetch(`https://api.api-ninjas.com/v1/holidays?country=${selectedCountry}&year=${selectedYear}`, {
      headers: {
        'X-Api-Key': 'pX4U/gwLvF/rbSokQ2ClYA==ueajTJ35XyPrFTgp'
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

  componentDidMount() {
    this.fetchHolidays();
  }

  render() {
    const { holidays, isLoading, selectedCountry, selectedYear } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center mb-4">
          <div className="text-lg font-semibold bg-blue-500 text-white py-2 px-4 rounded">
            Holiday Calendar
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="mr-2">Select Country:</label>
          <select id="country" value={selectedCountry} onChange={this.handleChangeCountry}>
            <option value="CA">Canada</option>
          </select>
        </div>
        <FullCalendar initialView="dayGridMonth" plugins={[dayGridPlugin]} events={holidays} />
      </div>
    );
  }
}

export default Calendar;
