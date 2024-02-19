import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
  Platform,
  Pressable,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Error state variables for form validation
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const navigation = useNavigation();

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const handleRegistration = async () => {
    validateForm();
    if (emailError || passwordError || usernameError || phoneNumberError || isLoading) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post('http://192.168.10.125:8000/api/users/register', {
        email: email,
        password: password,
        userName: username,
        phoneNumber: phoneNumber,
      });

      console.log('Registration success:', response.data);
      showToast('Registration success');
      navigation.replace('ChooseLogin');
    } catch (error) {
      setIsLoading(false);

      if (error.response && error.response.data && error.response.data.message) {
        showToast(error.response.data.message);
      } else {
        showToast('An error occurred during registration.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const validateForm = () => {
    // Reset error states
    setEmailError('');
    setPasswordError('');
    setUsernameError('');
    setPhoneNumberError('');

    // Validate email
    if (!email) {
      setEmailError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is invalid');
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
    } else if (password.length <= 6) {
      setPasswordError('Password must be at least 6 characters');
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(password)) {
      setPasswordError(
        'Password must contain at least one digit, one lowercase letter, one uppercase letter, and one special character'
      );
    }

    // Validate username
    if (!username) {
      setUsernameError('Username is required');
    }

    // Validate phone number (customize as needed)
    if (!phoneNumber) {
      setPhoneNumberError('Phone number is required');
    } else if (!/^\+91[0-9]{10}$/.test(phoneNumber)) {
      setPhoneNumberError('Only Indian country code is accepted (e.g., +91XXXXXXXXXX)');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>Register</Text>
            <Text style={styles.subHeaderText}>Create Your Own Account</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcon name="email" style={styles.icon} size={24} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            borderWidth={0}
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor="#6B7280"
            underlineColorAndroid="transparent"
          />
        </View>
        {emailError && <Text style={styles.errorText}>{emailError}</Text>}
        <View style={styles.inputContainer}>
          <MaterialIcon name="lock" style={styles.icon} size={24} />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!isPasswordVisible}
            borderWidth={0}
            placeholderTextColor="#6B7280"
            underlineColorAndroid="transparent"
          />
          <Pressable style={styles.iconContainer} onPress={togglePasswordVisibility}>
            <MaterialIcon
              name={isPasswordVisible ? 'visibility' : 'visibility-off'}
              style={styles.icon}
              size={24}
            />
          </Pressable>
        </View>
        {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
        <View style={styles.inputContainer}>
          <MaterialIcon name="person" style={styles.icon} size={24} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            borderWidth={0}
            onChangeText={(text) => setUsername(text)}
            placeholderTextColor="#6B7280"
            underlineColorAndroid="transparent"
          />
        </View>
        {usernameError && <Text style={styles.errorText}>{usernameError}</Text>}
        <View style={styles.inputContainer}>
          <MaterialIcon name="phone" style={styles.icon} size={24} />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            placeholderTextColor="#6B7280"
            keyboardType="phone-pad"
            maxLength={13}
            borderWidth={0}
            underlineColorAndroid="transparent"
          />
        </View>
        {phoneNumberError && <Text style={styles.errorText}>{phoneNumberError}</Text>}
        <Pressable style={styles.registerButton} onPress={handleRegistration}>
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </Pressable>
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account?</Text>
          <Pressable
            onPress={() => {
              return navigation.navigate('ChooseLogin');
            }}>
            <Text style={styles.signUpLink}>Sign In</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  googleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 50,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 10
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
   position:"relative",
   bottom:20
  
   
  },

  bottomImage: {
    position: 'absolute',
    bottom: -20,
    resizeMode: "cover",
    width: '120%',
    height: 120,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 150,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconContainer: {
    position: 'absolute',
    right: 15,
    top: 17,
  },
  
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '90%',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    color:"black",
    marginRight: 10,
    marginLeft:12,
 
   
    
  },
  image: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 158,
    height: 165,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F3F4F6',
    marginBottom: 20,
  
    justifyContent:"center",
    borderRadius: 10,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: 'green',
    paddingLeft: 20,
    color: '#6B7280',
    fontWeight: 'bold',
  },
  registerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#40744D',
    padding: 12,
    borderRadius: 80,
    width: '100',
    marginBottom:20
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    width:'100%',
   fontWeight:"700"
  },
  additionalText: {
    marginVertical: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  signInContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  signInText: {
    color: 'black',
    fontSize: 14,
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: '600',
    color: 'blue',
  },
});

export default RegistrationPage;
