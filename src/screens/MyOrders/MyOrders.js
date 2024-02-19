import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import GradientHeader from '../../components/HomePageComponents/Header';

const MyPlantOrders = ({navigation}) => {
  // Dummy data for current orders
  const currentOrders = [
    {
      // 1st Order
      order_id: 'ABCDE',
      order_amount: 78.9,
      order_status: 'Order Delivered',
      items: [
        {
          food: {
            name: 'Plant D',
            img_url: 'https://res.cloudinary.com/dlzcgycpi/image/upload/v1698998862/GUEST_67e6d0f7-0914-483e-8195-6ad542ebe0a4_simsxk.jpg',
          },
          quantity: 1,
        },
      ],
      deliveredDate: 'Thu, 09 Mar 02:58 PM',
      currentStep: 5,
      trackingId: '145917937900857',
      customerName: 'Vamsi Krishna',
      orderNumber: '16777666110276124A',
      shipmentNumber: '16777666191671587759J',
      orderDate: '2 March 2023',
      deliveryAddress: 'Desapatrunipalem Road, Desa Pathrunipalem, Government High School, Visakhapatnam, Andhra Pradesh, 531021, Visakhapatnam',
      trackOrder: [
        { date: '2023-03-02', status: 'Order Picked' },
        { date: '2023-03-03', status: 'Processing' },
        { date: '2023-03-04', status: 'Shipped' },
        { date: '2023-03-05', status: 'Out for Delivery' },
        { date: '2023-03-06', status: 'Delivered' },
      ], // Closing square bracket for trackOrder array
      userId: '12345', // Add userId property
    },
    {
      // 2nd Order
      order_id: 'FGHIJ',
      order_amount: 45.67,
      order_status: 'Order Confirmed',
      items: [
        {
          food: {
            name: 'Plant E',
            img_url: 'https://res.cloudinary.com/dlzcgycpi/image/upload/v1701072424/61UWr8EQEYL._AC_UF894_1000_QL80__bprr1m.jpg',
          },
          quantity: 1,
        },
      ],
      deliveredDate: "2023-03-06",
      currentStep: 1,
      trackingId: '145917937900858',
      customerName: 'John Doe',
      orderNumber: '16777666110276124B',
      shipmentNumber: '16777666191671587760K',
      orderDate: '3 March 2023',
      deliveryAddress: '123 Main Street, Cityville, State, 12345',
      trackOrder: [
        { date: '2023-03-02', status: 'Order Picked' },
        { date: '2023-03-03', status: 'Processing' },
        { date: '2023-03-04', status: 'Shipped' },
        { date: '2023-03-05', status: 'Out for Delivery' },
        { date: '2023-03-06', status: 'Delivered' },
      ], // Closing square bracket for trackOrder array
      userId: '12345', // Add userId property
    },
    {
      // 3rd Order
      order_id: 'KLMNO',
      order_amount: 67.89,
      order_status: 'Order Canceled',
      items: [
        {
          food: {
            name: 'Plant F',
            img_url: 'https://res.cloudinary.com/dlzcgycpi/image/upload/v1701072251/1000-Silver_nswycy.jpg',
          },
          quantity: 2,
        },
      ],
      deliveredDate: null,
      currentStep: 1,
      trackingId: '145917937900859',
      customerName: 'Jane Smith',
      orderNumber: '16777666110276124C',
      shipmentNumber: '16777666191671587761L',
      orderDate: '4 March 2023',
      deliveryAddress: '456 Oak Avenue, Townsville, State, 56789',
      trackOrder: [
        { date: '2023-03-02', status: 'Order Picked' },
        { date: '2023-03-04', status: 'Order Canceled' },
      ], 
      userId: '12345',
    },
  ];
  

  const currencySymbol = '₹'; // Indian Rupee symbol


  const navigateToOrderDetails = (currentOrders) => {
    navigation.navigate('OrderDetails', { currentOrders });
  };

  return (
    <ScrollView style={styles.scrollView}>
    <GradientHeader text="My orders" navigation={navigation}/>

      {currentOrders.map((order) => (
        <View key={order.order_id} style={styles.orderContainer}>
          <Pressable
            onPress={() => navigateToOrderDetails(order)}
            style={styles.orderDetails}
          >
       
            <View style={styles.imageContainer}>
              <Image source={{ uri: order.items[0].food.img_url }} style={styles.itemImage} />
            </View>

        
            <View style={styles.itemInfo}>
              {/* Order Status Text */}
              {order.order_status === 'Order Confirmed' && (
                <Text style={styles.orderStatusText}>Order Confirmed</Text>
              )}
              {order.order_status === 'Order Canceled' && (
                <Text style={styles.orderStatusCancelledText}>Order Canceled</Text>
              )}
              {order.order_status === 'Order Delivered' && (
                <Text style={styles.orderStatusDeliveredText}>Order Delivered</Text>
              )}

              {/* Plant Name */}
              <Text style={styles.itemName}>{order.items[0].food.name}</Text>

              {/* Order Amount */}
              <Text style={styles.itemCost}>{`Cost: ${currencySymbol}${order.order_amount.toFixed(2)}`}</Text>

              {/* Expected Delivery Date */}
              <View style={styles.deliveryDateContainer}>
                {(order.order_status === 'Order Canceled' || order.order_status === 'Order Confirmed') && (
                  <Text style={styles.itemDelivery}>{`Expected Delivery:`}</Text>
                )}

                <Text style={styles.itemDeliveryDate}>{`${getExpectedDeliveryDate(order.order_status)}`}</Text>
              </View>
            </View>
          </Pressable>

          {/* Chevron Icon */}
          <View style={styles.chevronContainer}>
            <MaterialCommunityIcons
              name="chevron-right"
              style={styles.chevronIcon}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

// Function to get the expected delivery date based on order status
const getExpectedDeliveryDate = (orderStatus) => {
  if (orderStatus === 'Order Confirmed') {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 7); // Assume delivery in 7 days
    return deliveryDate.toDateString();
  } else if (orderStatus === 'Order Delivered') {
    // You can customize the delivered date format or logic here
    return 'Delivered on ' + new Date().toDateString();
  } else {
    return 'N/A'; // You can customize this based on your needs for other statuses
  }
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    flexDirection: 'row',
    paddingTop: 45,
    paddingBottom: 10,
    marginBottom: 10,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 18,
    color: '#555',
    padding: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
  },
  headerText: {
    fontSize: 18,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontWeight: '600',
  },
  orderContainer: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginHorizontal: 16,
  },
  orderStatusText: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    color: 'white',
    backgroundColor: '#91EE91',
    fontWeight: '600',
  },
  orderStatusCancelledText: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    color: 'white',
    backgroundColor: '#D45855',
    fontWeight: '600',
  },
  orderStatusDeliveredText: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    color: 'white',
    backgroundColor: '#87CEEB',
    fontWeight: '600',
  },
  orderDetails: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imageContainer: {
    width: 60,
    height: 80,
    overflow: 'hidden',
    marginRight: 12,
    paddingLeft: 8,
    paddingTop: 8,
    paddingBottom: 8,
    borderTopLeftRadius: 16,
  },
  itemInfo: {
    flex: 1,
    padding: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: 'black',
  },
  itemCost: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  itemDelivery: {
    fontSize: 12,
    color: '#777',
  },
  deliveryDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  itemDeliveryDate: {
    fontSize: 12,
    color: '#777',
    marginLeft: 4,
  },
  chevronContainer: {
    position: 'absolute',
    top: 50,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingRight: 12,
  },
  chevronIcon: {
    fontSize: 20,
    color: '#555',
  },
});

export default MyPlantOrders;
