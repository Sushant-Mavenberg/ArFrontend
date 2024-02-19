import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, ActivityIndicator, BackHandler, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import GradientHeader from '../../components/HomePageComponents/Header';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import Feather from 'react-native-vector-icons/Feather';

import { RAZOR_PAY_KEY_ID, RAZOR_PAY_KEY_SECRET } from '@env'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { OrderReviewPage, BottomBar } from '../orderReview/orderReview';
import PaymentCancelledMessage from '../../components/payement/PaymentCancelledMessage';
import CustomAlert from '../../components/payement/PaymentCancelledMessage';
import OrderConfirmationScreen from '../OrderScreen/OrderScreen';
import { generateOrder } from '../../Redux/orderReducer';
import { useSelector, useDispatch } from 'react-redux';
import { selectToken } from '../../Redux/tokenReducer';
import { ToastAndroid } from 'react-native';


const showToast = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

const ConfirmationScreen = ({ route }) => {
  const [token, setToken] = useState(null);
  const { subtotal, totalDiscount } = route.params;
  const [showAlert, setShowAlert] = useState(false);
  const [orderId, SetOrderId] = useState("");
  const [serverOrderId, setServerOrderId] = useState("");
  const { goBack, navigate } = useNavigation();
  const isFocused = useIsFocused();
  const [loadingOrderId, setLoadingOrderId] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const steps = [
    { title: 'Address', content: 'Address Form' },
    { title: 'Order Review', content: 'Delivery Options' },
    { title: 'Payment', content: 'Payment Details' },
    { title: 'Place Order', content: 'Order Summary' },
  ];

  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cartItems = useSelector((state) => state.cart.products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setToken(token);
        console.log(token, "ssv");
        const response = await axios.get('http://192.168.10.110:8000/api/users/addresses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAddresses(response.data.addresses);

        const defaultAddress = response.data.addresses.find((address) => address.default);
        if (defaultAddress) {
          setSelectedAdress(defaultAddress);
        }
      } catch (error) {
        setError('Failed to fetch addresses. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isFocused]);

  const handlePayment = async () => {
    const razorPayKeyId = RAZOR_PAY_KEY_ID;
    const currency = 'INR';

    const options = {
      description: 'Credits towards consultation',
      image: 'https://scontent.fblr2-3.fna.fbcdn.net/v/t39.30808…p8E14iq9ZP2Oi5rnnbgRrYppi1ouY2Pr0lQEg&oe=659AE24C',
      currency: currency,
      key: razorPayKeyId,
      amount: (subtotal - totalDiscount.totalDiscount) * 100,
      name: 'Arphibo',
      order_id: orderId,
      prefill: {
        email: 'challapallivamsi013@gmail.com',
        contact: '8886325653',
        name: 'vamsi krishna',
      },
      theme: { color: '#496152' },
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      }
    };

    try {
      const productsArray = cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity.toString()
      }));

      const createOrderResponse = await axios.post('http://192.168.10.110:8000/api/orders/create-order', {
        products: productsArray,
        orderTotal: (subtotal - totalDiscount.totalDiscount).toString(),
        shippingAddress: selectedAddress._id, // Replace with your actual shipping address ID
        shippingAmount: '0', // Replace with your actual shipping amount
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setServerOrderId(createOrderResponse.data.orderId);
      const data = await RazorpayCheckout.open(options);
      console.log(data, "DATA");
      if (data) {
        const payload = {
          orderId: serverOrderId,
          amount: (subtotal - totalDiscount.totalDiscount).toString() || "",
          paymentMethod: "UPI" || "",
          razorpayPaymentId: data.razorpay_payment_id || "",
          razorpayOrderId: data.razorpay_order_id || "",
          razorpaySignature: data.razorpay_signature || ""
        };

        const response = await axios.post('http://192.168.10.110:8000/api/payments/verify', payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success === true) {
          setPaymentStatus("success");
        }
      }

      // const productsArray = cartItems.map(item => ({
      //   productId: item.id,
      //   quantity: item.quantity.toString(),
      // }));

      setCurrentStep(currentStep + 2);

      // dispatch(generateOrder({
      //   orderPayload: {
      //     products: productsArray,
      //     orderTotal: (subtotal - totalDiscount.totalDiscount).toString(),
      //     shippingAddress: selectedAddress._id, // Replace with your actual shipping address ID
      //     shippingAmount: '0', // Replace with your actual shipping amount
      //     paymentMethod: 'online',
      //     paymentId: data.razorpay_payment_id,
      //   },

      // }));

      return;
    } catch (error) {
      console.error('Error making API call:', error);
      try {
        const errorDetails = JSON.parse(error.description);
        console.log(errorDetails.error.reason);
        if (errorDetails.error.reason === 'payment_cancelled') {
          setPaymentStatus("failure");
          setShowAlert(true);
        } else {
          // Handle other errors or show a general error message
          alert(`Error: ${errorDetails.error.code} | ${errorDetails.error.description}`);
        }
      } catch (parseError) {
        console.log('Error parsing JSON:', parseError);
        // Handle the error in parsing JSON string
        alert('Error parsing JSON');
      }
    }
  };

  const handleRemoveAddress = async () => {
    try {
      if (selectedAddress) {
        // Show a confirmation dialog to ensure the user wants to remove the address
        // You can use any library or create your custom confirmation modal
  
        // Example using React Native Alert
        Alert.alert(
          'Remove Address',
          'Are you sure you want to remove this address?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Remove',
              onPress: async () => {
                // Retrieve the user's authentication token from AsyncStorage
                const userAuthToken = await AsyncStorage.getItem('token');
  
                const apiUrl = `http://192.168.10.110:8000/api/users/addresses/${selectedAddress._id}/delete`;
  
                const response = await axios.delete(apiUrl, {
                  headers: {
                    Authorization: `Bearer ${userAuthToken}`,
                  },
                });
  
                if (response.data.success) {
                  showToast(response.data.message);
                  // Optionally, navigate back to the previous screen or perform any other action
                  navigation.goBack();
                } else {
                  showToast('Failed to remove address. Please try again.');
                }
              },
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      showToast('Error occurred while removing address. Please try again.');
      console.error('API Error:', error.message);
    }
  };
  

  const handleMakePayment = async () => {
    try {
      setLoadingOrderId(true);
      await GeneratingObject();
      console.log({ orderId: orderId });
      setLoadingOrderId(false);
      handlePayment();
    } catch (error) {
      console.error('Error generating order ID:', error);
      setLoadingOrderId(false); // Ensure to set loading to false in case of an error
      // Handle the error as needed
    }
  };

  const handleEditPress = (item) => {
    if (!selectedAddress || selectedAddress._id !== item._id) {
      // Show Android Toast message indicating that the user should select an address before editing
      ToastAndroid.show("Select an address before editing", ToastAndroid.SHORT);
      return;
    }

    // Navigate to 'AddressScreen' with the selected address for editing
    navigate('AddressScreen', { selectedAddress: selectedAddress });
  };

  useEffect(() => {
    const handleBackPress = () => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      backHandler.remove();
    };
  }, [currentStep]);

  useEffect(() => {
    if (isFocused) {
      // Additional logic when the screen is focused
    }
  }, [isFocused, currentStep]);

  const GeneratingObject = async () => {

    try {
      const orderPayload = {
        cartTotal: subtotal.toString(),
      };


      const token = await AsyncStorage.getItem('token');
      setLoading(true);

      const response = await axios.post('http://192.168.10.110:8000/api/payments/create-razorpay-order', orderPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      SetOrderId(response.data.razorpayOrderId);
    } catch (error) {
      // navigation.navigate('ErrorScreen', { errorMessage: 'something wrong to place the order. Please try again.' });
      console.log('Error placing order:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleDeliverToAddress = () => {
    setCurrentStep(1);
  }

  const handlePlaceOrder = async () => {
    setCurrentStep(1);
  };

  const [selectedAddress, setSelectedAdress] = useState('');
  const [option, setOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  // console.log(selectedAddress)
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      goBack();
    }
  };
  const customStyles = {
    stepIcon: {
      width: 10, // Adjust the width as needed
      height: 10, // Adjust the height as needed
    },
    stepText: {
      fontSize: 8, // Adjust the font size as needed
    },
  };

  return (
    <>
      {loadingOrderId && (
        <View style={styles.loadingContainerr}>
          <ActivityIndicator size="large" color="#496152" />
        </View>
      )}
      <GradientHeader
        navigation={navigation}
        text={steps[currentStep].title}
        onBackPress={handleBack}
      />
      <ScrollView>

        <View style={{ flex: 1 }}>
          <ProgressSteps
            activeStep={currentStep}
            progressBarColor="#496152"
            completedProgressBarColor="#496152"
            activeStepIconBorderColor="#496152"
            activeStepIconColor="white"
            activeStepNumColor="#496152"
            activeLabelColor='#496152'
            completedStepIconColor="#496152"
            disabledStepIconColor="gray"
            activeLabelFontSize={10} // Adjust the size of the active step icon
            labelFontSize={10}
            borderWidth={2}
            customStyles={customStyles}
          >
            {steps.map((step, index) => (
              <ProgressStep
                key={index}
                label={step.title}
                nextBtnTextStyle={{ display: 'none' }} // Hide the next button text
                nextBtnStyle={{ display: 'none' }} // Hide the next button
                previousBtnTextStyle={{ display: 'none' }} // Hide the previous button text
                previousBtnStyle={{ display: 'none' }}
                finishBtnTextStyle={{ color: 'white' }}
                finishBtnStyle={{ backgroundColor: '#496152' }}
              >
                {index === 0 && (
                  <View style={{ marginHorizontal: 16 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: "black" }}>Select Delivery Address</Text>

                    {loading ? (
                      <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#008397" />
                      </View>
                    ) : (
                      <View>
                        {addresses?.map((item, index) => (
                          <Pressable
                            key={index}
                            style={{
                              borderWidth: 1,
                              borderColor: "#D0D0D0",
                              padding: 10,
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 5,
                              paddingBottom: 17,
                              marginVertical: 7,
                              borderRadius: 6,
                            }}
                          >
                            {selectedAddress && selectedAddress._id === item?._id ? (
                              <Feather name="check-circle" size={24} color="#008397" />
                            ) : (
                              <Feather
                                onPress={() => setSelectedAdress(item)}
                                name="circle"
                                size={24}
                                color="gray"
                              />
                            )}

                            <View style={{ marginLeft: 6 }}>
                              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "black" }}>
                                  {item?.name}
                                </Text>
                                <Text style={{
                                  color: "white",
                                  borderRadius: 5,
                                  backgroundColor: "#496152",
                                  padding: 5,
                                  fontSize: 10,
                                  fontWeight: "bold"
                                }}>{item?.type}</Text>

                                {item.default && (
                                  <Text style={{ marginLeft: 6, fontSize: 12, color: "green", fontWeight: "bold" }}>Default</Text>
                                )}
                              </View>
                              <Text style={styles.addressText} numberOfLines={3}>
                                {`${item?.houseNo}, ${item?.landmark}, ${item?.street}, ${item?.country || "India"}`}
                              </Text>

                              <Text style={{ fontSize: 13, color: "#181818", fontWeight: "600" }}>
                                phone: {item?.phoneNumber}
                              </Text>
                              <Text style={{ fontSize: 13, color: "#181818", fontWeight: "600" }}>
                                pin code: {item?.postalCode}
                              </Text>

                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  gap: 10,
                                  marginTop: 7,
                                }}
                              >
                                <Pressable
                                  onPress={() => handleEditPress(item)}
                                  style={{
                                    backgroundColor: "#F5F5F5",
                                    paddingHorizontal: 10,
                                    paddingVertical: 6,
                                    borderRadius: 5,
                                    borderWidth: 0.9,
                                    borderColor: "#D0D0D0",
                                  }}
                                >
                                  <Text style={{ color: "black", fontWeight: "600" }}>Edit</Text>
                                </Pressable>

                                <Pressable
                                  onPress={() => handleRemoveAddress()}
                                  style={{
                                    backgroundColor: "#F5F5F5",
                                    paddingHorizontal: 10,
                                    paddingVertical: 6,
                                    borderRadius: 5,
                                    borderWidth: 0.9,
                                    borderColor: "#D0D0D0",
                                  }}
                                >
                                  <Text style={{ color: "black", fontWeight: "600" }}>Remove</Text>
                                </Pressable>

                              </View>

                              <View>
                                {selectedAddress && selectedAddress._id === item?._id && (
                                  <Pressable
                                    onPress={() => handleDeliverToAddress()}
                                    style={{
                                      backgroundColor: "#496152",
                                      padding: 10,
                                      borderRadius: 20,
                                      justifyContent: "center",
                                      alignItems: "center",
                                      marginTop: 10,
                                    }}
                                  >
                                    <Text style={{ textAlign: "center", color: "white" }}>
                                      Deliver to this Address
                                    </Text>
                                  </Pressable>
                                )}
                              </View>
                            </View>
                          </Pressable>
                        ))}

                        <Pressable
                          onPress={() => navigate('AddressScreen', { selectedAddress: null })}
                          style={{
                            borderWidth: 1,
                            borderColor: "#D0D0D0",
                            padding: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            marginVertical: 7,
                            borderRadius: 6,
                          }}
                        >
                          <MaterialCommunityIcons name="plus-circle" size={20} color="#008397" />
                          <Text style={{ marginLeft: 6, fontSize: 15, fontWeight: "bold", color: "black" }}>
                            Add New Address
                          </Text>
                        </Pressable>
                      </View>
                    )}
                  </View>
                )}

                {index === 1 && (
                  <View>
                    <OrderReviewPage subtotal={subtotal} totalDiscount={totalDiscount} selectedAddress={selectedAddress} />
                  </View>
                )}

                {index === 2 && <Text style={{ color: "black" }}>ORDER PLACED</Text>}
                {index === 3 && <OrderConfirmationScreen />}


              </ProgressStep>
            ))}
          </ProgressSteps>
        </View>
      </ScrollView>
      {currentStep === 1 && (
        <BottomBar
          handleMakePayment={handleMakePayment}
          totalAmount={subtotal - totalDiscount.totalDiscount}
          savedAmount={totalDiscount.totalDiscount}
        />
      )}
      <CustomAlert
        isVisible={showAlert}
        message={paymentStatus === "success" ? "Payment Successful" : "Payment Cancelled"}
        onClose={() => setShowAlert(false)}
      />
    </>

  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
  paymentOption: {
    backgroundColor: 'white',
    padding: 8,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 10,


  },
  addressText: {
    color: "black",
    fontWeight: "500",

    // Adjust this margin as needed
  },
  loadingContainerr: {
    ...StyleSheet.absoluteFillObject, // This style will make the loading container cover the whole screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // You can adjust the opacity here
    zIndex: 1, // Ensure it appears on top
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 240
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

