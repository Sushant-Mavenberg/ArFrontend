import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
  ToastAndroid,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Email_login, storeToken } from '../../ApiManagement/UserApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../../../Utils/authUtility';
export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    loginUser(email, password, showToast, navigation, setLoading);
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


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: '#496152' }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={-StatusBar.currentHeight}
    >
      <SafeAreaView style={{ flex: 0.7 }}>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
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
            <Text style={{ color: 'white', padding: 12,fontSize:16 }}>Skip</Text>
          </Pressable>
        </View>
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
          paddingTop: 20,
        }}
      >
        <View style={{ marginBottom: 30 }}>
          <Text style={{ color: '#6B7280', marginLeft: 10, marginBottom: 15 }}>Email Address</Text>
          <TextInput
            style={{
              padding: 15,
              backgroundColor: '#F3F4F6',
              color: '#6B7280',
              borderRadius: 20,
              marginBottom: 15,
            }}
            placeholder="Email"
            placeholderTextColor="black"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Text style={{ color: '#6B7280', marginLeft: 10, marginBottom: 15 }}>Password</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={{
                flex: 1,
                padding: 15,
                backgroundColor: '#F3F4F6',
                color: '#6B7280',
                borderRadius: 20,
              
              }}
              secureTextEntry={!showPassword}
              placeholder="Password"
              placeholderTextColor="black"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <Pressable onPress={toggleShowPassword} style={{ position: 'absolute', right: 20 }}>
              <MaterialCommunityIcons
                name={showPassword ? 'eye-off' : 'eye'}
                size={25}
                color="#6B7280"
              />
            </Pressable>
          </View>
          <TouchableOpacity>
            <Text style={{ color: '#6B7280', marginTop: 10, marginBottom: 20 }}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#496152',
              borderRadius: 20,
              paddingVertical: 15,
              marginBottom: 20,
            }}
            onPress={handleLogin}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ fontSize: 16, fontWeight: '500', color: '#fff', textAlign: 'center' }}>Login</Text>
            )}
          </TouchableOpacity>

          {/* New Text component for agreement */}
          <Text style={{ fontSize: 14, color: '#6B7280', textAlign: 'center' }}>
            By continuing, I agree to the 
            <Text style={{ color: '#F59E0B' }}> Privacy Policy</Text>.
          </Text>
        </View>

        

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ color: '#6B7280', fontWeight: '600' }}>Don't have an account?</Text>
          <Pressable onPress={() => navigation.navigate('Registration')}>
            <Text style={{ color: '#F59E0B', fontWeight: '600' }}> Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
