import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
      const navigate = useNavigate();
      const fetchUser = async () => {
            try {
                  const token = localStorage.getItem('token');
                  const response = await axios.get('http://localhost:3000/home', {
                        headers: {
                              "Authorization": `Bearer ${token}`
                        }
                  });
                  if (response.status !== 201) {
                        navigate('/Signin');
                  }
                  // console.log(response);
            } catch (error) {
                  navigate('/Signin');
            }
      }
      useEffect(() => {
            fetchUser();
      });
      const bookings = [
            { id: 1, serviceType: 'Service Type', address: 'Location', date: '2025/07/20', time: '12:20 PM', status: 'Complete' },
            { id: 2, serviceType: 'Service Type', address: 'Location', date: '2025/07/20', time: '12:20 PM', status: 'Complete' },
            { id: 3, serviceType: 'Service Type', address: 'Location', date: '2025/07/20', time: '12:20 PM', status: 'Complete' },
            { id: 4, serviceType: 'Service Type', address: 'Location', date: '2025/07/20', time: '12:20 PM', status: 'Complete' },
            { id: 5, serviceType: 'Service Type', address: 'Location', date: '2025/07/20', time: '12:20 PM', status: 'Complete' },
            { id: 6, serviceType: 'Service Type', address: 'Location', date: '2025/07/20', time: '12:20 PM', status: 'Complete' },
            { id: 7, serviceType: 'Service Type', address: 'Location', date: '2025/07/20', time: '12:20 PM', status: 'Complete' },
      ];
      return (
            <div className="p-6">
                  <h1 className="text-2xl font-semibold mb-6">Your Booking</h1>
                  <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                              <thead>
                                    <tr className="bg-gray-100 border-b">
                                          <th className="p-3 ">#</th>
                                          <th className="p-3 ">Service Type</th>
                                          <th className="p-3 ">Address</th>
                                          <th className="p-3">Date</th>
                                          <th className="p-3 ">Time</th>
                                          <th className="p-3 ">Status</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {bookings.map((booking) => (
                                          <tr key={booking.id} className=" hover:bg-blue-100 transition duration-200 border-b">
                                                <td className="p-3 ">{booking.id}</td>
                                                <td className="p-3"> {booking.serviceType}</td>
                                                <td className="p-3 ">{booking.address}</td>
                                                <td className="p-3 ">{booking.date}</td>
                                                <td className="p-3 ">{booking.time}</td>
                                                <td className="p-3 ">{booking.status}</td>
                                          </tr>
                                    ))}
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