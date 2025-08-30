import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function EditSport() {
  const { id } = useParams();

  const [sportData, setSportData] = useState({
    name: '',
    sptImg: '',
    date: '',
    venue: '',
    category: '',
    price: '',
    bannerImg: '',
    description: '',
    votes: '',
    time: '',
    duration: '',
    language: '',
    ucDate: ''
  });

  const categoryOptions = [
    "Football",
    "Cricket",
    "Basketball",
    "Volleyball",
    "Hockey",
    "Table Tennis",
    "Golf",
    "Chess"
  ];

  // Fetch existing sport data
  useEffect(() => {
    const fetchSport = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/getASport/${id}`);
        setSportData(res.data);
      } catch (err) {
        toast.error("Failed to fetch sport details");
      }
    };
    fetchSport();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSportData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/editSport/${id}`, sportData);
      toast.success("🏆 Sport updated successfully!");
    } catch (err) {
      toast.error("Failed to update sport.");
    }
  };

  return (
    <div className="container mt-5 text-light">
      <h2 className="mb-4">✏️ Edit Sport</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Name */}
          <div className="col-md-6 mb-3">
            <label>Sport Name</label>
            <input name="name" value={sportData.name} onChange={handleChange} className="form-control" required />
          </div>

          {/* Poster */}
          <div className="col-md-6 mb-3">
            <label>Sport Poster URL</label>
            <input name="sptImg" value={sportData.sptImg} onChange={handleChange} className="form-control" />
          </div>

          {/* Date and Time */}
          <div className="col-md-6 mb-3">
            <label>Date</label>
            <input name="date" value={sportData.date} onChange={handleChange} className="form-control" placeholder="e.g. 10 Aug 2025" />
          </div>

          <div className="col-md-6 mb-3">
            <label>Time</label>
            <input name="time" value={sportData.time} onChange={handleChange} className="form-control" />
          </div>

          {/* ucDate */}
          <div className="col-md-6 mb-3">
            <label>Upcoming Date (YYYY-MM-DD)</label>
            <input type="date" name="ucDate" value={sportData.ucDate} onChange={handleChange} className="form-control" />
          </div>

          {/* Venue */}
          <div className="col-md-6 mb-3">
            <label>Venue</label>
            <input name="venue" value={sportData.venue} onChange={handleChange} className="form-control" />
          </div>

          {/* Category */}
          <div className="col-md-6 mb-3">
            <label>Category</label>
            <select name="category" value={sportData.category} onChange={handleChange} className="form-control">
              <option value="">Select</option>
              {categoryOptions.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="col-md-6 mb-3">
            <label>Price (₹)</label>
            <input name="price" value={sportData.price} onChange={handleChange} className="form-control" />
          </div>

          {/* Duration & Language */}
          <div className="col-md-6 mb-3">
            <label>Duration</label>
            <input name="duration" value={sportData.duration} onChange={handleChange} className="form-control" />
          </div>

          <div className="col-md-6 mb-3">
            <label>Language</label>
            <input name="language" value={sportData.language} onChange={handleChange} className="form-control" />
          </div>

          {/* Banner Image */}
          <div className="col-md-6 mb-3">
            <label>Banner Image URL</label>
            <input name="bannerImg" value={sportData.bannerImg} onChange={handleChange} className="form-control" />
          </div>

          {/* Description */}
          <div className="col-md-12 mb-3">
            <label>Description</label>
            <textarea name="description" value={sportData.description} onChange={handleChange} className="form-control" rows="3" />
          </div>

          {/* Votes */}
          <div className="col-md-6 mb-3">
            <label>Votes</label>
            <input name="votes" value={sportData.votes} onChange={handleChange} className="form-control" />
          </div>
        </div>

        <button type="submit" className="btn btn-warning mt-3">Update Sport</button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default EditSport;
