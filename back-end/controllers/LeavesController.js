const axios = require('axios');
require('dotenv').config();
const redisClient = require('../utils/redis')
const File = require('../models/file')
const User = require('../models/user')
const Leave = require('../models/leave')
const ObjectId = require('mongodb').ObjectId;
const fs = require('fs');


class LeavesController {
  static async getHolidays(req, res) {
    try {
      const year = req.params.year;
      const calenderId = 'en.ng%23holiday%40group.v.calendar.google.com'
      const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
      const calender = await axios.get(`https://www.googleapis.com/calendar/v3/calendars/${calenderId}/events?key=${apiKey}`);
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

  static async postLeave (req, res) {
    const token = req.get('X-token');
    const key = `auth_${token}`;
    const userID = await redisClient.get(key);
    if (!userID) {
      return res.status(401).json({error: 'Unauthorized'});
    }
    const { fromDate, toDate, leaveType, leaveReason } = req.body;
    if (!fromDate) {
      return res.status(400).json({error: 'Missing fromDate'})
    }
    if (!toDate) {
      return res.status(400).json({error: "Missing toDate"})
    }
    if (!leaveType) {
      return res.status(400).json({error: "Missing leaveType"})
    }
    if (!leaveReason) {
      return res.status(400).json({error: "Missing leaveReason"})
    }
    const user = await User.findById(ObjectId(userID));
    if (!user) {
      return res.status(400).json({error: 'Unauthorized'})
    }
  }
}

module.exports = LeavesController;