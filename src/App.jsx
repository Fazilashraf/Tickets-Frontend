import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer'
import Header from './Components/Header'
import Contact from './Pages/Contact/Contact'
import Home from './Pages/Home/Home'
import AboutUs from './Pages/About/AboutUs'
import Movie from './Pages/Movies/Movie'
import ViewMovie from './Pages/ViewMovie/ViewMovie'
import TicketPlan from './Pages/TicketPlan/TicketPlan'
import SeatPlan from './Pages/SeatPlan/SeatPlan'
import MovieCheckout from './Pages/MovieCheckout'
import Events from './Pages/Events/Events'
import ViewEvent from './Pages/View Event/ViewEvent'
import EventCheckout from './Pages/EventCheckout'
import Sport from './Pages/Sports/Sport'
import ViewSport from './Pages/ViewSport/ViewSport'
import SportCheckout from './Pages/SportCheckout'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import MyBookings from './Pages/MyBookings/MyBookings'
import OrganiserRegister from './Pages/OrganiserAuth/OrganiserRegister'
import OrganiserLogin from './Pages/OrganiserAuth/OrganiserLogin'
import OrgDashboard from './Pages/OrganiserPage/OrgDashboard'
import DashboardHome from './Pages/OrganiserPage/DashboardHome'
import MovieList from './Pages/OrganiserPage/MovieList'
import AddMovie from './Pages/OrganiserPage/AddMovie'
import EditMovie from './Pages/OrganiserPage/EditMovie'
import EventList from './Pages/OrganiserPage/EventList'
import AddEvent from './Pages/OrganiserPage/AddEvent'
import EditEvent from './Pages/OrganiserPage/EditEvent'
import SportList from './Pages/OrganiserPage/SportList'
import AddSport from './Pages/OrganiserPage/AddSport'
import EditSport from './Pages/OrganiserPage/EditSport'
import MovieReviews from './Pages/OrganiserPage/MovieReviews'
import AdminDashboardLayout from './Pages/admin/AdminDashboardLayout'
import AdmDashboardHome from './Pages/admin/AdmDashboardHome'
import AdminMovieList from './Pages/admin/AdminMovieList'
import AdminEventList from './Pages/admin/AdminEventList'
import AdminSportList from './Pages/admin/AdminSportList'
import AdminUsersList from './Pages/admin/AdminUsersList'
import AdminOrganisersList from './Pages/admin/AdminOrganisersList'
import AdminBookingsList from './Pages/admin/AdminBookingsList'
import AdminTestimonyList from './Pages/admin/AdminTestimonyList'
import AdminEventBookings from './Pages/admin/AdminEventBookings'
import AdminSportBookings from './Pages/admin/AdminSportBookings'

function App() {

  const isAdminRoute = useLocation().pathname.startsWith('/admin')
  const isOrganiserRoute = useLocation().pathname.startsWith('/organiser')

  return (
    <>
      {!isAdminRoute && !isOrganiserRoute && <Header />}
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/movies' element={<Movie />} />
        <Route path='/viewMovie/:id' element={<ViewMovie />} />
        <Route path='/ticketPlan/:id' element={<TicketPlan />} />
        <Route path='/seatPlan/:id' element={<SeatPlan />} />
        <Route path='/mCheckout/:id' element={<MovieCheckout />} />
        <Route path='/events' element={<Events />} />
        <Route path='/viewEvent/:id' element={<ViewEvent />} />
        <Route path='/eCheckout/:id' element={<EventCheckout />} />
        <Route path='/sports' element={<Sport />} />
        <Route path='/viewSport/:id' element={<ViewSport />} />
        <Route path='/sCheckout/:id' element={<SportCheckout />} />
        <Route path='/myBookings' element={<MyBookings />} />
        <Route path='/organiser/register' element={<OrganiserRegister />} />
        <Route path='/organiser/login' element={<OrganiserLogin />} />

        {/* ORGANISER DASHBOARD ROUTES */}
        <Route path="/organiser/dashboard" element={<OrgDashboard />}>
          <Route index element={<DashboardHome />} />

          {/* Movies */}
          <Route path="movies" element={<MovieList/>} />
          <Route path="movies/add" element={<AddMovie/>} />
          <Route path="movies/edit/:id" element={<EditMovie/>} />

          {/* Events */}
          <Route path="events" element={<EventList/>} />
          <Route path="events/add" element={<AddEvent/>} />
          <Route path="events/edit/:id" element={<EditEvent/>} />

          {/* Sports */}
          <Route path="sports" element={<SportList/>} />
          <Route path="sports/add" element={<AddSport/>} />
          <Route path="sports/edit/:id" element={<EditSport/>} />

          {/* Movie Reviews */}
          <Route path="reviews" element={<MovieReviews/>} />
        </Route>

        <Route path="/admin/dashboard" element={<AdminDashboardLayout/>}>
          <Route index element={<AdmDashboardHome />} />

          {/* Movies */}
          <Route path="movies" element={<AdminMovieList/>} />
          {/* Events */}
          <Route path="events" element={<AdminEventList/>} />
          {/* Sports */}
          <Route path="sports" element={<AdminSportList/>} />
          {/* Users */}
          <Route path="users" element={<AdminUsersList/>} />
          {/* Organisers */}
          <Route path="organisers" element={<AdminOrganisersList/>} />
          {/* Bookings */}
          <Route path="bookings" element={<AdminBookingsList/>} />
          <Route path="eventBookings" element={<AdminEventBookings/>} />
          <Route path="sportBookings" element={<AdminSportBookings/>} />
          {/* Testimony */}
          <Route path="testimonies" element={<AdminTestimonyList/>} />
        </Route>
      </Routes>

      {!isAdminRoute && !isOrganiserRoute && <Footer />}
    </>
  )
}

export default App
