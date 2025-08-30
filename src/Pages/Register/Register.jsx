import React, { useState } from 'react'
import './Register.css'
import { registerAPI } from '../../Services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Register() {

    const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleRegister = async () => {
        const { username, email, password } = userDetails
        if (!username || !email || !password) {
            toast.warning("Please Fill The Form", { theme: "dark" });
        }
        else {
            try {
                const response = await registerAPI(userDetails)
                if (response.status === 200) {
                    toast.success(response.data, { theme: "dark" });
                    setTimeout(() => {
                        navigate('/login')
                    }, 3000);
                } else {
                    toast.error(response.response.data.message, { theme: "dark" });
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div>
            {/* Banner */}
            <div style={{ position: 'relative' }}>
                <img
                    style={{ filter: 'brightness(50%)', objectFit: "cover" }}
                    width="100%"
                    height={350}
                    src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8zM19zY2VuZV9vZl8zZF9pbGx1c3RyYXRpb25fbmVvbndpdGhvdXRfc2VtaS1yZV8xM2Q5OWIyOC0yN2NkLTQ1NDEtYTVmYy1lMzFkMjkxMTE4YTJfMS5qcGc.jpg"
                    alt="banner"
                />

                <div
                    style={{ position: 'absolute', top: '35%', left: '50%', transform: 'translateX(-50%)' }}
                    className="col-10 col-md-6 text-center"
                >
                    <h1 style={{ fontSize: 50 }} className="text-light fw-bold">REGISTER</h1>
                    <h5 className="text-light">Home &gt;&gt; Register</h5>
                </div>
            </div>

            {/* Form */}
            <div
                style={{ backgroundColor: 'rgb(16, 44, 112)', borderRadius: '20px' }}
                className="p-4 p-md-5 col-11 col-md-8 col-lg-6 text-light mt-5 mb-5 mx-auto"
            >
                <h4 className="text-center" style={{ color: 'rgb(106, 219, 181)' }}>WELCOME !</h4>
                <h1 className="mt-3 text-center">CREATE ACCOUNT</h1>

                <label className="mt-4">Name <span className="text-danger">*</span></label>
                <input
                    onChange={e => setUserDetails({ ...userDetails, username: e.target.value })}
                    className="form-control bg-black text-light"
                    type="text"
                    placeholder="Enter Your Name"
                />

                <label className="mt-4">Email <span className="text-danger">*</span></label>
                <input
                    onChange={e => setUserDetails({ ...userDetails, email: e.target.value })}
                    className="form-control bg-black text-light"
                    type="email"
                    placeholder="Enter Your Email"
                />

                <label className="mt-4">Password <span className="text-danger">*</span></label>
                <input
                    onChange={e => setUserDetails({ ...userDetails, password: e.target.value })}
                    className="form-control bg-black text-light"
                    type="password"
                    placeholder="Enter Your Password"
                />

                <p className="mt-3">
                    <input className="fs-5 me-2" type="checkbox" />
                    I agree with this <a className="text-warning" href="#">Terms</a> and <a className="text-warning" href="#">Privacy Policy</a>.
                </p>

                <div className="text-center">
                    <button
                        onClick={handleRegister}
                        style={{ backgroundColor: 'rgb(106, 219, 181)' }}
                        className="btn mt-4 w-100 w-md-50 fs-5"
                    >
                        Register
                    </button>

                    <p className="mt-3">
                        Already have an account? <a className="text-warning" href="/login">Login</a>.
                    </p>
                </div>
            </div>

            <ToastContainer theme="dark" />
        </div>
    )
}

export default Register
