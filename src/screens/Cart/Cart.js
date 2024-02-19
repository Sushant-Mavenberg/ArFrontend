import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, SafeAreaView, StatusBar, Pressable, ToastAndroid } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, saveForLater, updateQuantity } from '../../Redux/CartReducer';
import EmptyCartMessage from '../../components/emptyCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyCart = ({ navigation }) => {
  const [subtotal, setSubtotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const products = useSelector(state => state.cart.products)
  const dispatch = useDispatch()

  useEffect(() => {
    const calculateTotal = () => {
      let subTotal = 0;
      let discount = 0;

      products.forEach((product) => {
        subTotal += product.actualPrice * product.quantity;
        discount += (product.actualPrice - product.price) * product.quantity;
      });

      setSubtotal(subTotal);
      setTotalDiscount(discount);
    };

    calculateTotal();
  }, [products]);

  const removeItemFromCart = (id) => {
    dispatch(deleteItem({ id: id }));
  };

  const checkOut = async () => {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      navigation.navigate('SignIn');
      return;
    }

    if (subtotal !== 0) {
      navigation.navigate('ConformationPage', { cartItems: products, totalDiscount: { totalDiscount }, subtotal: (subtotal).toFixed(2) });
    }
  };

  const updateItemQuantity = (id, newQuantity) => {
    const quantityToUpdate = Math.max(newQuantity, 1);

    if (quantityToUpdate > 3) {
      ToastAndroid.show("You cannot add more than 3 items.", ToastAndroid.SHORT);
      return;
    }

    dispatch(updateQuantity({ id: id, quantity: quantityToUpdate }));
  };

  const saveItemForLater = (data) => {
    dispatch(saveForLater(data));
  };

  const renderProducts = (data) => {
    return (
      <Pressable
        key={data.id}
        style={{
          width: '100%',
          height: 130,
          marginVertical: 6,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '35%',
            height: 130,
            padding: 14,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F0F0F0',
            borderRadius: 10,
            marginRight: 22,
          }}>
          <Image
            source={{ uri: data.image }}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
              borderRadius: 10,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'space-around',
          }}>
          <View style={{}}>
            <Text
              style={{
                fontSize: 12,
                maxWidth: '100%',
                color: '#333',
                fontWeight: '600',
                lineHeight: 18,
              }}
              numberOfLines={5}
              ellipsizeMode="tail"
            >
              {data.name}
            </Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                alignItems: 'center',
                opacity: 0.6,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  maxWidth: '85%',
                  marginRight: 4,
                  color: 'black',
                  marginBottom: 5
                }}>
                &#8377;{data?.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Pressable
                  onPress={() => updateItemQuantity(data.id, data.quantity - 1)}
                  style={{
                    borderRadius: 100,
                    marginRight: 20,
                    padding: 4,
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                    opacity: 0.5,
                  }}>
                  <MaterialCommunityIcons
                    name="minus"
                    style={{
                      fontSize: 16,
                      color: '#555',
                    }}
                  />
                </Pressable>
                <Text style={{ color: 'black' }}>{data.quantity}</Text>
                <Pressable
                  onPress={() => updateItemQuantity(data.id, data.quantity + 1)}
                  style={{
                    borderRadius: 100,
                    marginLeft: 20,
                    padding: 4,
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                    opacity: 0.5,
                  }}>
                  <MaterialCommunityIcons
                    name="plus"
                    style={{
                      fontSize: 16,
                      color: 'green',
                    }}
                  />
                </Pressable>
              </View>
              <Pressable onPress={() => saveItemForLater(data)}>
                <Text style={{ fontSize: 12, color: '#496152', marginTop: 10, fontWeight: 600 }}>
                  Save for Later
                </Text>
              </Pressable>
            </View>
            <Pressable onPress={() => removeItemFromCart(data.id)}>
              <MaterialCommunityIcons
                name="delete-outline"
                style={{
                  fontSize: 16,
                  color: 'green',
                  backgroundColor: '#F0F0F0',
                  padding: 8,
                  borderRadius: 100,
                  marginLeft: 20,
                }}
              />
            </Pressable>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <StatusBar backgroundColor={'transparent'} translucent />
        <ScrollView>
          <Text
            style={{
              fontSize: 18,
              color: '#333',
              fontWeight: '500',
              letterSpacing: 1,
              paddingTop: 20,
              paddingLeft: 16,
              marginBottom: 10,
            }}>
            My Cart
          </Text>
          <View style={{ paddingHorizontal: 16 }}>
            <View style={{ paddingHorizontal: 5 }}>
              {products.length > 0 ? products.map(renderProducts) : <EmptyCartMessage navigation={navigation} />}
            </View>
          </View>
          <View style={{ paddingHorizontal: 16, marginBottom: 80 }}>
            <Text
              style={{
                fontSize: 16,
                color: '#333',
                fontWeight: '500',
                letterSpacing: 1,
                marginBottom: 20,
              }}>
              Order Info
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  maxWidth: '80%',
                  color: "black",
                  opacity: 0.5,
                }}>
                Subtotal
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: "black",
                  opacity: 0.8,
                }}>
                &#8377;{subtotal.toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  maxWidth: '80%',
                  color: "black",
                  opacity: 0.5,
                }}>
                Total Discount
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: "black",
                  opacity: 0.8,
                }}>
                -&#8377;{totalDiscount.toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  maxWidth: '80%',
                  color: "black",
                  opacity: 0.5,
                }}>
                Total
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: "black",
                }}>
                &#8377;{(subtotal - totalDiscount).toLocaleString()}
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          height: '8%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LinearGradient
          colors={['#496152', '#496152']}
          style={{
            width: '86%',
            height: '90%',
            borderRadius: 20,
          }}>
          <Pressable
            onPress={() => (subtotal !== 0 ? checkOut() : null)}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                letterSpacing: 1,
                color: '#FFF',
                textTransform: 'uppercase',
              }}>
              CHECKOUT ({(subtotal - totalDiscount).toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })})
            </Text>
          </Pressable>
        </LinearGradient>
      </View>
    </View>
  );
};

export default MyCart;
