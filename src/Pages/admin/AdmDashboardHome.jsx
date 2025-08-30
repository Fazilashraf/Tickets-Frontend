import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaUsers } from "react-icons/fa6";
import { IoIosCart } from "react-icons/io";
import { RiFeedbackFill } from "react-icons/ri";
import { SiNginxproxymanager } from "react-icons/si";
import './AdmDashboardHome.css'
import { getAllEventBookingsAPI, getAllMovieBookingsAPI, getAllOrganisersAPI, getAllSportBookingsAPI, getAllTestimoniesAPI, getAllUsersAPI } from '../../Services/allAPI';

function AdmDashboardHome() {

  const [allUsers, setAllUsers] = useState([])
  const [allOrganisers, setAllOrganisers] = useState([])
  const [movieBookings, setMovieBookings] = useState([]);
  const [eventBookings, setEventBookings] = useState([]);
  const [sportBookings, setSportBookings] = useState([]);
  const [allTestimonies, setAllTestimonies] = useState([]);

  useEffect(() => {
    getAllUsers();
    getAllOrganisers();
    getAllMBookings();
    getAllEBookings();
    getAllSBookings();
    getAllTestimonies();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await getAllUsersAPI()
      console.log(response);
      setAllUsers(response.data)
    }
    catch (err) {
      console.log(err);
    }
  }

  const getAllOrganisers = async () => {
    try {
      const response = await getAllOrganisersAPI()
      console.log(response);
      setAllOrganisers(response.data)
    }
    catch (err) {
      console.log(err);
    }
  }

  const getAllMBookings = async () => {
    try {
      const response = await getAllMovieBookingsAPI()
      console.log(response);
      setMovieBookings(response.data)
    }
    catch (err) {
      console.log(err);
    }
  }

  const getAllEBookings = async () => {
    try {
      const response = await getAllEventBookingsAPI()
      console.log(response);
      setEventBookings(response.data)
    }
    catch (err) {
      console.log(err);
    }
  }

  const getAllSBookings = async () => {
    try {
      const response = await getAllSportBookingsAPI()
      console.log(response);
      setSportBookings(response.data)
    }
    catch (err) {
      console.log(err);
    }
  }

  const totalBookings = movieBookings.length + eventBookings.length + sportBookings.length

  const getAllTestimonies = async () => {
    try {
      const response = await getAllTestimoniesAPI()
      console.log(response);
      setAllTestimonies(response.data)
    }
    catch (err) {
      console.log(err);
    }
  }

  const options = {
    title: {
      text: 'Monthly Ticket Sales'
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
    },
    yAxis: {
      title: {
        text: 'Tickets Sold'
      }
    },
    series: [
      {
        name: 'Movies',
        data: [120, 200, 150, 100, 150]
      },
      {
        name: 'Events',
        data: [90, 150, 100, 130, 110]
      },
      {
        name: 'Sports',
        data: [80, 120, 90, 115, 100]
      }
    ]
  };

  return (
    <>
      <h2 className='text-light p-2'>Welcome <span style={{ color: 'rgb(15, 220, 172)' }}>Admin</span></h2>

      <ul className='d-flex justify-content-start mt-3' style={{ listStyle: 'none' }}>

        <li className='Top-div border p-2 text-light rounded bg-warning w-25 me-2'>
          <div className='d-flex justify-content-between'>
            <div>
              <h5>{allUsers.length}</h5>
              <h6>Total Users</h6>
            </div>
            <h1 className='fs-1'><FaUsers style={{ fontSize: '50px' }} /></h1>
          </div>
        </li>

        <li className='Top-div border p-2 text-light rounded bg-danger w-25 me-2'>
          <div className='d-flex justify-content-between'>
            <div>
              <h5>{allOrganisers.length}</h5>
              <h6>Total Organisers</h6>
            </div>
            <h1 className='fs-1'><SiNginxproxymanager style={{ fontSize: '50px' }} /></h1>
          </div>
        </li>

        <li className='Top-div border p-2 text-light rounded bg-primary w-25 me-2'>
          <div className='d-flex justify-content-between'>
            <div>
              <h5>{totalBookings}</h5>
              <h6>Total Bookings</h6>
            </div>
            <h1 className='fs-1'><IoIosCart style={{ fontSize: '50px' }} /></h1>
          </div>
        </li>

        <li className='Top-div border p-2 text-light rounded bg-dark w-25 me-2'>
          <div className='d-flex justify-content-between'>
            <div>
              <h5>{allTestimonies.length}</h5>
              <h6>Total Testimonies</h6>
            </div>
            <h1 className='fs-1'><RiFeedbackFill style={{ fontSize: '50px' }} /></h1>
          </div>
        </li>
      </ul>

      <div className='d-flex mt-4 ms-4'>
        <div style={{ width: '550px' }}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>

        <div className='ms-3'>
          <Calendar />
        </div>
      </div>

    </>
  );
}

export default AdmDashboardHome;
