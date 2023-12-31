const axios = require('axios');

class HolidaysController {
  static async getHolidays(req, res) {
    try {
      const year = req.params.year;
      const calender = await axios.get('https://www.googleapis.com/calendar/v3/calendars/en.ng%23holiday%40group.v.calendar.google.com/events?key=AIzaSyAUSwWUxEG3-7tam4paF7wRL65IGaVoPqE');
      const events = calender.data.items;
      // filter events by year
      const yearEvents = events.filter((event) => {
        const { start } = event;
        const eventYear = start.date.split('-')[0];
        return eventYear === year;
      })
      // map events to return only the required details
      const eventDetails = yearEvents.map((event) => {
        const { summary, start } = event;
        const startDate = new Date(start.date);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return {
          name: summary,
          date: start.date,
          day: days[startDate.getDay()],
        }
      })
      // filter out non-holidays
      const notHolidays = ['Valentine\'s Day', 'Ash Wednesday', 'Women\'s Day', 'Mothering Sunday', 'Father\'s Day', 'Children\'s Day'];
      const filteredEvents = eventDetails.filter((event) => {
        return !notHolidays.includes(event.name);
      })
      res.status(200).json(filteredEvents);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = HolidaysController;