import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const OrderReviewPage = ({selectedAddress,subtotal,totalDiscount}) => {
  
    
  
    const cartItemss = useSelector((state) => state.cart.products);
   
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          {/* Delivery Address */}
          <View style={styles.deliveryAddressContainer}>
            <Text style={styles.headerText}>Delivery Address</Text>
            <View style={{flexDirection:"row",gap:5,alignItems:"center"}}>
            <Text style={styles.addressName}>{selectedAddress.name}</Text>
            <Text style={styles.addressType}>{selectedAddress.type}</Text>
            </View>
          
            <Text style={styles.addressText}>
              {selectedAddress.street}, {selectedAddress.landmark}, {selectedAddress.state}, {selectedAddress.postalCode}
            </Text>
            <Text style={styles.addressText}>India</Text>
            <Text style={styles.addressText}>phone: {selectedAddress.phoneNumber}</Text>
          </View>
  
          {/* Cart Items */}
          <View style={styles.cartContainer}>
          <Text style={styles.headerText}>Cart</Text>
          {cartItemss.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={{flexDirection:"row", gap:10,alignItems:"center"}}>
                <Text style={styles.itemPrice}>&#8377;{(item.price).toFixed(2)}</Text>
                <Text style={styles.actualPrice}>&#8377;{(item.actualPrice).toFixed(2)}</Text>
                </View>
               <Text style={styles.savedPrice}>You save  &#8377;{(item.actualPrice-item.price).toFixed(2)}</Text>
                <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                <Text style={styles.DeliveryDate}>Delivery Between 8th Jan to 9th Jan</Text>
              </View>
            </View>
          ))}
        </View>
  
          {/* Payment Details */}
          <View style={styles.paymentDetailsContainer}>
  <Text style={styles.paymentHeaderText}>Payment Details</Text>

  <View style={styles.paymentDetailItem}>
    <Text style={styles.paymentDetailLabel}>MRP Total</Text>
    <Text style={styles.paymentDetailValue}>&#8377;{subtotal.toLocaleString('en-IN')}</Text>
  </View>

  <View style={styles.paymentDetailItem}>
    <Text style={styles.paymentDetailLabel}>Product Discount</Text>
    <Text style={styles.paymentDetailValue}>- &#8377;{totalDiscount.totalDiscount.toLocaleString('en-IN',{ minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
  </View>

  <View style={styles.paymentDetailItem}>
    <Text style={styles.paymentDetailLabel}>Delivery Fee</Text>
    <Text style={styles.paymentDetailFree}>FREE</Text>
  </View>

  <View style={styles.paymentDetailSeparator}></View>

  <View style={styles.paymentDetailItem}>
    <Text style={[styles.paymentDetailLabel, styles.totalLabel]}>Total</Text>
    <Text style={[styles.paymentDetailValue, styles.totalValue]}>&#8377;{(subtotal - totalDiscount.totalDiscount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
  </View>

  <View style={styles.paymentDetailItem}>
    <Text style={[styles.paymentDetailLabel, styles.savedLabel]}></Text>
    <Text style={[styles.paymentDetailValue, styles.savedValue]}>You Saved  &#8377;{totalDiscount.totalDiscount.toLocaleString('en-IN',{ minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
  </View>
</View>

        </ScrollView>
  
      
     
      </View>
    );
  };
  const BottomBar = ({ handleMakePayment, totalAmount, savedAmount }) => (
    <View style={styles.bottomBarContainer}>
      <View style={styles.bottomBarLeft}>
        <Text style={styles.bottomBarTextt}>&#8377;{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
        <Text style={styles.bottomBarText}>You Saved - &#8377;{savedAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
      </View>
      <TouchableOpacity style={styles.makePaymentButton} onPress={() => handleMakePayment()}>
        <Text style={styles.makePaymentButtonText}>Make Payment</Text>
      </TouchableOpacity>
    </View>
  );
  

const styles = StyleSheet.create({
  deliveryAddressContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 10,
    marginHorizontal:16
  },
  cartContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
    marginHorizontal:16
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  addressName:{
    fontSize:12,
    fontWeight:"bold",
    color:"black"
  },
  addressText: {
    fontSize: 12,
   fontWeight:"400",
    color: 'black',
  },
  addressType:{
     color:"white",
     backgroundColor:"#496152",
     padding:5,
     fontSize:10,
     fontWeight:"bold",
     borderRadius:5
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 6,
    color: 'black',
  },
  itemPrice: {
    fontSize: 14,
    marginBottom: 6,
    color: 'black',
    fontWeight:"bold"
  },
  actualPrice:{
    fontSize: 12,
    marginBottom: 6,
    color: 'grey',
    textDecorationLine: 'line-through', // Add this line
  },
  savedPrice:{
    fontSize:12,
    fontWeight:"bold",
    color:"green",
    backgroundColor:"#B4EDCC",
    width:110,
    padding:2,
    borderRadius:3,
    marginBottom:5
  },
  itemQuantity: {
    fontSize: 12,
    color: 'black',
    marginBottom:5,
    fontWeight:"600"
  },
  paymentDetailsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    marginHorizontal:16
  },
  paymentHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 12,
  },
  paymentDetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  paymentDetailLabel: {
    fontSize: 14,
    color: 'black',
  },
  DeliveryDate:{
    fontSize:12,
    fontWeight:"600",
    color:"#496152",
    marginBottom:5
  },
  paymentDetailFree:{
    fontSize: 14,
    color: 'green',
    fontWeight:"bold"
  },
  paymentDetailValue: {
    fontSize: 14,
    color: 'black',
  },
  paymentDetailSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 8,
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  totalValue: {
    fontWeight: 'bold',
    fontSize:18
  },
  savedLabel: {
    color: 'green',
    fontWeight:"bold"
  },
  savedValue: {
    color: 'green',
    fontWeight:"bold"
  },
  bottomBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    shadowColor: 'black',
    shadowOffset: { width: 10, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 24,

  },
  bottomBarLeft: {
    flexDirection: 'column',
  },
  bottomBarText: {
    fontSize: 12,
    color: 'green',
    fontWeight:"bold"
  },
  bottomBarTextt: {
    fontSize: 18,
    color: 'black',
    fontWeight:"bold"
  },
  makePaymentButton: {
    backgroundColor: '#496152',
    padding: 10,
    borderRadius: 20,
  },
  makePaymentButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export { OrderReviewPage, BottomBar };