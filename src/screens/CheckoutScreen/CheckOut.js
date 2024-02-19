// CheckoutPage.jsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Pressable } from 'react-native';

const CheckoutPage = ({navigation, closeCheckout }) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const handleConfirmOrder = () => {
    // Perform validation on the address, city, postal code, or any other necessary data
    if (address.trim() === '' || city.trim() === '' || postalCode.trim() === '') {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    // Implement logic to confirm the order with the entered details
    // This is where you would typically send the order to a server

    // For simplicity, just show an alert and close the checkout
    Alert.alert('Success', 'Order confirmed!');
    closeCheckout();
  };

  const handlePayment = () => {
    // Navigate to the payment page
    navigation.navigate('PaymentPage');
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '500', marginBottom: 20 }}>
        Enter Your Delivery Details
      </Text>

      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 10,
          marginBottom: 20,
        }}
      />

      <TextInput
        placeholder="City"
        value={city}
        onChangeText={(text) => setCity(text)}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 10,
          marginBottom: 20,
        }}
      />

      <TextInput
        placeholder="Postal Code"
        value={postalCode}
        onChangeText={(text) => setPostalCode(text)}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 10,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={handleConfirmOrder}
        style={{
          backgroundColor: '#2196F3',
          borderRadius: 10,
          padding: 14,
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <Text style={{ color: '#fff', fontWeight: '500' }}>Confirm Order</Text>
      </TouchableOpacity>

      {/* Payment Button */}
      <Pressable
        onPress={handlePayment}
        style={{
          backgroundColor: '#4CAF50',
          borderRadius: 10,
          padding: 14,
          alignItems: 'center',
        }}>
        <Text style={{ color: '#fff', fontWeight: '500' }}>Proceed to Payment</Text>
      </Pressable>
    </View>
  );
};

export default CheckoutPage;
