// authUtils.js

import { Email_login, storeToken } from '../src/ApiManagement/UserApi' ;
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = async (email, password, showToast, navigation, setLoading,shouldNavigate = true, afterLoginSuccess = () => {}) => {
  try {
    // Validate email and password
    if (!email.trim()) {
        showToast('Please enter your email.');
        return;
      }

      if (!isValidEmail(email)) {
        showToast('Please enter a valid email address.');
        return;
      }

      if (!password.trim()) {
        showToast('Please enter your password.');
        return;
      }

    setLoading(true); // Set loading state to true

    // Make API call
    const apiEndpoint = 'api/users/login-via-password'; // Replace with your actual login API endpoint
    const data = {
      email,
      password,
    };

    const result = await Email_login(apiEndpoint, data);
    console.log(result.data,"kjhuhu");

    if (result.data.success === 'true') {
      // Successful login
      showToast(result.data.message || 'Login successful');
      console.log(result.data.token);
      if (result.data.token) {
        await storeToken(result.data.token);
      }
      await AsyncStorage.setItem('email', result.data.email);
      await AsyncStorage.setItem('userName', result.data.userName);
      if (shouldNavigate) {
        navigation.replace('main');
      }
      afterLoginSuccess();
    } else {
      handleLoginError(result, showToast);
    }
  } catch (error) {
    console.log(error);
    showToast('An error occurred during login', error);
  } finally {
    setLoading(false); // Set loading state to false, whether it's successful or not
  }
};

const handleLoginError = (result, showToast) => {
  if (result.status === 406) {
    showToast(result.data.message || 'All Fields are required');
  } else if (result.status === 404) {
    showToast(result.data.message || 'You need to Register before Login');
  } else if (result.status === 401) {

    showToast(result.data.message || 'Incorrect Email or Password');
  } else if (result.status === 500) {
    showToast(result.data.message || 'Server error');
  } else {
    showToast('An unknown error occurred');
  }
};

const isValidEmail = (email) => {
  // Simple email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
