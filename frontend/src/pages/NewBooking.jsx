import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const NewBooking = () => {
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
      return (
            <div className="p-6 w-2xl m-auto">
                  <h1 className="text-xl font-semibold mb-6 flex items-center">
                        Booking a Service
                  </h1>
                  <form className="space-y-4 text-start ">
                        <div>
                              <label htmlFor="customerName" className="block text-base font-medium text-gray-700">Customer Name</label>
                              <input
                                    id="customerName"
                                    type="text"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                              />
                        </div>
                        <div>
                              <label htmlFor="address" className="block text-base font-medium text-gray-700">Address</label>
                              <input
                                    id="address"
                                    type="text"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                              />
                        </div>
                        <div className="flex space-x-4">
                              <div className="w-1/2">
                                    <label htmlFor="date" className="block text-base font-medium text-gray-700">Date</label>
                                    <input
                                          id="date"
                                          type="date"
                                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                              </div>
                              <div className="w-1/2">
                                    <label htmlFor="time" className="block text-base font-medium text-gray-700">Time</label>
                                    <input
                                          id="time"
                                          type="time"
                                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                              </div>
                        </div>
                        <div>
                              <label htmlFor="serviceType" className="block text-base font-medium text-gray-700">Service Type</label>
                              <input
                                    id="serviceType"
                                    type="text"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                              />
                        </div>
                        <div className="text-end">
                              <button
                                    type="submit"
                                    className="p-3 px-11 bg-gray-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 me-3"
                                    onClick={() => navigate('../')}
                              >
                                    Cancel
                              </button>
                              <button
                                    type="submit"
                                    className="p-3 px-11 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                              >
                                    Submit
                              </button>
                        </div>
                  </form>
            </div>
      )
}
export default NewBooking;