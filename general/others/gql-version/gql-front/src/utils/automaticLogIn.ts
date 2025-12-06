// Import necessary dependencies and hooks
import  { useEffect } from 'react';
import { useAppDispatch } from '../rtk/hooks';
import axios from 'axios';
import { setUserName } from '../rtk/userNameSlice';
import { setUserNameInCart } from '../rtk/cartSlice';

const AutomaticLogIn = () => {
  const dispatch = useAppDispatch();
  const baseURL = import.meta.env.VITE_SERVER_API_OLD;

  useEffect(() => {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');

    const fetchData = async () => {
      if (email && password) {
        try {
          const userData = {
            email,
            password,
          };
          const response = await axios.post(`${baseURL}/users/login`, userData);
          if (response.data) {
            const userName = response.data.user;
            dispatch(setUserName(userName));
            dispatch(setUserNameInCart(`${userName.firstName} ${userName.lastName}`));
          }
        } catch (error) {
          console.error('Error during login:', error);
        }
      }
    };

    fetchData(); 

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return null; // Since it doesn't render anything, you can return null or an empty component
};

export default AutomaticLogIn;
