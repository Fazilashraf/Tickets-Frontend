import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

function AddMovie() {
  const [movieData, setMovieData] = useState({
    name: '',
    duration: '',
    genre: [],
    trailer: '',
    movImg: '',
    date: '',
    bookedCount: '',
    rating: '',
    votes: '',
    screen: '',
    language: '',
    bannerImg: '',
    movPics: [],
    description: '',
    movieDate: [],
    movieTime: [],
    theatreName: '',
    ticketPrice: '',
    cast: [
      { name: '', role: '', image: '' }
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInput = (e, field) => {
    const value = e.target.value.split(',').map(item => item.trim());
    setMovieData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCastChange = (index, field, value) => {
    const newCast = [...movieData.cast];
    newCast[index][field] = value;
    setMovieData(prev => ({ ...prev, cast: newCast }));
  };

  const addCastField = () => {
    setMovieData(prev => ({
      ...prev,
      cast: [...prev.cast, { name: '', role: '', image: '' }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/addMovie", movieData);
      toast.success("🎬 Movie added successfully!");
    } catch (err) {
      toast.error("Failed to add movie.");
    }
  };

  return (
    <div className="container mt-5 text-light">
      <h2 className="mb-4">🎬 Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">

          {/* Basic Fields */}
          <div className="col-md-6 mb-3">
            <label>Movie Name</label>
            <input name="name" value={movieData.name} onChange={handleChange} className="form-control" required />
          </div>

          <div className="col-md-6 mb-3">
            <label>Duration</label>
            <input name="duration" value={movieData.duration} onChange={handleChange} className="form-control" placeholder="e.g. 3h 20min" />
          </div>

          <div className="col-md-6 mb-3">
            <label>Genre (comma-separated)</label>
            <input onChange={(e) => handleArrayInput(e, 'genre')} className="form-control" placeholder="Action, Drama, Thriller" />
          </div>

          <div className="col-md-6 mb-3">
            <label>Language</label>
            <input name="language" value={movieData.language} onChange={handleChange} className="form-control" />
          </div>

          {/* New Fields */}
          <div className="col-md-6 mb-3">
            <label>Release Date</label>
            <input type="date" name="date" value={movieData.date} onChange={handleChange} className="form-control" />
          </div>

          <div className="col-md-6 mb-3">
            <label>Screen Type</label>
            <select name="screen" value={movieData.screen} onChange={handleChange} className="form-control">
              <option value="">Select</option>
              <option value="4DX">4DX</option>
              <option value="3D">3D</option>
              <option value="IMAX">IMAX</option>
              <option value="2D">2D</option>
              <option value="ICE 3D">ICE 3D</option>
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label>Booked Count</label>
            <input name="bookedCount" value={movieData.bookedCount} onChange={handleChange} className="form-control" />
          </div>

          <div className="col-md-4 mb-3">
            <label>Rating</label>
            <input name="rating" value={movieData.rating} onChange={handleChange} className="form-control" />
          </div>

          <div className="col-md-4 mb-3">
            <label>Votes</label>
            <input name="votes" value={movieData.votes} onChange={handleChange} className="form-control" />
          </div>

          {/* Images & Media */}
          <div className="col-md-6 mb-3">
            <label>Trailer URL</label>
            <input name="trailer" value={movieData.trailer} onChange={handleChange} className="form-control" />
          </div>

          <div className="col-md-6 mb-3">
            <label>Poster Image URL</label>
            <input name="movImg" value={movieData.movImg} onChange={handleChange} className="form-control" />
          </div>

          <div className="col-md-6 mb-3">
            <label>Banner Image URL</label>
            <input name="bannerImg" value={movieData.bannerImg} onChange={handleChange} className="form-control" />
          </div>

          <div className="col-md-6 mb-3">
            <label>Gallery Images (comma-separated)</label>
            <input onChange={(e) => handleArrayInput(e, 'movPics')} className="form-control" placeholder="Image1.jpg, Image2.jpg" />
          </div>

          {/* Time, Date, Theatre */}
          <div className="col-md-6 mb-3">
            <label>Show Times (comma-separated)</label>
            <input onChange={(e) => handleArrayInput(e, 'movieTime')} className="form-control" placeholder="10:00AM, 1:00PM" />
          </div>

          <div className="col-md-6 mb-3">
            <label>Show Dates (Day Month format)</label>
            <input onChange={(e) => {
              const dates = e.target.value.split(',').map(entry => {
                const [day, month] = entry.trim().split(' ');
                return { day, month };
              });
              setMovieData(prev => ({ ...prev, movieDate: dates }));
            }} className="form-control" placeholder="01 Jan, 15 Feb" />
          </div>

          <div className="col-md-6 mb-3">
            <label>Theatre Name</label>
            <input name="theatreName" value={movieData.theatreName} onChange={handleChange} className="form-control" />
          </div>

          <div className="col-md-6 mb-3">
            <label>Ticket Price</label>
            <input
              name="ticketPrice"
              value={movieData.ticketPrice}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g. 150, 200, 250"
            />
          </div>


          <div className="col-md-12 mb-3">
            <label>Description</label>
            <textarea name="description" value={movieData.description} onChange={handleChange} className="form-control" rows="3" />
          </div>

          {/* Cast Members */}
          <div className="col-md-12 mb-3">
            <h5>🎭 Cast Members</h5>
            {movieData.cast.map((member, idx) => (
              <div key={idx} className="row mb-2">
                <div className="col-md-4">
                  <input type="text" placeholder="Name" className="form-control" value={member.name} onChange={(e) => handleCastChange(idx, 'name', e.target.value)} />
                </div>
                <div className="col-md-4">
                  <input type="text" placeholder="Role" className="form-control" value={member.role} onChange={(e) => handleCastChange(idx, 'role', e.target.value)} />
                </div>
                <div className="col-md-4">
                  <input type="text" placeholder="Image URL" className="form-control" value={member.image} onChange={(e) => handleCastChange(idx, 'image', e.target.value)} />
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-sm btn-secondary mt-2" onClick={addCastField}>+ Add Cast</button>
          </div>
        </div>

        <button type="submit" className="btn btn-success mt-3">Add Movie</button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default AddMovie;
