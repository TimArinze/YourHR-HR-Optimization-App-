import React from 'react'
import taskboxLogo from './images/dashboardLogos/taskbox.png'
import employeeLogo from './images/dashboardLogos/employees.png'
import leaveLogo from './images/dashboardLogos/leaves.png'
import helpDeskLogo from './images/dashboardLogos/helpdesk.png'
import performanceLogo from './images/dashboardLogos/performance.png'
import salaryLogo from './images/dashboardLogos/salary.jpg'
import hrDocumentLogo from './images/dashboardLogos/hr-documents.png'
import recruitmentLogo from './images/dashboardLogos/recruitment.png'
import calenderLogo from './images/dashboardLogos/calendar.png'
import attendanceLogo from './images/dashboardLogos/attendance.png'
import reimbursementLogo from './images/dashboardLogos/reimbursement.png'
import travelLogo from './images/dashboardLogos/travel.png'

function Dashboard() {
  return (
    <div>
    <main>
      <section className='section section-dashboard'>
        <div className='section-dashboard-container'>
          <ul className='row'>
            <li className='col-4'>
              <article className='card-dashboard'>
                <a href='/taskbox'>
                <div className='card-outer'>
                  <div className='card-image'>
                    <img src={taskboxLogo} alt='Taskbox' />
                  </div>
                  <div className='card-content'>
                    <h3 className='card-title'>
                      <a href='/taskbox'>Taskbox</a>
                    </h3>
                  </div>
                </div>
                </a>
              </article>
            </li>
            <li className='col-4'>
              <article className='card-dashboard'>
                <a href='/employees'>
                <div className='card-outer'>
                  <div className='card-image'>
                    <img src={employeeLogo} alt='Employees' />
                  </div>
                  <div className='card-content'>
                    <h3 className='card-title'>
                      <a href='/employees'>Employees</a>
                    </h3>
                  </div>
                </div>
                </a>
              </article>
            </li>
            <li className='col-4'>
              <article className='card-dashboard'>
                <a href='/leave'>
                <div className='card-outer'>
                  <div className='card-image'>
                    <img src={leaveLogo} alt='Leave' />
                  </div>
                  <div className='card-content'>
                    <h3 className='card-title'>
                      <a href='/leave'>Leave</a>
                    </h3>
                  </div>
                </div>
                </a>
              </article>
            </li>
            <li className='col-4'>
              <article className='card-dashboard'>
                <a href='/helpdesk'>
                <div className='card-outer'>
                  <div className='card-image'>
                    <img src={helpDeskLogo} alt='Help Desk' />
                  </div>
                  <div className='card-content'>
                    <h3 className='card-title'>
                      <a href='/helpdesk'>Help Desk</a>
                    </h3>
                  </div>
                </div>
                </a>
              </article>
            </li>
            <li className='col-4'>
              <article className='card-dashboard'>
                <a href='/performance'>
                <div className='card-outer'>
                  <div className='card-image'>
                    <img src={performanceLogo} alt='Performance' />
                  </div>
                  <div className='card-content'>
                    <h3 className='card-title'>
                      <a href='/performance'>Performance</a>
                    </h3>
                  </div>
                </div>
                </a>
              </article>
            </li>
            <li className='col-4'>
              <article className='card-dashboard'>
                <a href='/salary'>
                <div className='card-outer'>
                  <div className='card-image'>
                    <img src={salaryLogo} alt='Salary' />
                  </div>
                  <div className='card-content'>
                    <h3 className='card-title'>
                      <a href='/salary'>Salary</a>
                    </h3>
                  </div>
                </div>
                </a>
              </article>
            </li>
            <li className='col-4'>
              <article className='card-dashboard'>
                <a href='/travel'>
                <div className='card-outer'>
                  <div className='card-image'>
                    <img src={travelLogo} alt='Travel' />
                  </div>
                  <div className='card-content'>
                    <h3 className='card-title'>
                      <a href='/travel'>Travel</a>
                    </h3>
                  </div>
                </div>
                </a>
              </article>
            </li>
            <li className='col-4'>
              <article className='card-dashboard'>
                <a href='/recruitment'>
                <div className='card-outer'>
                  <div className='card-image'>
                    <img src={recruitmentLogo} alt='Recruitment' />
                  </div>
                  <div className='card-content'>
                    <h3 className='card-title'>
                      <a href='/recruitment'>Recruitment</a>
                    </h3>
                  </div>
                </div>
                </a>
              </article>
            </li>
            <li className='col-4'>
              <article className='card-dashboard'>
                <a href='/calendar'>
                <div className='card-outer'>
                  <div className='card-image'>
                    <img src={calenderLogo} alt='Calendar' />
                  </div>
                  <div className='card-content'>
                    <h3 className='card-title'>
                      <a href='/calendar'>Calendar</a>
                    </h3>
                  </div>
                </div>
                </a>
              </article>
            </li>
            <li className='col-4' >
              <article className='card-dashboard'>
                <a href='/attendance'>
                <div className='card-outer'>
                  <div className='card-image'>
                    <img src={attendanceLogo} alt='Attendance' />
                  </div>
                  <div className='card-content'>
                    <h3 className='card-title'>
                      <a href='/attendance'>Attendance</a>
                    </h3>
                  </div>
                </div>
                </a>
              </article>
            </li>
            <li className='col-4' >
              <article className='card-dashboard'>
                <a href='/reimbursement'>
                <div className='card-outer'>
                  <div className='card-image'>
                    <img src={reimbursementLogo} alt='Reimbursement' />
                  </div>
                  <div className='card-content'>
                    <h3 className='card-title'>
                      <a href='/reimbursement'>Reimbursement</a>
                    </h3>
                  </div>
                </div>
                </a>
              </article>
            </li>
            <li className='col-4' >
              <article className='card-dashboard'>
                <a href='/hrdocuments'>
                <div className='card-outer'>
                  <div className='card-image'>
                    <img src={hrDocumentLogo} alt='HR Documents' />
                  </div>
                  <div className='card-content'>
                    <h3 className='card-title'>
                      <a href='/hrdocuments'>HR Documents</a>
                    </h3>
                  </div>
                </div>
                </a>
              </article>
            </li>
          </ul>
        </div>
      </section>
    </main>
    </div>
  )
}

export default Dashboard