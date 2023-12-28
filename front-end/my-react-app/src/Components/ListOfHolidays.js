import React, { useState, useEffect } from 'react'
import './styles/ListOfHolidays.css'

function ListOfHolidays() {
  const currentYear = new Date().getFullYear();
  const [holidays, setHolidays] = useState();
  const [year, setYear] = useState(currentYear);

  useEffect(() => {
    // eslint-disable-next-line
    fetch(`http://localhost:5000/holidays/${year}`, { cache: "no-store"})
      .then(res => res.json())
      .then(data => setHolidays(data))
      .catch(err => console.log(err));
  }, [year]);

  useEffect(() => {
    console.log(holidays);
  }, [holidays]);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  }
  if (!holidays) {
    return <div>Loading...</div>
  }

  return (
    <div className='holidays'>
      <h3>List of Holidays</h3>
      <label className='holidaysLabel'>
        Select Year:&nbsp;
        <select value={year} onChange={handleYearChange}>
          <option value={currentYear -1 }>{currentYear - 1}</option>
          <option value={currentYear}>{currentYear}</option>
          <option value={currentYear + 1}>{currentYear + 1}</option>
        </select>
      </label>
      <table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Occasion/Festival</th>
            <th>Date</th>
            <th>Day</th>
          </tr>
        </thead>
        <tbody>
          {holidays.map((holiday, index) => (
            <tr key={index} className={index % 2 === 0 ? 'odd' : 'even'}>
              <td>{index + 1}</td>
              <td>{holiday.name}</td>
              <td>{holiday.date}</td>
              <td>{holiday.day}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListOfHolidays