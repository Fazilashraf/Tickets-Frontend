import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { addEventAPI } from '../../Services/allAPI';

function AddEvent() {
  const [eventData, setEventData] = useState({
    name: '',
    evtImg: '',
    date: '',
    venue: '',
    category: '',
    price: '',
    bannerImg: '',
    evtPics: [],
    description: '',
    votes: '',
    time: '',
    duration: '',
    language: '',
    ucDate: ''
  });

  const categoryOptions = [
    "Business",
    "Technology",
    "Magic Show",
    "Workshops",
    "Comedy Show",
    "Music Show",
    "Tv Shows",
    "Award Shows"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
  };

  const handlePicsChange = (e) => {
    const pics = e.target.value.split(',').map(pic => pic.trim());
    if (pics.length > 7) {
      toast.warning('Only 7 images allowed for event gallery.');
      return;
    }
    setEventData(prev => ({ ...prev, evtPics: pics }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await addEventAPI(eventData);
      toast.success('🎉 Event added successfully!');
      setEventData({
        name: '',
        evtImg: '',
        date: '',
        venue: '',
        category: '',
        price: '',
        bannerImg: '',
        evtPics: [],
        description: '',
        votes: '',
        time: '',
        duration: '',
        language: '',
        ucDate: ''
      });
    } catch (err) {
      toast.error('Failed to add event.');
    }
  };

  return (
    <div className="container mt-5 text-light">
      <h2 className="mb-4">📅 Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Event Name */}
          <div className="col-md-6 mb-3">
            <label>Event Name</label>
            <input name="name" value={eventData.name} onChange={handleChange} className="form-control" required />
          </div>

          {/* Event Image */}
          <div className="col-md-6 mb-3">
            <label>Event Poster URL</label>
            <input name="evtImg" value={eventData.evtImg} onChange={handleChange} className="form-control" />
          </div>

          {/* Date & Time */}
          <div className="col-md-6 mb-3">
            <label>Event Date</label>
            <input name="date" value={eventData.date} onChange={handleChange} className="form-control" type="text" placeholder="e.g. 13 June 2025" />
          </div>

          <div className="col-md-6 mb-3">
            <label>Event Time</label>
            <input name="time" value={eventData.time} onChange={handleChange} className="form-control" placeholder="e.g. 6:00 PM" />
          </div>

          {/* UC Date */}
          <div className="col-md-6 mb-3">
            <label>Upcoming Date (YYYY-MM-DD)</label>
            <input type="date" name="ucDate" value={eventData.ucDate} onChange={handleChange} className="form-control" />
          </div>

          {/* Venue */}
          <div className="col-md-6 mb-3">
            <label>Venue</label>
            <input name="venue" value={eventData.venue} onChange={handleChange} className="form-control" />
          </div>

          {/* Category */}
          <div className="col-md-6 mb-3">
            <label>Category</label>
            <select name="category" value={eventData.category} onChange={handleChange} className="form-control">
              <option value="">Select</option>
              {categoryOptions.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="col-md-6 mb-3">
            <label>Price (₹)</label>
            <input name="price" value={eventData.price} onChange={handleChange} className="form-control" />
          </div>

          {/* Duration & Language */}
          <div className="col-md-6 mb-3">
            <label>Duration</label>
            <input name="duration" value={eventData.duration} onChange={handleChange} className="form-control" placeholder="e.g. 2h" />
          </div>

          <div className="col-md-6 mb-3">
            <label>Language</label>
            <input name="language" value={eventData.language} onChange={handleChange} className="form-control" />
          </div>

          {/* Poster & Banner */}
          <div className="col-md-6 mb-3">
            <label>Banner Image URL</label>
            <input name="bannerImg" value={eventData.bannerImg} onChange={handleChange} className="form-control" />
          </div>

          {/* Gallery Images */}
          <div className="col-md-6 mb-3">
            <label>Gallery Images (Max 7, comma-separated)</label>
            <input onChange={handlePicsChange} className="form-control" placeholder="url1, url2, ..., url7" />
          </div>

          {/* Description */}
          <div className="col-md-12 mb-3">
            <label>Description</label>
            <textarea name="description" value={eventData.description} onChange={handleChange} className="form-control" rows="3" />
          </div>

          {/* Votes */}
          <div className="col-md-6 mb-3">
            <label>Votes</label>
            <input name="votes" value={eventData.votes} onChange={handleChange} className="form-control" />
          </div>
        </div>

        <button type="submit" className="btn btn-success mt-3">Add Event</button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default AddEvent;
