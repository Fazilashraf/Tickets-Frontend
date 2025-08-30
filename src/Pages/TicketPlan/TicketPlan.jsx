import React, { useEffect, useState } from 'react'
import './TicketPlan.css'
import { CiLocationOn } from "react-icons/ci";
import { getAMovieAPI } from '../../Services/allAPI';
import { useParams } from 'react-router-dom';

function TicketPlan() {

    const [aMovie, setAMovie] = useState({
            reviews: [],
            movPics: [],
            cast: [],
            genre: []
        })
       
    const { id } = useParams()    

    const fetchMovie = async () => {
            try {
                const response = await getAMovieAPI(id)
                console.log(response);
                setAMovie(response.data)
            }
            catch (err) {
                console.log(err);
            }
        }
    
        useEffect(() => {
            fetchMovie()
        }, [])

    return (
        <div>
            {/* Title Banner */}
            <div>
                <img style={{ filter: 'brightness(40%)' }} width={'100%'} height={350} src={aMovie.bannerImg} alt="" />

                <div>
                    <h1 style={{ fontSize: '50px', position: 'absolute', top: '25%', left: '30%' }} className='text-light text-center'>{aMovie.name}</h1>
                    <div className='d-flex'>
                        <button style={{ position: 'absolute', top: '40%', left: '34%' }} className='btn btn-outline-light'>{aMovie.genre[0]}</button>
                        <button style={{ position: 'absolute', top: '40%', left: '42%' }} className='btn btn-outline-light'>{aMovie.genre[1]}</button>
                        <button style={{ position: 'absolute', top: '40%', left: '50.5%' }} className='btn btn-outline-light'>{aMovie.genre[2]}</button>
                    </div>
                    <button style={{ position: 'absolute', top: '40%', left: '60%' }} className='btn btn-outline-light'>2D</button>
                </div>
            </div>

            {/* Ticket Plan Table */}
            <div className="container mt-5 mb-5">
                <div style={{ backgroundColor: 'rgb(16, 44, 112)' }} className="row p-3 text-light rounded">
                    <div className="col">
                        <h3>M Cinemas</h3>
                    </div>
                    <div className="col">
                        <h4><CiLocationOn className='fs-3' /> Varapuzha</h4>
                    </div>
                    <div className="col d-flex">
                        <button className='btn btn-outline-light'>09:00</button>
                        <button className='btn btn-outline-light ms-2'>10:00</button>
                        <button className='btn btn-outline-light ms-2'>11:00</button>
                        <button className='btn btn-outline-light ms-2'>06:00</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicketPlan