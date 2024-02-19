import React, { useState,useRef,useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SmsRetriever from 'react-native-sms-retriever';
import { Email_login } from '../../ApiManagement/UserApi';
import ApiManager from '../../ApiManagement/ApiManager';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const textInputRef = useRef(null);
  useFocusEffect(
    React.useCallback(() => {
      // Focus on the input field when the screen is focused
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    }, [])
  );
 
  

  const handleSendOTP = async () => {
    // Basic validation for email or phone number
    if (!emailOrPhone.trim()) {
      showToast('Please enter your phone number.');
      return;
    }

    // Check if the phone number has a valid length
    if (emailOrPhone.trim().length !== 10) {
      showToast('Please enter a valid mobile number.');
      return;
    }

    // Add leading '+91' if not present
    const formattedPhoneNumber = emailOrPhone.trim().startsWith('+91')
      ? emailOrPhone.trim()
      : `+91${emailOrPhone.trim()}`;

    try {
      setIsLoading(true); // Set loading state to true

      const apiEndpoint = 'api/users/send-otp';
      const data = {
        phoneNumber: formattedPhoneNumber,
      };

      const result = await Email_login(apiEndpoint, data);
     

      if (result.data.success === 'true') {
      
        navigation.navigate('otp', { phoneNumber: formattedPhoneNumber });
      } else {
        showToast(result.data.message || 'Error sending OTP. Please try again.');
      }
    } catch (error) {
    
      showToast('Error sending OTP. Please try again.');
    } finally {
      setIsLoading(false); // Set loading state to false, whether it's successful or not
    }
  };

  const handlePhoneNumberPress = async () => {
    console.log("calling")
    console.log('Trying to request phone number...');
    try {
      const phoneNumber = await SmsRetriever.requestPhoneNumber();
      console.log('Phone number requested successfully:', phoneNumber);

      // Remove the country code if it's present
      const formattedPhoneNumber = phoneNumber.startsWith('+91') ? phoneNumber.substring(3) : phoneNumber;

      // Limit input to a maximum of 10 characters
      const trimmedPhoneNumber = formattedPhoneNumber.slice(0, 10);
      console.log(trimmedPhoneNumber);
      setEmailOrPhone(trimmedPhoneNumber);
   
    } catch (error) {
      console.log('Error requesting phone number:', error.message);
    }
  };

  const showToast = (message) => {
    ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
  };
 
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: '#496152' }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={-StatusBar.currentHeight}
    >
      <SafeAreaView style={{ flex: 0.3 }}>
        <StatusBar translucent backgroundColor="transparent" />
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              padding: 10,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              marginLeft: 14,
            }}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={25}
              color="black"
              style={{
                fontSize: 18,
                color: '#555',
                padding: 12,
                backgroundColor: '#F0F0F0',
                borderRadius: 12,
              }}
            />
          </Pressable>
          <View style={{ width: 20 }} />
          <Pressable
            onPress={() => navigation.navigate('main')}
            style={{
              padding: 10,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <Text style={{ color: 'white', padding: 12, fontSize: 16 }}>Skip</Text>
          </Pressable>
        </View> */}
        <View style={{ marginBottom: 20, alignItems: 'center', backgroundColor: '#496152' }}>
          {/* Image Component */}
          <Image source={require('../../assets/login-remove.png')} style={{ width: 210, height: 210 }} />
        </View>
      </SafeAreaView>
      <View
        style={{
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          flex: 1,
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingTop: 30,
        }}
      >
        <View style={{ marginBottom: 30 }}>
          <Text style={{ color: '#6B7280', marginBottom: 15, marginLeft: 10 }}>Phone Number</Text>
          <TextInput
            style={{
              padding: 15,
              backgroundColor: '#F3F4F6',
              color: '#6B7280',
              borderRadius: 20,
              marginBottom: 15,
            }}
            ref={textInputRef}
            placeholder="Mobile Number"
            keyboardType="numeric"
            autoCapitalize="none"
            placeholderTextColor="black"
            value={emailOrPhone}
            onFocus={handlePhoneNumberPress} // Call the function when input is clicked
            onChangeText={(text) => {
              // Limit input to a maximum of 10 characters
              if (text.length <= 10) {
                setEmailOrPhone(text);
              }
            }}
            maxLength={10} 
            autoFocus={true}// Set maximum length to 10 characters
          />

          <Pressable
            style={{
              backgroundColor: '#496152',
              borderRadius: 20,
              paddingVertical: 15,
            }}
            onPress={handleSendOTP}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ fontSize: 16, fontWeight: '500', color: '#fff', textAlign: 'center' }}>Send OTP</Text>
            )}
          </Pressable>

          {/* New Text component for agreement */}
          <Text style={{ fontSize: 14, color: '#6B7280', textAlign: 'center', marginTop: 20 }}>
            By continuing, I agree to the <Text style={{ color: '#F59E0B' }}>Terms of Use</Text> &{' '}
            <Text style={{ color: '#F59E0B' }}>Privacy Policy</Text>.
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
