import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar,Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import GradientHeader from '../../components/HomePageComponents/Header';

const OrderStatusItem = ({ iconName, label, completed, iconColor, date }) => (
  <View style={styles.statusItem}>
    <View style={[styles.iconContainer, completed && styles.completedIconContainer]}>
      <MaterialCommunityIcons
        name={iconName}
        style={[styles.icon, completed && styles.completedIcon, { color: iconColor }]}
      />
    </View>
    <View>
      <Text style={[styles.label, completed && styles.completedLabel]}>{label}</Text>
      {date && <Text style={styles.dateText}>Date: {date}</Text>}
    </View>
    {completed && <MaterialCommunityIcons name="check-bold" style={styles.checkIcon} />}
  </View>
);

const OrderStatusTimeline = ({ trackOrder, currentStep }) => {
  const steps = trackOrder.map((status, index) => {
    let iconName;
    let iconColor;

    switch (status.status) {
      case 'Order Picked':
        iconName = 'package-variant-closed';
        break;
      case 'Processing':
        iconName = 'clock-time-four-outline';
        break;
      case 'Shipped':
        iconName = 'truck';
        break;
      case 'Out for Delivery':
        iconName = 'truck-fast';
        break;
      case 'Delivered':
        iconName = 'check-circle';
        break;
      case 'Order Canceled':
        iconName = 'cancel';
        iconColor = 'red'; // or any other color for canceled status
        break;
      default:
        iconName = 'circle-outline';
    }

    // If status is 'Canceled', set iconColor to red (or your preferred color)
    iconColor = status.status === 'Order Canceled' ? 'red' : (index < currentStep ? 'green' : index === currentStep ? 'orange' : 'black');

    return { iconName, iconColor, label: status.status, date: status.date };
  });

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.timeline}>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {index > 0 && <MultipleBreakLines />}
            <OrderStatusItem
              iconName={step.iconName}
              label={step.label}
              completed={index < currentStep}
              iconColor={step.iconColor}
              date={step.date}
            />
          </React.Fragment>
        ))}
      </View>
    </ScrollView>
  );
};

const MultipleBreakLines = () => (
  <View style={styles.multipleBreakLinesContainer}>
    <View style={styles.breakLine} />
    <View style={styles.breakLine} />
    <View style={styles.breakLine} />
    <View style={styles.breakLine} />
  </View>
);

const OrderDetailScreen = ({ route,navigation}) => {
  const order = route.params.currentOrders; // Assuming you want to use the first order data
  console.log(order)
  
  const renderOrderItems = () => {
    return order.items.map((item, index) => (
      <View key={index} style={styles.orderItemContainer}>
        <Image source={{ uri: item.food.img_url }} style={styles.orderItemImage} />
        <View style={styles.orderItemTextContainer}>
          <Text style={styles.orderItemName}>{item.food.name}</Text>
          <Text style={styles.orderItemQuantity}>Quantity: {item.quantity}</Text>
        </View>
      </View>
    ));
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar backgroundColor={'transparent'} translucent />

      <ScrollView style={styles.container}>
      <GradientHeader text="Order Details" navigation={navigation}/>
       <View style={{paddingHorizontal:16,paddingTop:10}}>
       <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Status</Text>
          {order.order_status === 'Order Delivered' && (
            <Text style={styles.statusText}>Delivered on {order.deliveredDate}</Text>
          )}
          {order.order_status === 'Order Canceled' && (
            <Text style={styles.statusText}>Cancelled</Text>
          )}
          {order.order_status === 'Order Confirmed' && (
            <Text style={styles.statusText}>Expected Delivery: {order.deliveredDate}</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Track Order</Text>
          <OrderStatusTimeline trackOrder={order.trackOrder} currentStep={order.currentStep} />
        </View>

     
        <View style={styles.section}>
  <Text style={styles.sectionTitle}>Order Summary</Text>
  <View style={styles.orderDetailItem}>
    <Text style={styles.detailLabel}>Customer Name:</Text>
    <Text style={styles.detailValue}>{order.customerName}</Text>
  </View>
  <View style={styles.separator} />
  <View style={styles.orderDetailItem}>
    <Text style={styles.detailLabel}>Order Number:</Text>
    <Text style={styles.detailValue}>{order.orderNumber}</Text>
  </View>
  <View style={styles.separator} />
  <View style={styles.orderDetailItem}>
    <Text style={styles.detailLabel}>Shipment Number:</Text>
    <Text style={styles.detailValue}>{order.shipmentNumber}</Text>
  </View>
  <View style={styles.separator} />
  <View style={styles.orderDetailItem}>
    <Text style={styles.detailLabel}>Order Date:</Text>
    <Text style={styles.detailValue}>{order.orderDate}</Text>
  </View>
  <View style={styles.separator} />
  <View style={styles.orderDetailItem}>
    <Text style={styles.detailLabel}>Invoice Amount</Text>
    <Text style={styles.detailValue}>{order.order_amount}</Text>
  </View>
  <View style={styles.separator} />
  <View style={styles.orderDetailItem}>
    <Text style={styles.detailLabel}>Payment Mode</Text>
    <Text style={styles.detailValue}>COD</Text>
  </View>
  {/* ... (repeat similar structure for other details) */}
</View>




        <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Items</Text>
          {renderOrderItems()}
        </View>
        <View style={styles.section}>
  <Text style={styles.sectionTitle}>Address Details</Text>
  <View style={styles.orderDetailItemm}>
    <Text style={styles.detailLabel}>Delivery Address:</Text>
    <Text style={styles.detailValue}>{order.deliveryAddress}</Text>
  </View>
</View>
       </View>
     

      
      
      </ScrollView>
      <TouchableOpacity
          style={styles.reorderButton}
          onPress={() => {
            // Handle reorder action
            console.log('Reorder button pressed');
          }}>
          <Text style={styles.reorderButtonText}>Reorder</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingTop: 45,
    paddingBottom: 10,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIcon: {
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
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    
  },
  section: {
    marginBottom: 25,
  
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  statusText: {
    fontSize: 14,
    color: 'black',
    marginBottom:10
  },
  dateText: {
    fontSize: 12,
    color: 'grey',
  },
  timeline: {
    maxHeight: 410,
   
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    gap: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'lightgrey',
    borderWidth: 2,
    borderColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 25,
    color: 'black',
  },
  completedIcon: {
    color: 'green',
  },
  label: {
    marginTop: 2,
    fontSize: 12,
    color: 'black',
  },
  completedLabel: {
    color: 'green',
  },
  checkIcon: {
    fontSize: 19,
    color: 'green',
  },
  breakLine: {
    width: 2,
    height: 6,
    backgroundColor: 'green',
  },
  multipleBreakLinesContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    gap: 5,
    marginRight: 150,
  },
  orderItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  orderItemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  orderItemTextContainer: {
    flex: 1,
  },
  orderItemName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  orderItemQuantity: {
    fontSize: 12,
    color: 'grey',
  },
//   section:{
//     paddingHorizontal:16,
//   },
  orderDetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderDetailItemm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 68,

  },
  
  detailLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  
  detailValue: {
    flex: 1,
    fontSize: 14,
    color: 'grey',
  },
  
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16, // Adjust the margin as needed
  },
  reorderButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#496152',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  reorderButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  
});

export default OrderDetailScreen;
