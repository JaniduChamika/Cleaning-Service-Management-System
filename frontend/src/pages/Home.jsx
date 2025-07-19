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
      return (
            <div>Home</div>
      )
}
export default Home;