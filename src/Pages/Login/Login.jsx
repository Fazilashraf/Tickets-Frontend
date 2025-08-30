import React, { useContext, useState } from 'react';
import { loginAPI } from '../../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { headerContextResponse } from '../../ContextAPI/ContextShare';

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(headerContextResponse);

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleLogin = async () => {
    const { email, password } = userDetails;
    if (!email || !password) {
      toast.warning("Please Fill The Form", { position: "top-center", theme: "dark" });
    } else {
      try {
        const response = await loginAPI(userDetails);
        if (response.status === 200) {
          toast.success("Login Successful", { position: "top-center", theme: "dark" });

          const { currentUser, token } = response.data;
          const { username, email, role } = currentUser;

          login(username, token);

          sessionStorage.setItem("username", username);
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("role", role);

          setTimeout(() => {
            if (role === "admin") {
              navigate("/admin/dashboard");
            } else {
              navigate("/");
            }
            window.scrollTo(0, 0);
          }, 3000);
        } else {
          toast.error(response.response.data, { position: "top-center", theme: "dark" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      {/* Banner */}
      <div style={{ position: 'relative' }}>
        <img
          style={{ filter: 'brightness(50%)', objectFit: 'cover' }}
          width="100%"
          height={300}
          src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8zM19zY2VuZV9vZl8zZF9pbGx1c3RyYXRpb25fbmVvbndpdGhvdXRfc2VtaS1yZV8xM2Q5OWIyOC0yN2NkLTQ1NDEtYTVmYy1lMzFkMjkxMTE4YTJfMS5qcGc.jpg"
          alt="Login Banner"
        />
        <div
          style={{
            position: 'absolute',
            top: '55%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%'
          }}
          className='text-center'
        >
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }} className='text-light fw-bold'>
            LOGIN
          </h1>
          <h5 className='text-light mt-2'>Home &gt;&gt; Login</h5>
        </div>
      </div>

      {/* Form */}
      <div
        style={{ backgroundColor: 'rgb(16, 44, 112)', borderRadius: '20px' }}
        className='p-5 mt-5 mb-5 mx-auto col-lg-6 col-md-8 col-11'
      >
        <h4 className='text-center' style={{ color: 'rgb(106, 219, 181)' }}>HELLO !</h4>
        <h1 className='mt-3 text-center text-light'>WELCOME BACK</h1>

        {/* Email */}
        <label className='mt-4 text-light'>Email <span className='text-danger'>*</span></label>
        <input
          onChange={e => setUserDetails({ ...userDetails, email: e.target.value })}
          className='form-control bg-black text-light'
          type="email"
          placeholder='Enter Your Email'
        />

        {/* Password */}
        <label className='mt-4 text-light'>Password <span className='text-danger'>*</span></label>
        <input
          onChange={e => setUserDetails({ ...userDetails, password: e.target.value })}
          className='form-control bg-black text-light'
          type="password"
          placeholder='Enter Your Password'
        />

        <div className='text-center mt-5'>
          <button
            onClick={handleLogin}
            style={{ backgroundColor: 'rgb(106, 219, 181)' }}
            className='btn w-100 fs-5'
          >
            LOG IN
          </button>

          <p className='mt-4 text-light'>
            Don't have an account? <a className='text-warning' href="/register">register now</a>.
          </p>

          <a href="/organiser/login" className='btn btn-outline-light w-100 mt-3'>
            Organiser Login
          </a>
        </div>
      </div>

      <ToastContainer position="top-center" theme="dark" />
    </div>
  );
}

export default Login;
