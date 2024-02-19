import React, { useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
const CartNotification = ({ visible, onClose, onViewCart, itemCount, totalAmount }) => {
  console.log(totalAmount)
    useEffect(() => {
      if (visible) {
        const timeoutId = setTimeout(() => {
          onClose();
        }, 5000);
  
        return () => clearTimeout(timeoutId);
      }
    }, [visible, onClose]);
    const handleViewCart = () => {
        onClose();
        onViewCart();
      };
    
    return (
      <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      backdropOpacity={0}
    >
      <Pressable
        style={styles.modalContainer}
        onPress={onClose} 
      >
        <View style={styles.notificationContainer}>
          <View style={styles.notificationTextContainer}>
            <Text style={styles.notificationText}>{itemCount} Items Added | &#8377; {totalAmount}</Text>
          </View>
          <Pressable onPress={handleViewCart} style={styles.viewCartButton}>

            <Text style={styles.viewCartButtonText}>View Cart</Text>
            <FeatherIcon name="chevron-right" style={styles.chevronIcon}/>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
    );
  };
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.)',
  },
  notificationContainer: {
    backgroundColor: '#496152',
    padding: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 70,
    left: 20,
    right: 20,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
  },
  viewCartButton: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:"center"
  },
  chevronIcon: {
    fontSize: 16,
    color: 'white',
    marginRight: 5,
  },
  viewCartButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CartNotification;
