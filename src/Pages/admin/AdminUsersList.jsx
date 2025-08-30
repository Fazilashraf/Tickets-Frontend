import React, { useEffect, useState } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { deleteUserAPI, getAllUsersAPI } from '../../Services/allAPI';
import { toast, ToastContainer } from 'react-toastify';
import { AiFillDelete } from "react-icons/ai";

function AdminUsersList() {

  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    getAllUsers();
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

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(allUsers.length / usersPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map(num => num + 1);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this User")) {
      try {
        await deleteUserAPI(id);
        toast.success("User deleted successfully")
        getAllUsers()
      }
      catch (err) {
        toast.error("Failed to delete User")
      }
    }
  }

  return (
    <div>
      <h2 className='text-center text-light'>Users List</h2>

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
          {currentUsers.map((user, index) => (
            <tr key={user._id}>
              <th scope='row'>{indexOfFirstUser + index + 1}</th>
              <td>
                {user.username}
              </td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td><AiFillDelete onClick={() => handleDelete(user._id)} style={{ cursor: 'pointer' }} className='text-danger fs-4' /></td>
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

export default AdminUsersList