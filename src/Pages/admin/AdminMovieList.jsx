import React, { useEffect, useState } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { getAllMoviesAPI } from '../../Services/allAPI';
import { ToastContainer } from 'react-toastify';

function AdminMovieList() {

  const [allMovies, setAllMovies] = useState([])

  useEffect(() => {
    getAllMovies();
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

  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 3;

  const sortedMovies = [...allMovies].sort((a, b) => new Date(b.date) - new Date(a.date));

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = sortedMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPages = Math.ceil(allMovies.length / moviesPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map(num => num + 1);

  return (
    <div>
      <h2 className='text-center text-light mb-4'>Movies List</h2>

      <MDBTable className='text-light'>
        <MDBTableHead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Genre</th>
            <th scope='col'>Language</th>
            <th scope='col'>Duration</th>
            <th scope='col'>Released date</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {currentMovies.map((movie, index) => (
            <tr key={movie._id}>
              <th scope='row'>{indexOfFirstMovie + index + 1}</th>
              <td>
                <img className='me-1' width={40} src={movie.movImg} alt="" />
                {movie.name}
              </td>
              <td>{movie.genre}</td>
              <td>{movie.language}</td>
              <td>{movie.duration}</td>
              <td>{movie.date}</td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      <div className="d-flex justify-content-center mt-3">
        {pageNumbers.map(number => (
          <button
            key={number}
            className={`btn btn-sm mx-1 ${currentPage === number ? 'btn-primary' : 'btn-outline-light'}`}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}
      </div>
      <ToastContainer />
    </div>
  )
}

export default AdminMovieList