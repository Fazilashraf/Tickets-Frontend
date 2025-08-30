import React, { useEffect, useState } from 'react';
import { MdMovieFilter } from "react-icons/md";
import { MdOutlineEventNote } from "react-icons/md";
import { TbShirtSport } from "react-icons/tb";
import { MdReviews } from "react-icons/md";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getAllEventsAPI, getAllMoviesAPI, getAllSportsAPI } from '../../Services/allAPI';
import './DashboardHome.css'

function DashboardHome() {

  const [allMovies, setAllMovies] = useState([])
  const [allEvents, setAllEvents] = useState([])
  const [allSports, setAllSports] = useState([])

  useEffect(() => {
    getAllMovies();
  }, []);

  useEffect(() => {
    getAllEvents();
  }, []);

  useEffect(() => {
    getAllSports();
  }, []);

  const getAllMovies = async () => {
    try {
      const response = await getAllMoviesAPI()
      console.log(response);
      setAllMovies(response.data)
    }
    catch (err) {
      console.log(err);
    }
  }

  const getAllEvents = async () => {
    try {
      const response = await getAllEventsAPI()
      console.log(response);
      setAllEvents(response.data)
    }
    catch (err) {
      console.log(err);
    }
  }

  const getAllSports = async () => {
    try {
      const response = await getAllSportsAPI()
      console.log(response);
      setAllSports(response.data)
    }
    catch (err) {
      console.log(err);
    }
  }

  const allReviews = allMovies.flatMap(movie =>
    movie.reviews.map(review => ({
      ...review,
      movieName: movie.name,
      movieId: movie._id,
      reviewId: review._id
    }))
  ).sort((a, b) => new Date(b.date) - new Date(a.date));

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
        data: [120, 200, 150, 110, 180]
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
      <h2 className='text-light p-2'>Welcome <span style={{ color: 'rgb(15, 220, 172)' }}>Organiser</span></h2>

      <ul className='d-flex justify-content-start mt-3' style={{ listStyle: 'none' }}>

        <li className='Top-div border p-2 text-light rounded bg-warning w-25 me-2'>
          <div className='d-flex justify-content-between'>
            <div>
              <h5>{allMovies.length}</h5>
              <h6>Total Movies</h6>
            </div>
            <h1 className='fs-1'><MdMovieFilter style={{ fontSize: '50px' }} /></h1>
          </div>
        </li>

        <li className='Top-div border p-2 text-light rounded bg-danger w-25 me-2'>
          <div className='d-flex justify-content-between'>
            <div>
              <h5>{allEvents.length}</h5>
              <h6>Total Events</h6>
            </div>
            <h1 className='fs-1'><MdOutlineEventNote style={{ fontSize: '50px' }} /></h1>
          </div>
        </li>

        <li className='Top-div border p-2 text-light rounded bg-primary w-25 me-2'>
          <div className='d-flex justify-content-between'>
            <div>
              <h5>{allSports.length}</h5>
              <h6>Total Sports</h6>
            </div>
            <h1 className='fs-1'><TbShirtSport style={{ fontSize: '50px' }} /></h1>
          </div>
        </li>

        <li className='Top-div border p-2 text-light rounded bg-dark w-25 me-2'>
          <div className='d-flex justify-content-between'>
            <div>
              <h5>{allReviews.length}</h5>
              <h6>Total Reviews</h6>
            </div>
            <h1 className='fs-1'><MdReviews style={{ fontSize: '50px' }} /></h1>
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

export default DashboardHome;
