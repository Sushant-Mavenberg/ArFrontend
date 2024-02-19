import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Linking } from 'react-native';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import PopupDialog from 'react-native-popup-dialog';

const LocationComponent = ({ address }) => {
  const [location, setLocation] = useState(null);
  const [formattedAddress, setFormattedAddress] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  
  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  
  const openAppSettings = () => {
    Linking.openSettings();
    togglePopup();
  };

  const addresses = [
    { id: 1, name: 'vamsi', street: 'vizag',houseNo:"44-124",state:"AndhraPradesh" ,pincode:"531021"},
    { id: 2, name: 'Santosh', street: 'Hospete',houseNo:"49-124",state:"Karnataka" ,pincode:"531023" },
    { id: 2, name: 'Sushant', street: 'Pune',houseNo:"49-124",state:"Maharastra" ,pincode:"531061" },
    // Add more addresses as needed
  ];
  
  const selectedAddress = addresses[0];

  const getCurrentLocation = async () => {
    setModalVisible(!isModalVisible);
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);

        try {
          const response = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=7d0a6c18ba9d4e58b90c34117f5cbb99`
          );

          const results = response.data.features;
          console.log(results);

          if (results && results.length > 0) {
            const formattedAddress = results[0].formatted;
            setFormattedAddress(formattedAddress);
          }
        } catch (error) {
          console.error('Error converting coordinates to address:', error);

          // Check if the error code is 1 (permission denied)
          if (error.code === 1) {
            // Open the popup only if there is a permission error
         
            togglePopup();
          }
        }
      },
      (error) => {
      

        // Check if the error code is 1 (permission denied)
        if (error.code === 1) {
          // Open the popup only if there is a permission error
          togglePopup();
        }
      },
      { enableHighAccuracy: true, timeout: 150000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    if (formattedAddress) {
      console.log('Formatted Address:', formattedAddress);
    }
  }, [formattedAddress]);

  useEffect(() => {
    if (formattedAddress) {
      console.log('Formatted Address:', formattedAddress);
    }
  }, [formattedAddress]);

  return (
    <View>
      <Pressable  onPress={toggleModal} style={styles.addressButton}>
        <MaterialCommunityIcons name="map-marker-outline" size={24} color="grey" />
        <Text style={{ color: 'grey' }}>{`Deliver to ${selectedAddress?.name} - ${selectedAddress?.street}`}</Text>
        <MaterialCommunityIcons name="chevron-down" size={24} color="grey" />
      </Pressable>

      <PopupDialog
        visible={isPopupVisible}
        onTouchOutside={togglePopup}
        dialogStyle={styles.popupDialog}
      >
        <View>
          <Text style={styles.popupTitle}>Turn on Location Permission</Text>
          <Text style={styles.popupText}>
            Please go to Settings - Location to turn on location permission
          </Text>
          <View style={styles.popupButtons}>
            <Pressable onPress={togglePopup} style={[styles.popupButton, styles.cancelButton]}>
              <Text>Cancel</Text>
            </Pressable>
            <Pressable onPress={openAppSettings} style={[styles.popupButton, styles.settingsButton]}>
              <Text>Settings</Text>
            </Pressable>
          </View>
        </View>
      </PopupDialog>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={styles.modal} backdropOpacity={0}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Choose your Location</Text>
          <Text style={styles.modalText}>
            Select a delivery location to see product availability and delivery options
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {addresses?.map((item, index) => (
              <Pressable
                onPress={() => {}}
                style={[styles.addressItem, { backgroundColor: selectedAddress === item ? "#FBCEB1" : "white" }]}
                key={index}
              >
                <View style={styles.row}>
                  <Text style={styles.addressName}>{item?.name}</Text>
                  <MaterialCommunityIcons name="map-marker-outline" size={24} color="red" />
                </View>

                <Text style={styles.addressText}>{item?.houseNo}, {item?.landmark}</Text>
                <Text style={styles.addressText}>{item?.street}</Text>
                <Text style={styles.addressText}>{item?.state} {item?.pincode}</Text>
              </Pressable>
            ))}

            <Pressable
              onPress={() => {
                setModalVisible(false);
                // Navigation logic for adding a new address
              }}
              style={styles.addAddressButton}
            >
              <Text style={styles.addAddressText}>Add an Address or pick-up point</Text>
            </Pressable>
          </ScrollView>

          <View style={styles.locationOptions}>
            <View style={styles.locationOption}>
              <MaterialCommunityIcons name="map-marker-outline" size={22} color="#0066b2" />
              <Text style={styles.locationOptionText}>Enter an Indian pincode</Text>
            </View>

            <View style={styles.locationOption}>
              <MaterialCommunityIcons name="map-marker-outline" size={22} color="#0066b2" />
              <Pressable
                onPress={getCurrentLocation} // Call the function to get the current location
              >
                <Text style={styles.addAddressText}>Use My Current Location</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  addressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: 10,
   color:"black"
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
  },
  detectLocationButton: {
    width: 200,
    padding: 10,
  },
  detectLocationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  locationOptions: {
    flexDirection: 'column',
    justifyContent: 'space-between',
   
  },
  locationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding:10
  },
  locationOptionText: {
    color: '#0066b2',
    fontWeight: '400',
  },
  addressItem: {
    width: 140,
    height: 140,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  addressName: {
    fontSize: 13,
    fontWeight: 'bold',
    color:"black"
  },
  addressText: {
    width: 130,
    fontSize: 13,
    textAlign: 'center',
    color:"black"
  },
  addAddressButton: {
    width: 140,
    height: 140,
    borderColor: '#D0D0D0',
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addAddressText: {
    textAlign: 'center',
    color: '#0066b2',
    fontWeight: '500',
  },
  permissionPopup: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    justifyContent: 'center',
  alignItems: 'center',
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  popupText: {
    fontSize: 16,
    marginBottom: 20,
  },
  popupButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    color: 'red',
    fontSize: 16,
  },
  settingsButton: {
    color: 'white',
    fontSize: 16,
  },
  popupDialog: {
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 20,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  popupText: {
    fontSize: 16,
    marginBottom: 20,
  },
  popupButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popupButton: {
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: 'lightgreen',
  },
  settingsButton: {
    backgroundColor: 'darkgreen',
    color:"white"
  },
});

export default LocationComponent