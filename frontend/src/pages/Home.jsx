import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
      const navigate = useNavigate();
      const [bookings, setBookings] = useState([]);
      const [userId, setUserId] = useState([]);
      const token = localStorage.getItem('token');
      const fetchUser = async () => {
            try {

                  const response = await axios.get('http://localhost:3000/home', {
                        headers: {
                              "Authorization": `Bearer ${token}`
                        }
                  });
                  if (response.status === 201) {
                        setUserId(response.data.userId);
                  } else {
                        navigate('/Signin');
                  }
                  // console.log(response);
            } catch (error) {
                  navigate('/Signin');
            }
      }
      //start load bookings
      const fetchBookings = async () => {
            try {
                  const response = await axios.get('http://localhost:3000/booking', {
                        headers: {
                              "Authorization": `Bearer ${token}`
                        }
                  });
                  if (response.status === 201) {
                        setBookings(response.data.booking);
                        console.log(response.data.booking);
                  }

            } catch (error) {
                  console.error(error);
            }
      };
      //end load bookings
      useEffect(() => {
            fetchUser();
            fetchBookings();
      }, []);

      const handleCancelBooking = async (bookingId) => {
            try {
                  const confirm = window.confirm("Are you sure you want to cancel this booking?");
                  if (!confirm) return;

                  const response = await axios.delete(`http://localhost:3000/booking/${bookingId}`);

                  if (response.status === 200) {
                        // Remove the canceled booking from the state
                        setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
                        alert("Booking cancelled successfully!");
                  }
            } catch (error) {
                  console.error("Error cancelling booking:", error);
                  alert("Failed to cancel booking.");
            }
      };
      return (
            <div className="p-6">
                  <h1 className="text-2xl font-semibold mb-6">Your Booking</h1>
                  <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                              <thead>
                                    <tr className="bg-gray-100 border-b">
                                          <th className="p-3 ">#</th>
                                          <th className="p-3 ">Customer</th>
                                          <th className="p-3 ">Service Type</th>
                                          <th className="p-3 ">Address</th>
                                          <th className="p-3">Date</th>
                                          <th className="p-3 ">Time</th>
                                          <th className="p-3 ">Action</th>
                                    </tr>
                              </thead>
                              <tbody>

                                    {bookings.map((booking, index) => {
                                          const dateObj = new Date(booking.date_time);
                                          const date = dateObj.toISOString().split('T')[0];
                                          const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                                          return (
                                                <tr key={booking.id} className=" hover:bg-blue-100 transition duration-200 border-b">
                                                      <td className="p-3 ">{index + 1}</td>
                                                      <td className="p-3 ">{booking.customer}</td>
                                                      <td className="p-3"> {booking.service}</td>
                                                      <td className="p-3 ">{booking.address}</td>
                                                      <td className="p-3 ">{date}</td>
                                                      <td className="p-3 ">{time}</td>
                                                      <td className="p-3 ">
                                                            <button
                                                                  className="w-16 px-2 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 active:bg-gray-800 transition duration-200"
                                                                  onClick={() => handleCancelBooking(booking.id)}
                                                            >Cancel</button>
                                                            <button className="w-16 ms-2 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:bg-blue-800 transition duration-200">Edit</button>
                                                      </td>
                                                </tr>
                                          )
                                    })}
                              </tbody>
                        </table>
                  </div>
                  <div className="mt-6 text-center">
                        <button onClick={() => navigate('/Booking')} className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
                              Make New Booking
                        </button>
                  </div>
            </div>
      )
}
export default Home;