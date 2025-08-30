import React, { useEffect, useState } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { getAllTestimoniesAPI } from '../../Services/allAPI';

function AdminTestimonyList() {

  const [allTestimonies, setAllTestimonies] = useState([]);

  useEffect(() => {
    getAllTestimonies();
  }, []);

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

  const [currentPage, setCurrentPage] = useState(1);
  const testimoniesPerPage = 4;

  const indexOfLastTestimony = currentPage * testimoniesPerPage;
  const indexOfFirstTestimony = indexOfLastTestimony - testimoniesPerPage;
  const currentTestimonies = allTestimonies.slice(indexOfFirstTestimony, indexOfLastTestimony);

  const totalPages = Math.ceil(allTestimonies.length / testimoniesPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map(num => num + 1);

  return (
    <div>
      <h2 className='text-center text-light'>User Testimonies</h2>

      <MDBTable className='text-light mt-4'>
        <MDBTableHead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Subject</th>
            <th scope='col'>Message</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {currentTestimonies.map((testimony, index) => (
            <tr key={testimony._id}>
              <th scope='row'>{indexOfFirstTestimony + index + 1}</th>
              <td>{testimony.name}</td>
              <td>{testimony.email}</td>
              <td>{testimony.subject}</td>
              <td>{testimony.message}</td>
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
    </div>
  )
}

export default AdminTestimonyList