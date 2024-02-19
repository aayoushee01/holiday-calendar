# Holiday Calendar App

This is a simple holiday calendar application built with React, using the FullCalendar library to display holidays based on the selected location and year.

Month View
<img width="1728" alt="Screenshot 2024-02-19 at 7 26 36 AM" src="https://github.com/aayoushee01/holiday-calendar/assets/75840618/8a58f19c-7e46-49aa-8a39-edf21d7930f9">

Year View
<img width="1728" alt="Screenshot 2024-02-19 at 7 26 44 AM" src="https://github.com/aayoushee01/holiday-calendar/assets/75840618/535fd9e4-efca-4daa-8eb2-c2ef5ee5da72">


## Features

- Displays holidays based on the selected location (ISO 3166 code) and year
- Automatically detects the user's location using geolocation (if supported)
- Allows manual input of location
- Fetches holiday data from an external API
- Responsive design for various screen sizes

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your_username/holiday-calendar-app.git
    ```
2. Navigate into the project directory:
   ```bash
   cd holiday-calendar-app
    ```
3. Install dependencies:
    ```bash
   npm install
    ```
4. Create a .env file in the root directory and add your API keys:
   ```bash
   REACT_APP_GEOCODE_API_KEY=your_geocode_api_key_here
   REACT_APP_HOLIDAYS_API_KEY=your_holidays_api_key_here
    ```
    Replace your_geocode_api_key_here and your_holidays_api_key_here with your actual API keys.
5. Start the development server:
    ```bash
   npm start
   ```
## Usage
Enter the ISO 3166 code for the desired location (e.g., "US" for United States, "GB" for United Kingdom).
Click the "Get Holidays" button to fetch and display the holidays for the selected location and year.
Navigate between months using the navigation buttons on the calendar.
The calendar will display the holidays for each month.

## Contributing
Contributions are welcome! If you find any bugs or have suggestions for improvements, please feel free to open an issue or submit a pull request.

