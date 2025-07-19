import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
      const navigate = useNavigate();
      const [user, setUser] = useState({
            username: '',
            password: ''
      });
      const [errors, setErrors] = useState({});
      const [confirmPassowrd, setConfirmPassowrd] = useState('');
      const handleChanges = (e) => {
            setUser({ ...user, [e.target.name]: e.target.value });

      }

      const validate = () => {
            const newErrors = {};
            if (!user.username.trim()) newErrors.username = 'Username is required';
            if (!user.password.trim()) newErrors.password = 'Password is required';
            if (user.password.length < 4) newErrors.password = 'Password length must more than 4';
            if (!confirmPassowrd.trim()) newErrors.confirmpassword = 'Enter Confirm Passowrd';
            if (confirmPassowrd != user.password) newErrors.confirmpassword = 'Passowrd not matched';
            return newErrors;
      };

      async function handleSubmit(event) {
            event.preventDefault();
            const validationErrors = validate();
            if (Object.keys(validationErrors).length > 0) {
                  setErrors(validationErrors);
                  return;
            }
            setErrors({});

            try {
                  const response = await axios.post('http://localhost:3000/register', user);
                  if (response.status == 201) {
                        navigate('/Signin');
                  } else if (response.data.message == "user alrady exist") {
                        const newErrors = {};
                        newErrors.username = 'Username alrady exist';
                        setErrors(newErrors);
                  }

                  console.log(response);

            } catch (error) {
                  console.log(error);
            }

      }
      return (
            <div className="flex justify-center items-center h-screen bg-gray">
                  <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                        <div className="flex justify-center mb-4">
                              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                                    </svg>
                              </div>
                        </div>
                        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
                        <form onSubmit={handleSubmit}>
                              <div className="mb-4 text-start">
                                    <input
                                          type="text"
                                          name="username"
                                          placeholder="Username"
                                          className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
                                          onChange={handleChanges} />
                                    {errors.username && <span className="text-red-500 text-sm mt-1">{errors.username}</span>}
                              </div>
                              <div className="mb-4  text-start">
                                    <input
                                          type="password"
                                          name="password"
                                          placeholder="Password"
                                          className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 "
                                          onChange={handleChanges} />
                                    {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
                              </div>
                              <div className="mb-6  text-start">
                                    <input
                                          type="password"
                                          name="confirmpassword"
                                          placeholder="Confirm Password"
                                          className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 "
                                          onChange={(e) => setConfirmPassowrd(e.target.value)} />
                                    {errors.confirmpassword && <span className="text-red-500 text-sm mt-1">{errors.confirmpassword}</span>}
                              </div>
                              <button
                                    type="submit"
                                    className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                              >
                                    Sign Up
                              </button>
                              <div className="text-center mt-1">
                                    <span>Already have account? </span>
                                    <Link to='/Signin' className="text-blue-500">Login</Link>
                              </div>
                        </form>
                  </div>
            </div>
      )
}
export default Register;