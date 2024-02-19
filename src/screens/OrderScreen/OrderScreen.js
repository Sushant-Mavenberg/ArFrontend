import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckmarkImage from '../../assets/right.png';
import SplashScreenImage from '../../assets/splashde.gif';
import FastImage from 'react-native-fast-image';

const imageUrls = [
  'https://res.cloudinary.com/dlzcgycpi/image/upload/v1701072424/61UWr8EQEYL._AC_UF894_1000_QL80__bprr1m.jpg',
  'https://res.cloudinary.com/dlzcgycpi/image/upload/v1701072250/Metal-Planters_cpstye.jpg',
  'https://res.cloudinary.com/dlzcgycpi/image/upload/v1701072250/Gianna-Modern-White-Metal-Planters-Set-of-2_9acb6e33-84f1-4fbf-8af9-6034cf83e974.12e1c94fdac4e208fc0d8c91406219d4_wl06k0.jpg',
  // Add more image URLs as needed
];

const OrderConfirmationScreen = ({}) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide splash after 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
    {showSplash && (
        <FastImage
          source={SplashScreenImage}
          style={styles.splashImage}
        />
      )}
      <Image source={CheckmarkImage} style={styles.checkmarkImage} />
      <View>
        <Text style={styles.title}>Wooho! Order Placed🎉</Text>
        <Text style={styles.savedText}>You saved ₹3,456.00 on this Order</Text>
      </View>

      <View style={styles.imageMain}>
        <View style={styles.imageBox}>
          {imageUrls.map((imageUrl, index) => (
            <Image key={index} source={{ uri: imageUrl }} style={styles.image} />
          ))}
        </View>
        <View style={{ borderWidth: 0.5, borderColor: 'grey', marginVertical: 10 }} />
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity>
            <Text style={{ color: "#496152", fontWeight: "600" }}>View My Orders</Text>
          </TouchableOpacity>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#496152" style={{ marginLeft: 10 }} />
        </View>
      </View>

      <View>
        <Text style={styles.headerText}>Delivery Address</Text>
        <Text style={styles.productInfoText}>Jabalpur, Gggg, Narsinghpur, Madhya Pradesh 487661</Text>

        <TouchableOpacity style={styles.continueShoppingButton}>
          <Text style={styles.buttonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.headerText}>Payment Details</Text>
        <View style={styles.paymentText}>
          <Text style={styles.productInfoText}>MRP Total</Text>
          <Text style={styles.productInfoText}>₹3,456.00</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.paymentText}>
          <Text style={styles.productInfoText}>Product Discount</Text>
          <Text style={styles.productInfoText}>₹3,456.00</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.paymentText}>
          <Text style={styles.productInfoText}>Delivery Fee FREE</Text>
          <Text style={styles.productInfoText}>₹3,456.00</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.paymentText}>
          <Text style={styles.productInfoText}>Total Amount</Text>
          <Text style={styles.productInfoText}>₹3,456.00</Text>
        </View>

        <Text style={styles.savedText}>You Saved ₹3,456.00</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16
  },
  separator: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
    marginVertical: 8,
  },
  splashImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex:999
  },
  checkmarkImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20, // Adjusted font size
    fontWeight: 'bold',
    color: "black"
  },
  savedText: {
    marginVertical: 10,
    fontSize: 12,
    color: "#496152",
    fontWeight: "600",
  },
  paymentText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5
  },
  imageMain: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  imageBox: {
    gap: 10,
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 16, // Adjusted font size
    fontWeight: 'bold',
    marginVertical: 5,
    color: "black"
    // Align to the right
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    marginVertical: 10,
    borderRadius: 10,
  },
  viewOrdersButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
    textAlign: "center",
    fontWeight: "600"
  },
  addressText: {
    textAlign: 'right', // Align to the right
  },
  continueShoppingButton: {
    backgroundColor: '#496152',
    padding: 10,
    borderRadius: 15,
    marginVertical: 10,
    fontSize: 10,
    fontWeight: "bold"
  },
  rateText: {
    fontSize: 16, // Adjusted font size
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'right', // Align to the right
  },
  ratingButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  ratingButton: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    width: '30%',
    alignItems: 'center',
  },
  paymentDetailsText: {
    fontSize: 16, // Adjusted font size
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'right', // Align to the right
  },
  productInfoText: {
    fontSize: 12,
    color: 'black', // Align to the left
  },
});

export default OrderConfirmationScreen;
