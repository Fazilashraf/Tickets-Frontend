import React, { useEffect, useState } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { deleteOrganiserAPI, getAllOrganisersAPI } from '../../Services/allAPI';
import { toast, ToastContainer } from 'react-toastify';
import { AiFillDelete } from "react-icons/ai";

function AdminOrganisersList() {

  const [allOrganisers, setAllOrganisers] = useState([])

  useEffect(() => {
    getAllOrganisers();
  }, []);

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

  const [currentPage, setCurrentPage] = useState(1);
  const organisersPerPage = 5;

  const indexOfLastOrganiser = currentPage * organisersPerPage;
  const indexOfFirstOrganiser = indexOfLastOrganiser - organisersPerPage;
  const currentOrganisers = allOrganisers.slice(indexOfFirstOrganiser, indexOfLastOrganiser);

  const totalPages = Math.ceil(allOrganisers.length / organisersPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map(num => num + 1);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Organiser")) {
      try {
        await deleteOrganiserAPI(id);
        toast.success("Organiser deleted successfully")
        getAllOrganisers()
      }
      catch (err) {
        toast.error("Failed to delete Organiser")
      }
    }
  }

  return (
    <div>
      <h2 className='text-center text-light'>Organisers List</h2>

      <MDBTable className='text-light mt-4'>
        <MDBTableHead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Role</th>
            <th scope='col'>Delete</th>

          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {currentOrganisers.map((organiser, index) => (
            <tr key={organiser._id}>
              <th scope='row'>{indexOfFirstOrganiser + index + 1}</th>
              <td>
                {organiser.username}
              </td>
              <td>{organiser.email}</td>
              <td>{organiser.role}</td>
              <td><AiFillDelete onClick={() => handleDelete(organiser._id)} style={{ cursor: 'pointer' }} className='text-danger fs-4' /></td>
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

export default AdminOrganisersList