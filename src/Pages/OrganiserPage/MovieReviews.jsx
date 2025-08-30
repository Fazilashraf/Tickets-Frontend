import React, { useEffect, useState } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { deleteReviewAPI, getAllMoviesAPI } from '../../Services/allAPI';
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function MovieReviews() {

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

  const allReviews = allMovies.flatMap(movie =>
    movie.reviews.map(review => ({
      ...review,
      movieName: movie.name,
      movieId: movie._id,
      reviewId: review._id
    }))
  ).sort((a, b) => new Date(b.date) - new Date(a.date));


  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = allReviews.slice(indexOfFirstReview, indexOfLastReview);

  const totalPages = Math.ceil(allReviews.length / reviewsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map(num => num + 1);

  const navigate = useNavigate()

  const handleDeleteReview = async (movieId, reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteReviewAPI(movieId, reviewId);
        toast.success("Review deleted successfully");
        getAllMovies();
      } catch (err) {
        console.log(err); // <--- log actual error
        toast.error("Failed to delete review");
      }
    }
  };



  return (
    <div>
      <h2 className='text-center text-light mb-4'>Movie Reviews List</h2>

      <MDBTable className='text-light'>
        <MDBTableHead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Movie</th>
            <th scope='col'>Username</th>
            <th scope='col'>Rating</th>
            <th scope='col'>Date</th>
            <th scope='col'>Comment</th>
            <th scope='col'>Delete</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {currentReviews.map((review, index) => (
            <tr key={review.reviewId}>
              <th scope='row'>{indexOfFirstReview + index + 1}</th>
              <td>{review.movieName}</td>
              <td>{review.username}</td>
              <td>{review.rating}</td>
              <td>{new Date(review.date).toLocaleDateString()}</td>
              <td>{review.comment}</td>
              <td>
                <AiFillDelete
                  onClick={() => handleDeleteReview(review.movieId, review.reviewId)}
                  style={{ cursor: 'pointer' }}
                  className='text-danger fs-4'
                />
              </td>
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

export default MovieReviews