import React, { useEffect, useState } from 'react'
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { deleteMovieAPI, getAllMoviesAPI } from '../../Services/allAPI';
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function MovieList() {

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

  const navigate = useNavigate()

  const editMovie = (id) => {
    navigate(`/organiser/dashboard/movies/edit/${id}`);
    scrollTo(0, 0)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie")) {
      try {
        await deleteMovieAPI(id);
        toast.success("Movie deleted successfully")
        getAllMovies()
      }
      catch (err) {
        toast.error("Failed to delete movie")
      }
    }
  }

  return (
    <div>
      <h2 className='text-center text-light'>Movies List</h2>

      <a href="/organiser/dashboard/movies/add"><button className='mt-3 btn btn-outline-light'>Add Movie</button></a>

      <MDBTable className='text-light'>
        <MDBTableHead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Genre</th>
            <th scope='col'>Language</th>
            <th scope='col'>Duration</th>
            <th scope='col'>Release date</th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
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
              <td><FaEdit style={{ cursor: 'pointer' }} onClick={() => editMovie(movie._id)} className='text-warning fs-4' /></td>
              <td><AiFillDelete onClick={() => handleDelete(movie._id)} style={{ cursor: 'pointer' }} className='text-danger fs-4' /></td>
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

export default MovieList