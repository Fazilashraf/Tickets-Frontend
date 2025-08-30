import React, { useContext, useState } from 'react'
import { organiserLoginAPI } from '../../Services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { headerContextResponse } from '../../ContextAPI/ContextShare';

function Login() {
    const navigate = useNavigate()
    const { login } = useContext(headerContextResponse);

    const [organiserDetails, setOrganiserDetails] = useState({
        email: "",
        password: ""
    })

    const handleLogin = async () => {
        const { email, password } = organiserDetails
        if (!email || !password) {
            toast.warning("Please Fill The Form", { position: "top-center", autoClose: 2000, theme: "dark" });
        } else {
            try {
                const response = await organiserLoginAPI(organiserDetails)
                if (response.status === 200) {
                    toast.success("Login Successful", { position: "top-center", autoClose: 2000, theme: "dark" });
                    login(response.data.currentOrganiser.username, response.data.token);
                    sessionStorage.setItem('username', response.data.currentOrganiser.username)
                    sessionStorage.setItem('email', response.data.currentOrganiser.email)
                    sessionStorage.setItem("token", response.data.token)
                    setTimeout(() => {
                        navigate('/organiser/dashboard')
                        scrollTo(0, 0)
                    }, 3000);
                } else {
                    toast.error(response.response.data, { position: "top-center", autoClose: 2000, theme: "dark" });
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div>
            {/* Hero Section */}
            <div style={{ position: 'relative' }}>
                <img
                    style={{ filter: 'brightness(50%)', objectFit: 'cover' }}
                    width="100%"
                    height={300}
                    src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8zM19zY2VuZV9vZl8zZF9pbGx1c3RyYXRpb25fbmVvbndpdGhvdXRfc2VtaS1yZV8xM2Q5OWIyOC0yN2NkLTQ1NDEtYTVmYy1lMzFkMjkxMTE4YTJfMS5qcGc.jpg"
                    alt="banner"
                />
                <div
                    style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)' }}
                    className="text-center px-2"
                >
                    <h1 className="text-light fw-bold" style={{ fontSize: 'clamp(28px, 6vw, 60px)' }}>
                        ORGANISER LOGIN
                    </h1>
                    <h5 className="text-light">Organiser &gt;&gt; Login</h5>
                </div>
            </div>

            {/* Login Form */}
            <div className="container">
                <div
                    style={{ backgroundColor: 'rgb(16, 44, 112)', borderRadius: '20px' }}
                    className="p-4 p-md-5 text-light mt-5 mb-5 mx-auto col-12 col-md-8 col-lg-6"
                >
                    <h4 className="text-center" style={{ color: 'rgb(106, 219, 181)' }}>
                        HELLO !
                    </h4>
                    <h1 className="mt-3 text-center">WELCOME BACK</h1>

                    <label className="mt-4">Email <span className="text-danger">*</span></label>
                    <input
                        onChange={e => setOrganiserDetails({ ...organiserDetails, email: e.target.value })}
                        className="form-control bg-black text-light"
                        type="email"
                        placeholder="Enter Your Email"
                    />

                    <label className="mt-4">Password <span className="text-danger">*</span></label>
                    <input
                        onChange={e => setOrganiserDetails({ ...organiserDetails, password: e.target.value })}
                        className="form-control bg-black text-light"
                        type="password"
                        placeholder="Enter Your Password"
                    />

                    <center>
                        <button
                            onClick={handleLogin}
                            style={{ backgroundColor: 'rgb(106, 219, 181)' }}
                            className="btn mt-4 w-100 w-md-50 fs-5"
                        >
                            LOG IN
                        </button>

                        <p className="mt-4">
                            Don't have an account? <a className="text-warning" href="/organiser/register">Register now</a>.
                        </p>

                        <button className="btn btn-outline-light mt-3 w-100 w-md-50">
                            <a className="text-primary" href="/login">User Login</a>
                        </button>
                    </center>
                </div>
            </div>

            <ToastContainer position="top-center" autoClose={2000} theme="dark" />
        </div>
    )
}

export default Login
