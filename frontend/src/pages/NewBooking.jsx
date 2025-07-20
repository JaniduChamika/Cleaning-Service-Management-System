import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const NewBooking = () => {
      const { id } = useParams();
      const [services, setServices] = useState([]);
      const [booking, setBooking] = useState({
            user: '',
            customer: '',
            address: '',
            datetime: '',
            serviceType: ''
      });
      const [errors, setErrors] = useState({});
      const navigate = useNavigate();
      const token = localStorage.getItem('token');
      //start update booking object
      const handleChanges = (e) => {
            setBooking({ ...booking, [e.target.name]: e.target.value });

      }
      //end update booking object
      //start check user is logined
      const fetchUser = async () => {
            try {

                  const response = await axios.get('http://localhost:3000/home', {
                        headers: {
                              "Authorization": `Bearer ${token}`
                        }
                  });
                  if (response.status === 201) {
                        setBooking({ ...booking, user: response.data.userId });
                  } else {
                        navigate('/Signin');
                  }

                  console.log(response);
            } catch (error) {
                  navigate('/Signin');
            }
      }
      //end check user is logined
      //start load service types
      const fetchService = async () => {
            try {
                  const response = await axios.get('http://localhost:3000/service');
                  if (response.status === 201) {
                        setServices(response.data.service);

                  }

            } catch (error) {
                  console.error(error);
            }
      };
      //end load service types

      const setform = async () => {
            if (id) {
                  try {
                        const response = await axios.get(`http://localhost:3000/booking/edit/${id}`, {
                              headers: {
                                    "Authorization": `Bearer ${token}`
                              }
                        });
                        if (response.status === 201) {

                              setBooking(response.data.booking);
                        }
                        console.log(response.status);
                  } catch (error) {
                        console.error(error);
                        navigate('/');
                  }
            }
      }
      useEffect(() => {
            fetchUser();
            fetchService();
            setform();

      }, []);
      //start validate feilds
      const validate = () => {
            const newErrors = {};
            const selectedDate = new Date(booking.datetime);
            const now = new Date();
            if (!booking.customer.trim()) newErrors.customer = 'Customer name is required';
            if (!booking.address.trim()) newErrors.address = 'Address is required';
            if (!booking.datetime.trim()) newErrors.datetime = 'Date Time is required';
            if (!String(booking.serviceType).trim()) newErrors.serviceType = 'Service Type is required';
            if (selectedDate < now) newErrors.datetime = 'Invalid date & time';
            return newErrors;
      };
      //end validate feilds
      async function handleSubmit(event) {
            event.preventDefault();
            const validationErrors = validate();
            if (Object.keys(validationErrors).length > 0) {
                  setErrors(validationErrors);
                  return;
            }
            setErrors({});
            try {

                  if (id) {
                        const response = await axios.put(`http://localhost:3000/update-booking/${id}`, booking, {
                              headers: {
                                    "Authorization": `Bearer ${token}`
                              }
                        });

                        if (response.status === 201) {
                              navigate('/');
                        }

                        console.log(response.status);
                  } else {
                        const response = await axios.post('http://localhost:3000/add-booking', booking);
                        if (response.status == 201) {
                              navigate('/');
                        }

                        console.log(response);
                  }
                  // const response = await axios.post('http://localhost:3000/add-booking', booking);

            } catch (error) {
                  console.log(error);
            }
      }
      return (
            <div className="p-6 max-w-2xl mx-auto sm:p-4 md:p-6 lg:p-8">
                  <h1 className="text-xl font-semibold mb-6 flex items-center">
                        {id ? "Edit Booking" : "Booking a Service"}
                  </h1>
                  <form className="space-y-4 text-start " onSubmit={handleSubmit}>
                        <div className="mb-0">
                              <label htmlFor="customerName" className="block text-base font-medium text-gray-700">Customer Name</label>
                              <input
                                    id="customerName"
                                    type="text"
                                    name="customer"
                                    value={booking.customer}
                                    onChange={handleChanges}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                              />
                              <div className="h-5">
                                    <span className="text-red-500 text-sm mb-1">{errors.customer}</span>
                              </div>

                        </div>
                        <div className="mb-0">
                              <label htmlFor="address" className="block text-base font-medium text-gray-700">Address</label>
                              <input
                                    id="address"
                                    type="text"
                                    name="address"
                                    value={booking.address}
                                    onChange={handleChanges}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                              />
                              <div className="h-5">
                                    <span className="text-red-500 text-sm mb-1">{errors.address}</span>
                              </div>
                        </div>
                        <div className="mb-0">

                              <label htmlFor="date" className="block text-base font-medium text-gray-700">Date</label>
                              <input
                                    id="date"
                                    type="datetime-local"
                                    name="datetime"
                                    value={booking.datetime}
                                    onChange={handleChanges}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                              />

                              <div className="h-5">
                                    <span className="text-red-500 text-sm mt-0">{errors.datetime}</span>
                              </div>
                        </div>
                        <div className="mb-0">
                              <label htmlFor="serviceType" className="block text-base font-medium text-gray-700">Service Type</label>
                              <select
                                    name="serviceType"
                                    id="serviceType"
                                    onChange={handleChanges}
                                    value={booking.serviceType}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                              >
                                    <option value="">Select a Service Type</option>
                                    {services.map(service => (
                                          <option key={service.id} value={service.id}>{service.name}</option>
                                    ))}

                              </select>
                              <div className="h-5 mb-4">
                                    <span className="text-red-500 text-sm mb-1">{errors.serviceType}</span>
                              </div>
                        </div>
                        <div className="text-end">
                              <button
                                    type="reset"
                                    className="p-3 px-11 bg-gray-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 me-3"
                                    onClick={() => navigate('../')}
                              >
                                    Cancel
                              </button>
                              <button
                                    type="submit"
                                    className="p-3 px-11 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                              >
                                    {id ? "Save" : "Submit"}

                              </button>
                        </div>
                  </form>
            </div>
      )
}
export default NewBooking;