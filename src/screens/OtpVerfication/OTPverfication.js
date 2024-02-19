import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
  NativeModules,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OTPTextInput from 'react-native-otp-textinput';
import ApiManager from '../../ApiManagement/ApiManager'; // Update the path
import { storeToken } from '../../ApiManagement/UserApi';
import { setToken } from '../../Redux/tokenReducer';
import { useDispatch } from 'react-redux';
// UserData.js
export let userEmail = null;
export let firstName = null;
const SmsListener = NativeModules.SmsListener;

const VerificationPage = ({ navigation, route }) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  useEffect(() => {
    let timerInterval;

    if (resendTimer > 0) {
      timerInterval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [resendTimer]);

  const dispatch = useDispatch();

   const handleVerify = async () => {
    if (otp.length !== 4) {
      ToastAndroid.show('Please enter a valid OTP', ToastAndroid.SHORT);
      return;
    }

    try {
      setIsLoading(true);
      const { phoneNumber } = route.params || { phoneNumber: '' };
      const response = await ApiManager.post('/api/users/login-via-otp', {
        phoneNumber,
        otp,
      });
      console.log(response.data,"otp screen response")
      if (response.data.success) {
        if (response.data.token) {
         
          await storeToken(response.data.token);
        }
        dispatch(setToken(response.data.token));
        userEmail = response.data.email;
        firstName= response.data.firstName
        setIsLoading(false);

        navigation.reset({
          index: 0,
          routes: [{ name: 'main' }],
        });
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
        console.log("Response Data...", response.data)
      } else {
        ToastAndroid.show(response.data.message, ToastAndroid.LONG);
      }
    } catch (error) {
      if (error.response) {
        ToastAndroid.show(`${error.response.data.message}`, ToastAndroid.LONG);
      } else if (error.request) {
        ToastAndroid.show('No response received from the server', ToastAndroid.LONG);
      } else {
        ToastAndroid.show(`${error.message}`, ToastAndroid.LONG);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    ToastAndroid.show('Resending OTP...', ToastAndroid.SHORT);
    setResendTimer(60);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />
      <LinearGradient colors={['#496152', '#496152']} style={{ flex: 1, marginTop: -StatusBar.currentHeight }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>OTP Verification</Text>
          <Text style={styles.validationMessage}>This OTP is valid for 5 minutes.</Text>
        </View>
        <View style={styles.footer}>
          <KeyboardAwareScrollView>
            <Text style={styles.inputHeader}>Code</Text>
            <OTPTextInput
              textInputStyle={styles.OTPStyle}
              inputCount={4}
              tintColor="#fff"
              handleTextChange={(text) => setOtp(text)}
            />
            <Pressable style={styles.verifyButton} onPress={handleVerify}>
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.verifyButtonText}>VERIFY</Text>
              )}
            </Pressable>
            <TouchableOpacity
              style={styles.resendButton}
              onPress={handleResend}
              disabled={resendTimer > 0}
            >
              <Text style={styles.resendButtonText}>
                {resendTimer > 0 ? `Time Remaining: ${resendTimer} sec` : "Resend"}
              </Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    color: '#fff',
  },
  validationMessage: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 22,
    paddingVertical: 30,
  },
  inputHeader: {
    textTransform: 'uppercase',
    fontSize: 14,
    marginVertical: 8,
  },
  OTPStyle: {
    backgroundColor: '#ccc',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    height: 48,
    width: 48,
    borderBottomWidth: 1,
  },
  verifyButton: {
    backgroundColor: '#496152',
    borderRadius: 20,
    paddingVertical: 15,
    marginTop: 20,
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
  resendButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  resendButtonText: {
    color: '#496152',
    fontSize: 14,
    fontWeight: "600",
  },
});

export default VerificationPage;
