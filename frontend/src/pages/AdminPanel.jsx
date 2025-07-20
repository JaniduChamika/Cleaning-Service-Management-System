import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
      const navigate = useNavigate();
      const [bookings, setBookings] = useState([]);

      //start load bookings
      const fetchBookings = async () => {
            try {
                  const response = await axios.get('http://localhost:3000/bookings-admin');
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
            fetchBookings();
      }, []);

      return (
            <div className="p-4  justify-start min-h-screen">

                  <h1 className="text-2xl font-semibold mb-6">Bookings</h1>
                  <div className="overflow-x-auto">
                        <table className="w-full min-w-6xl text-left border-collapse">
                              <thead>
                                    <tr className="bg-gray-100 border-b">
                                          <th className="p-3 ">#</th>
                                          <th className="p-3 ">User</th>
                                          <th className="p-3 ">Customer</th>
                                          <th className="p-3 ">Service Type</th>
                                          <th className="p-3 ">Address</th>
                                          <th className="p-3">Date</th>
                                          <th className="p-3 ">Time</th>
                                        
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
                                                      <td className="p-3 ">{booking.username}</td>
                                                      <td className="p-3 ">{booking.customer}</td>
                                                      <td className="p-3"> {booking.service}</td>
                                                      <td className="p-3 ">{booking.address}</td>
                                                      <td className="p-3 ">{date}</td>
                                                      <td className="p-3 ">{time}</td>
                                                
                                                </tr>
                                          )
                                    })}
                              </tbody>
                        </table>
                  </div>
                
            </div>
      )
}
export default Home;