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
    const { daysCount, leaveType } = req.body;
    if (!leaveType) {
      return res.status(400).json({error: "Missing leaveType"})
    }
    if (!daysCount) {
      return res.status(400).json({error: "Missing daysCount"})
    }
    const user = await User.findById(ObjectId(userID));
    if (!user) {
      return res.status(400).json({error: 'Unauthorized'})
    }
    //check if leave is the database for the said name
    const documents = await Leave.findOne({userId: user._id})
    if (!documents) {
      await Leave.create({ userId: newUser._id})
    }
    //calculations to be updated
    if (leaveType === 'AnnualLeave' || 'CasualLeave' || 'MaternityLeave') {
      const used = Number(documents.AnnualLeave.used) + Number(daysCount)
      const requested = Number(daysCount)
      const remaining = Number(documents.AnnualLeave.total) - Number(documents.AnnualLeave.used) - requested;
      const updateQuery = {
        userId: user._id,
        $set: {
          [`${leaveType}.used`] : used,
          [`${leaveType}.requested`] : requested,
          [`${leaveType}.remaining`] : remaining,
          },
      }
      try {
        const update = await Leave.findOneAndUpdate(updateQuery)
        return res.status(201).json({update})
      } catch (err) {
        console.error('Error creating user: ', err);
        return res.status(500).json({error: 'Internal Server Error'})
      }
    } else if (leaveType === 'SickLeave') {
      const used = Number(documents.AnnualLeave.used) + Number(daysCount);
      const total = used;
      const requested = Number(daysCount)
      const updateQuery = {
        userId: user._id,
        $set: {
          [`${leaveType}.used`] : used,
          [`${leaveType}.requested`] : requested,
          [`${leaveType}.total`] : total,
        },
        new: true
      }
      try {
        const update = await Leave.findOneAndUpdate(updateQuery)
        return res.status(201).json({update})
      } catch (err) {
        console.error('Error creating user: ', err);
        return res.status(500).json({error: 'Internal Server Error'})
      }
    }
  }
  static async getLeave (req, res) {
    const token = req.get('X-token');
    const key = `auth_${token}`;
    const userID = await redisClient.get(key)
    if (!userID) {
      return res.status(401).json({error: "Unauthorized"})
    }
    const user = await User.findOne({_id: ObjectId(userID)})
    const documents = await Leave.findOne({userId: user._id})
    if (!documents) {
      return res.status(400).json({error: "No leave found"})
    }
    return res.status(200).json({documents})
  }
}

module.exports = LeavesController;