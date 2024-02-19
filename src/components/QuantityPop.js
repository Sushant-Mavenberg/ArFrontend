import React from 'react';
import { Text, View, StyleSheet, Image, Linking, TouchableOpacity, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const QuantityPopup = ({ isVisible, onBackdropPress, selectedItemImage, modalQuantity }) => {
  const phoneNumber = '+918618122018'; // Replace with your phone number
  const emailAddress = 'orders@arphibo.com'; // Replace with your email address

  const handleCallPress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${emailAddress}`);
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      style={styles.modal}
      backdropOpacity={0} // Make the backdrop completely transparent
      backdropColor="transparent" // Set the backdrop color to transparent
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View style={styles.modalContainer}>
        <View style={styles.headerContainer}>
          {/* Add Arphibo logo here */}
          <Image source={{ uri: 'https://www.arphibo.com/assets/img/logo.png' }} style={styles.logoImage} />
          <Pressable style={styles.closeButton} onPress={onBackdropPress}>
            <MaterialCommunityIcons name="close" size={25} color="#555" />
          </Pressable>
        </View>
        <Image source={{ uri: selectedItemImage }} style={styles.modalImage} />
        <Text style={styles.modalText}>Quantity: {modalQuantity}</Text>
        <Text style={styles.infoText}>For bulk purchases of this product, contact Arphibo:</Text>
        <View style={styles.contactContainer}>
          <Pressable style={styles.contactButton} onPress={handleCallPress}>
            <Text style={styles.buttonText}>Call us</Text>
          </Pressable>
          <Pressable style={styles.contactButton} onPress={handleEmailPress}>
            <Text style={styles.buttonText}>Email us</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modal: {
      margin: 0,
      justifyContent: 'flex-end',
    },
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      alignItems: 'center',
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: 10, // Add margin to create space between header and content
    },
    closeButton: {
      padding: 10,
      marginLeft: 'auto', // Push the button to the right
    },
    logoImage: {
      width: 100,
      height: 50, // Adjust the height as needed
      resizeMode: 'contain',
    },
    modalImage: {
      width: 200,
      height: 200,
      borderRadius: 10,
    },
    modalText: {
      fontSize: 14,
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 5,
    },
    infoText: {
      fontSize: 14,
      textAlign: 'center',
      color: 'black',
      marginBottom: 15,
    },
    contactContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
    contactButton: {
      padding: 10,
      backgroundColor: '#496152',
      borderRadius: 15,
      alignItems: 'center',
      width: '45%',
    },
    buttonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
    },
  });
  

export default QuantityPopup;
