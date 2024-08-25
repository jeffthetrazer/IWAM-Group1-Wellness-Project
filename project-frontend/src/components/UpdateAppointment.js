// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// //import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
// import './UpdateAppointment.css';

// const UpdateAppointment = () => {
//   const { id } = useParams(); // Get appointment ID from URL
//   const [appointment, setAppointment] = useState({
//     courseName: '',
//     appointmentDate: '',
//     appointmentTime: ''
//   });
//   const email = localStorage.getItem('userEmail'); // Retrieve email from local storage
//   const navigate = useNavigate();
//   const [message, setMessage] = useState('');

//   // Available time slots for appointment
//   const timeSlots = [
//     '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
//     '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
//   ];

//   useEffect(() => {
//     if (id) {
//       // Fetch the appointment details if we're updating
//       axios.get(`http://localhost:8080/api/appointments/${id}`)
//         .then(response => setAppointment(response.data))
//         .catch(err => console.error(err));
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAppointment({ ...appointment, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (id) {
//       // Update appointment if id is present
//       try {
//         await axios.put(`http://localhost:8080/api/appointments/update/${email}`, {
//           id,
//           ...appointment
//         });
//         setMessage('Appointment updated successfully!');
//         navigate('/my-appointment');
//       } catch (err) {
//         console.error(err);
//         setMessage('Failed to update appointment. Please try again.');
//       }
//     } else {
//       // Create new appointment if id is not present
//       try {
//         await axios.post('http://localhost:8080/api/appointments', appointment);
//         setMessage('Appointment booked successfully!');
//       } catch (err) {
//         console.error(err);
//         setMessage('Failed to book appointment. Please try again.');
//       }
//     }
//   };

//   return (
//     <div className="container-fluid vh-100 d-flex justify-content-center align-items-center updateappointment-container">
//       <div className="card p-4 updateappointment-box">
//         <h2 className="text-center mb-4">{id ? 'Update' : 'Book'} Wellness Management Appointment</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group mb-3">
//             <select
//               className="form-control"
//               id="courseName"
//               name="courseName"
//               value={appointment.courseName}
//               onChange={handleChange}
//               required
//             >
//               <option value="" disabled>Select Course</option>
//               <option value="Yoga">Yoga</option>
//               <option value="Meditation">Meditation</option>
//               <option value="Massage Therapy">Massage Therapy</option>
//               <option value="Nutrition Counseling">Nutrition Counseling</option>
//               <option value="Physical Therapy">Physical Therapy</option>
//             </select>
//           </div>

//           <div className="form-group mb-3">
//             <label htmlFor="appointmentDate" className="form-label">Appointment Date</label>
//             <input
//               type="date"
//               className="form-control"
//               id="appointmentDate"
//               name="appointmentDate"
//               value={appointment.appointmentDate}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group mb-3">
//             <label htmlFor="appointmentTime" className="form-label">Appointment Time</label>
//             <select
//               className="form-control"
//               id="appointmentTime"
//               name="appointmentTime"
//               value={appointment.appointmentTime}
//               onChange={handleChange}
//               required
//             >
//               <option value="" disabled>Select Time</option>
//               {timeSlots.map((time, index) => (
//                 <option key={index} value={time}>{time}</option>
//               ))}
//             </select>
//           </div>

//           <button type="submit" className="btn btn-primary w-100">
//             {id ? 'Update' : 'Book'} Appointment
//           </button>
//           {message && <p className="text-center mt-3 text-success">{message}</p>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateAppointment;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateAppointment.css'; // Ensure your CSS is correctly applied

const UpdateAppointment = () => {
  const { id } = useParams(); // Get appointment ID from URL
  const [appointment, setAppointment] = useState({
    courseName: '',
    appointmentDate: '',
    appointmentTime: ''
  });
  const email = localStorage.getItem('userEmail'); // Retrieve email from local storage
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  // Available time slots for appointment
  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  useEffect(() => {
    if (id) {
      // Fetch the appointment details if we're updating
      axios.get(`http://localhost:8080/api/appointments/${id}`)
        .then(response => setAppointment(response.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      // Update appointment if id is present
      try {
        await axios.put(`http://localhost:8080/api/appointments/update/${email}`, {
          id,
          ...appointment
        });
        setMessage('Appointment updated successfully!');
        navigate('/my-appointment');
      } catch (err) {
        console.error(err);
        setMessage('Failed to update appointment. Please try again.');
      }
    } else {
      // Create new appointment if id is not present
      try {
        await axios.post('http://localhost:8080/api/appointments', appointment);
        setMessage('Appointment booked successfully!');
      } catch (err) {
        console.error(err);
        setMessage('Failed to book appointment. Please try again.');
      }
    }
  };

  // Handle the cancel button click, navigate to the My Appointments page
  const handleCancel = () => {
    navigate('/my-appointment');
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center updateappointment-container">
      <div className="card p-4 updateappointment-box">
        <h2 className="text-center mb-4">{id ? 'Update' : 'Book'} Wellness Management Appointment</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <select
              className="form-control"
              id="courseName"
              name="courseName"
              value={appointment.courseName}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Course</option>
              <option value="Yoga">Yoga</option>
              <option value="Meditation">Meditation</option>
              <option value="Massage Therapy">Massage Therapy</option>
              <option value="Nutrition Counseling">Nutrition Counseling</option>
              <option value="Physical Therapy">Physical Therapy</option>
            </select>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="appointmentDate" className="form-label">Appointment Date</label>
            <input
              type="date"
              className="form-control"
              id="appointmentDate"
              name="appointmentDate"
              value={appointment.appointmentDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="appointmentTime" className="form-label">Appointment Time</label>
            <select
              className="form-control"
              id="appointmentTime"
              name="appointmentTime"
              value={appointment.appointmentTime}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Time</option>
              {timeSlots.map((time, index) => (
                <option key={index} value={time}>{time}</option>
              ))}
            </select>
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary w-45">
              {id ? 'Update' : 'Book'} Appointment
            </button>
            <button type="button" className="btn btn-secondary w-45" onClick={handleCancel}>
              Cancel
            </button>
          </div>
          {message && <p className="text-center mt-3 text-success">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default UpdateAppointment;
