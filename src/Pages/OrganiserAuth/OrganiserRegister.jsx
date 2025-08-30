import React, { useState } from 'react'
import { organiserRegisterAPI } from '../../Services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Register() {

    const navigate = useNavigate()

    const [organiserDetails, setOrganiserDetails] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleRegister = async () => {
        console.log(organiserDetails);

        const { username, email, password } = organiserDetails
        if (!username || !email || !password) {
            toast.warning("Please Fill The Form", {
                position: "top-center",
                autoClose: 2000,
                theme: "dark",
            });
        }
        else {
            try {
                const response = await organiserRegisterAPI(organiserDetails)
                if (response.status === 200) {
                    toast.success(response.data, {
                        position: "top-center",
                        autoClose: 2000,
                        theme: "dark",
                    });
                    setTimeout(() => {
                        navigate('/organiser/login')
                    }, 3000);
                }
                else {
                    toast.error(response.response.data.message, {
                        position: "top-center",
                        autoClose: 2000,
                        theme: "dark",
                    });
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
            <div className="position-relative">
                <img
                    style={{ filter: 'brightness(50%)', objectFit: "cover" }}
                    className="w-100"
                    height={250}
                    src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8zM19zY2VuZV9vZl8zZF9pbGx1c3RyYXRpb25fbmVvbndpdGhvdXRfc2VtaS1yZV8xM2Q5OWIyOC0yN2NkLTQ1NDEtYTVmYy1lMzFkMjkxMTE4YTJfMS5qcGc.jpg"
                    alt="banner"
                />
                <div className="position-absolute top-50 start-50 translate-middle text-center text-light px-2">
                    <h1 className="fw-bold" style={{ fontSize: "clamp(24px, 5vw, 50px)" }}>ORGANISER REGISTER</h1>
                    <h6>Organiser &gt;&gt; Register</h6>
                </div>
            </div>

            {/* Register Form */}
            <div
                style={{ backgroundColor: 'rgb(16, 44, 112)', borderRadius: '20px' }}
                className="p-4 p-md-5 text-light mt-5 mb-5 mx-auto col-11 col-md-8 col-lg-6"
            >
                <h4 className="text-center" style={{ color: 'rgb(106, 219, 181)' }}>WELCOME !</h4>
                <h2 className="mt-3 text-center">CREATE ACCOUNT</h2>

                <label className="mt-4">Name <span className="text-danger">*</span></label>
                <input
                    onChange={e => setOrganiserDetails({ ...organiserDetails, username: e.target.value })}
                    className="form-control bg-black text-light"
                    type="text"
                    placeholder="Enter Your Name"
                />

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

                <p className="mt-3 small">
                    <input className="me-2" type="checkbox" /> I agree with this{" "}
                    <a className="text-warning" href="#">Terms</a> and{" "}
                    <a className="text-warning" href="#">Privacy Policy</a>.
                </p>

                <center>
                    <button
                        onClick={handleRegister}
                        style={{ backgroundColor: 'rgb(106, 219, 181)' }}
                        className="btn mt-4 w-100 w-md-50 fs-5"
                    >
                        Register
                    </button>

                    <p className="mt-3">
                        Already have an account?{" "}
                        <a className="text-warning" href="/organiser/login">Login</a>.
                    </p>
                </center>
            </div>

            <ToastContainer />
        </div>
    )
}

export default Register
