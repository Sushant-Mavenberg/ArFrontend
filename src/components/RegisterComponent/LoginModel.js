import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, Pressable, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { verifyOTP } from '../../../Utils/authUtility';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginModal = ({ visible, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const otpInputRefs = Array(4).fill(0).map((_, index) => React.createRef());

  const handleSendOTP = async () => {
    // Remove non-numeric characters from the phone number
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

    // Check if the phone number is empty or less than 10 digits
    if (cleanedPhoneNumber === '' || cleanedPhoneNumber.length !== 10) {
      showToast('Please enter a valid phone number');
      return;
    }
    try {
      // Send a POST request to the server to send OTP
      const response = await axios.post("http://192.168.10.110:8000/api/users/send-otp", {
        phoneNumber: `+91${cleanedPhoneNumber}` // Include the cleaned phone number as the payload
      });
      
      if (response.data.success === "true") {
        setOtpSent(true);
      }
      // Handle the response if needed
      showToast(response.data.message); // Assuming the server sends back some data
      // Show a success message or perform other actions as required
    } catch (error) {
      // Handle errors from the server or network
      console.error('Error sending OTP:', error);
      showToast('Failed to send OTP. Please try again later.');
    }
  };

  const handleVerifyOTP = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.trim() === '') {
      showToast('Please enter the OTP');
      return;
    }
    try {
      console.log(otp.join(""));
      // Send a POST request to the server to send OTP
      const response = await axios.post("http://192.168.10.110:8000/api/users/login-via-otp", {
        phoneNumber: `+91${phoneNumber}`,
        otp:otp.join("")
      });
      
      if (response.data.success === "true") {
        try {
          await AsyncStorage.setItem('token', response.data.token);
          
          onClose();
        } catch (error) {
          console.log('Error storing token:', error);
        }
      }
      // Handle the response if needed
      showToast(response.data.message); // Assuming the server sends back some data
      // Show a success message or perform other actions as required
    } catch (error) {
      // Handle errors from the server or network
      console.error('Error while Login:', error);
      showToast('Failed to Login. Please try again later.');
    }
  };

  const showToast = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.headerContainer}>
            {/* Logo image */}
            <Image source={require('../../assets/login-model-logo.png')} style={styles.logo} />
            {/* Cross icon */}
            <Pressable style={styles.closeIcon} onPress={() => onClose()}>
              <Icon name="close" size={20} color="black" />
            </Pressable>
          </View>
          {/* Header text for Login */}
          <Text style={styles.headerText}>Login</Text>
          {/* Render phone number input box and send OTP button if OTP has not been sent */}
          {!otpSent && (
            <>
              <TextInput
                style={[styles.input, { color: 'black' }]}
                placeholderTextColor="gray"
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={(text) => {
                  // Remove non-numeric characters from the input
                  const cleanedText = text.replace(/\D/g, '');
                  // Update the state only if the cleaned text is less than or equal to 10 characters
                  if (cleanedText.length <= 10) {
                    setPhoneNumber(cleanedText);
                  }
                }}
                maxLength={10} // Maximum length of the input field
              />
              <TouchableOpacity style={styles.continueButton} onPress={handleSendOTP}>
                <Text style={styles.buttonText}>Send OTP</Text>
              </TouchableOpacity>
            </>
          )}
          {/* Render OTP input boxes and verify button if OTP has been sent */}
          {otpSent && (
            <>
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={otpInputRefs[index]}
                    style={[styles.otpInput, { color: 'black' }]}
                    placeholderTextColor="gray"
                    placeholder={(index + 1).toString()}
                    keyboardType="numeric"
                    maxLength={1}
                    value={digit}
                    onChangeText={(text) => {
                      const numericText = text.replace(/\D/g, ''); // Remove non-numeric characters
                      const updatedOtp = [...otp];
                      updatedOtp[index] = numericText;
                      setOtp(updatedOtp);
                      if (numericText.length === 1 && index < otpInputRefs.length - 1) {
                        otpInputRefs[index + 1].current.focus(); // Focus on the next OTP input box
                      }
                    }}
                  />
                ))}
              </View>
              <TouchableOpacity style={styles.continueButton} onPress={handleVerifyOTP}>
                <Text style={styles.buttonText}>Verify OTP</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  logo: {
    width: 60, // Set the width as per your design
    height: 60, // Set the height as per your design
  },
  closeIcon: {
    padding: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#496152',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  otpInput: {
    width: '22%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin:5
  },
  continueButton: {
    backgroundColor: '#496152',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LoginModal;
