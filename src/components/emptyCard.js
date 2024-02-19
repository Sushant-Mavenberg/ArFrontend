import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const EmptyCartMessage = ({ navigation }) => (
  <View style={{ alignItems: 'center', marginTop: 10 }}>
    <Image
      source={require('../assets/logo-transparent-png.png')} // Add the path to your image
      style={{ width: 100, height: 100, marginBottom: 20 }}
    />
    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
      Your cart is empty.
    </Text>
   
      <Text style={{ fontSize: 14,color:"black", textAlign: 'center', marginTop: 10 }}>
        It's a nice day to buy the items you saved for later
      </Text>
   
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.shopNowButton}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>
       Continue Shopping
      </Text>
    </TouchableOpacity>
    
 
  </View>
);

const styles = {
  shopNowButton: {
    backgroundColor: '#496152',
   // borderWidth: 2,
    //borderColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
};

export default EmptyCartMessage;
