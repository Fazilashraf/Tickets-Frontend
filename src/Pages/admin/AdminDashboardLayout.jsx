import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { IoMdExit } from "react-icons/io";
import { SiNginxproxymanager } from "react-icons/si";
import { TbBrandGoogleHome } from "react-icons/tb";
import { MdMovieFilter } from "react-icons/md";
import { MdOutlineEventNote } from "react-icons/md";
import { TbShirtSport } from "react-icons/tb";
import { RiAdminLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import { IoIosCart } from "react-icons/io";
import { RiFeedbackFill } from "react-icons/ri";
import './AdminDashboardLayout.css'

function AdminDashboardLayout() {

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className="text-white p-4" style={{ width: '250px', backgroundColor: 'rgb(16, 44, 112)' }}>
        <h4 className="text-center fs-3 mb-4"><RiAdminLine className='mb-1 me-1' /> Admin</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link navvv text-white fs-5  mt-4 mb-3" to="/admin/dashboard"><TbBrandGoogleHome className='mb-1 me-2' /> Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link navvv text-white fs-5  mb-3" to="/admin/dashboard/movies"><MdMovieFilter className='mb-1 me-2' /> Movies</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link navvv text-white fs-5  mb-3" to="/admin/dashboard/events"><MdOutlineEventNote className='mb-1 me-2' /> Events</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link navvv text-white fs-5  mb-3" to="/admin/dashboard/sports"><TbShirtSport className='mb-1 me-2' /> Sports</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link navvv text-white fs-5  mb-3" to="/admin/dashboard/users"><FaUsers  className='mb-1' /> Users</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link navvv text-white fs-5  mb-3" to="/admin/dashboard/organisers"><SiNginxproxymanager  className='mb-1' /> Organisers</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link navvv text-white fs-5  mb-3" to="/admin/dashboard/bookings"><IoIosCart  className='mb-1' /> Bookings</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link navvv text-white fs-5  mb-3" to="/admin/dashboard/testimonies"><RiFeedbackFill  className='mb-1' /> Testimony</Link>
          </li>
          <li className="nav-item mt-4">
            <button onClick={handleLogout} className="btn btn-danger w-100 fs-5"><IoMdExit className='fs-5 mb-1' /> Logout</button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        <nav className="navbar navbar-expand navbar-light bg-light shadow-sm">
          <div className="container-fluid">
            <span className="navbar-brand">Admin Dashboard</span>
          </div>
        </nav>
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardLayout;
