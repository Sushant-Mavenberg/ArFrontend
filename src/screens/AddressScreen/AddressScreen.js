import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, Alert,ToastAndroid } from 'react-native';
import GradientHeader from '../../components/HomePageComponents/Header';
import RNPickerSelect from 'react-native-picker-select';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const AddressScreen = ({ navigation,route }) => {
  const { selectedAddress } = route.params;
  
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [selectedState, setSelectedState] = useState(null);
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSaveAs, setSelectedSaveAs] = useState('Home');
  const [otherText, setOtherText] = useState('');
  const statesInIndia = [ 
    { label: 'Andhra Pradesh', value: 'Andhra Pradesh' },
    { label: 'Arunachal Pradesh', value: 'Arunachal Pradesh' },
    { label: 'Assam', value: 'Assam' },
    { label: 'Bihar', value: 'Bihar' },
    { label: 'Chhattisgarh', value: 'Chhattisgarh' },
    { label: 'Goa', value: 'Goa' },
    { label: 'Gujarat', value: 'Gujarat' },
    { label: 'Haryana', value: 'Haryana' },
    { label: 'Himachal Pradesh', value: 'Himachal Pradesh' },
    { label: 'Jharkhand', value: 'Jharkhand' },
    { label: 'Karnataka', value: 'Karnataka' },
    { label: 'Kerala', value: 'Kerala' },
    { label: 'Madhya Pradesh', value: 'Madhya Pradesh' },
    { label: 'Maharashtra', value: 'Maharashtra' },
    { label: 'Manipur', value: 'Manipur' },
    { label: 'Meghalaya', value: 'Meghalaya' },
    { label: 'Mizoram', value: 'Mizoram' },
    { label: 'Nagaland', value: 'Nagaland' },
    { label: 'Odisha', value: 'Odisha' },
    { label: 'Punjab', value: 'Punjab' },
    { label: 'Rajasthan', value: 'Rajasthan' },
    { label: 'Sikkim', value: 'Sikkim' },
    { label: 'Tamil Nadu', value: 'Tamil Nadu' },
    { label: 'Telangana', value: 'Telangana' },
    { label: 'Tripura', value: 'Tripura' },
    { label: 'Uttar Pradesh', value: 'Uttar Pradesh' },
    { label: 'Uttarakhand', value: 'Uttarakhand' },
    { label: 'West Bengal', value: 'West Bengal' },
    { label: 'Andaman and Nicobar Islands', value: 'Andaman and Nicobar Islands' },
    { label: 'Chandigarh', value: 'Chandigarh' },
    { label: 'Dadra and Nagar Haveli and Daman and Diu', value: 'Dadra and Nagar Haveli and Daman and Diu' },
    { label: 'Lakshadweep', value: 'Lakshadweep' },
    { label: 'Delhi', value: 'Delhi' },
    { label: 'Puducherry', value: 'Puducherry' },
  ];

  const deliverablePincodes = ['560001', '560002', '560003'];

  useEffect(() => { 
    // Set initial values when the component mounts
    if (selectedAddress) {
      setName(selectedAddress.name || '');
      setMobileNo(selectedAddress.phoneNumber || '');
      setHouseNo(selectedAddress.houseNo || '');
      setStreet(selectedAddress.street || '');
      setLandmark(selectedAddress.landmark || '');
      setPostalCode(selectedAddress.postalCode || '');
      setSelectedState(selectedAddress.state || null);
      setIsDefaultAddress(selectedAddress.default || false);

      // Assuming that the 'type' field from selectedAddress corresponds to selectedSaveAs
      setSelectedSaveAs(selectedAddress.type || 'Home');
      // If 'type' is 'Other', set the otherText field
      if (selectedAddress.type === 'Other') {
        setOtherText(selectedAddress.type || '');
      }
    }
  }, [selectedAddress]);
  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };
  const handleAddAddress = async () => {
    console.log("addAddress calling");
    // Validate required fields
    if (!name || !mobileNo || !houseNo || !street || !postalCode || !selectedState) {
      showToast('Please fill in all required fields');
      return;
    }
    const mobileRegex = /^\+91[0-9]{10}$/;
    if (!mobileRegex.test(mobileNo)) {
      // Add +91 prefix to the mobile number
      const formattedMobileNo = `+91${mobileNo}`;
      setMobileNo(formattedMobileNo); // Update state with the formatted mobile number
    }
  
  
    // Validate PIN code format
    const pincodeRegex = /^[0-9]{6}$/;
    if (!pincodeRegex.test(postalCode)) {
      showToast('Invalid PIN code format. Please enter a 6-digit numeric PIN code.');
      return;
    }

    if (!deliverablePincodes.includes(postalCode)) {
      showToast('Sorry, we do not deliver to this Pincode.');
      return;
    }
  
    try {
      // Retrieve the user's authentication token from AsyncStorage
      const userAuthToken = await AsyncStorage.getItem('token');
      let addressType = selectedSaveAs;
  
      // If the address type is 'Other', use the value of otherText
      if (selectedSaveAs === 'Other') {
        addressType = otherText;
      }
  
      let apiUrl = 'http://192.168.10.110:8000/api/users/add-address';
  
      // Determine whether it's an "Add" or "Edit" call based on the presence of selectedAddress
      if (selectedAddress) {
        console.log(selectedAddress._id,"ghgqahgd");
        apiUrl = `http://192.168.10.110:8000/api/users/addresses/${selectedAddress._id}/update`;
      }
     console.log(apiUrl)
      const response = await axios.post(apiUrl, {
        name,
        phoneNumber: mobileNo,
        houseNo,
        street,
        landmark,
        postalCode,
        state: selectedState,
        default: isDefaultAddress,
        type: addressType,
      }, {
        headers: {
          Authorization: `Bearer ${userAuthToken}`,
          // Add other headers if needed
        },
      });
  
  console.log(response,"response")
      if (response.data.success) {
        showToast(response.data.message);
        navigation.goBack();
      } else { 
        showToast('Failed to add/edit address. Please try again.');
      } 

    } catch (error) { 
      showToast('Error occurred while adding/editing address. Please try again.');
      console.error('API Error:', error.message);
    }
  };
  const handleSaveAsSelection = (saveAs) => {
    setSelectedSaveAs(saveAs);
  };
  return (                     
    <>
      <GradientHeader navigation={navigation} text="Address Form" />
      <ScrollView style={{ marginTop: 10 }}>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black' }}>
            Add a new Address
          </Text>

          <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black', marginTop: 10 }}>
            Country
          </Text>

          <TextInput
            placeholder="India"
            placeholderTextColor="black"
            style={{
              padding: 10,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
              color: 'black',
              fontSize: 12,
            }}
            editable={false} // Make it not clickable
          />
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>
              Full name (First and last name)<Text style={{ color: 'red' }}>*</Text>
            </Text>

            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholderTextColor="black"
              style={{
                padding: 10,
                borderColor: '#D0D0D0',
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
                color: 'black',
                fontSize: 12,
              }}
              placeholder="Enter your name"
            />
          </View>

          <View>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>
              Mobile number<Text style={{ color: 'red' }}>*</Text>
            </Text>

            <TextInput
              value={mobileNo}
              onChangeText={(text) => setMobileNo(text)}
              
              placeholderTextColor="black"
              style={{
                padding: 10,
                borderColor: '#D0D0D0',
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
                color: 'black',
                fontSize: 12,
              }} 
              placeholder="10-digit mobile number with prefix(+91)"
            />
          </View>
        
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>
              Flat,House No,Building,Company<Text style={{ color: 'red' }}>*</Text>
            </Text>
            <TextInput
              value={houseNo}
              onChangeText={(text) => setHouseNo(text)}
              placeholderTextColor="black"
              style={{
                padding: 10,
                borderColor: '#D0D0D0',
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
                color: 'black',
                fontSize: 12,
              }}
              placeholder=""
            />
          </View>
          <View>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>
              Area,Street,Sector,Village<Text style={{ color: 'red' }}>*</Text>
            </Text>
            <TextInput
              value={street}
              onChangeText={(text) => setStreet(text)}
              placeholderTextColor="black"
              style={{
                padding: 10,
                borderColor: '#D0D0D0',
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
                color: 'black',
                fontSize: 12,
              }}
              placeholder=""
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>
              Landmark
            </Text>
            <TextInput
              value={landmark}
              onChangeText={(text) => setLandmark(text)}
              placeholderTextColor="black"
              style={{
                padding: 10,
                borderColor: '#D0D0D0',
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
                color: 'black',
                fontSize: 12,
              }}
              placeholder="Eg near aerodrome"
            />
          </View>

          <View>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>
              Pincode<Text style={{ color: 'red' }}>*</Text>
            </Text>

            <TextInput
              value={postalCode}
              keyboardType="numeric"
              onChangeText={(text) => setPostalCode(text)}
              placeholderTextColor="black"
              style={{
                padding: 10,
                borderColor: '#D0D0D0',
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
                color: 'black',
                fontSize: 12,
              }}
              placeholder="6 digits [0-9] PIN code"
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black',marginBottom:10 }}>
              State<Text style={{ color: 'red' }}>*</Text>
            </Text>
            <View 
              style={{ 
                borderColor: '#D0D0D0',
                borderWidth: 1,
                borderRadius: 5,
                overflow: 'hidden', // To hide the overflow border
              }} 
            > 
              <RNPickerSelect
                placeholder={{
                  label: 'Select a state',
                  value: null,
                }}
                items={statesInIndia}
                onValueChange={(value) => setSelectedState(value)}
                value={selectedState}
                style={{
                  inputAndroid: {
                    padding: 10,
                    color: 'black',
                  },
                  inputIOS: {
                    padding: 10,
                    color: 'black',
                  },
                }}
              />
            </View>
          </View>
          <View>
            <Text style={{color:"black",fontSize:14,marginBottom:10,fontWeight:"bold"}}>Save as<Text style={{ color: 'red' }}>*</Text></Text>
            <View style={{flexDirection:"row",gap:30,alignItems:"center",marginBottom:10}}>
              <Text  style={[styles.SaveText, selectedSaveAs === 'Home' && styles.SaveTextSelected]}   onPress={() => handleSaveAsSelection("Home")}>Home</Text>
              <Text   style={[styles.SaveText, selectedSaveAs === 'Work' && styles.SaveTextSelected]}   onPress={() => handleSaveAsSelection("Work")}>Work</Text>
              <Text style={[styles.SaveText, selectedSaveAs === 'Other' && styles.SaveTextSelected]}   onPress={() => handleSaveAsSelection("Other")}>Other</Text>
            </View>
          </View>
          {selectedSaveAs === 'Other' && ( 
            <>
            <Text style={{color:"black",fontSize:14,fontWeight:"bold"}}>Add new Address Type</Text>
            <TextInput
          value={otherText}
          onChangeText={(text) => setOtherText(text)}
          placeholder="Eg:Club House,vamsi's Home*"
          placeholderTextColor="black"
          style={{ 
            padding: 4, 
            borderColor: 'black', 
            borderBottomWidth: 1,   // Set only the bottom border
            marginTop: 10, 
            borderRadius: 5, 
            color: 'black', 
            fontSize: 12
          }} 
        />
            </>
      )}
          <CheckBox 
            title="Make this my default address"
            checked={isDefaultAddress}
            onPress={() => setIsDefaultAddress(!isDefaultAddress)}
          />
          <Pressable
            onPress={handleAddAddress}
            style={{
              backgroundColor: '#496152',
              padding: 19,
              borderRadius: 6,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20
            }}
          >                 
              {isLoading ? (
              <ActivityIndicator color="white" />
            ) : ( 
              <Text style={{ fontWeight: 'bold', color: 'white' }}>
      {selectedAddress ? 'Edit Address' : 'Add Address'}
    </Text> 
            )}
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  SaveText:{
    color:"black",
    fontWeight:"600",
    borderColor:"grey",
    borderWidth:1,
    borderRadius:16,
    padding:7
  },
  SaveTextSelected: {
    backgroundColor: '#496152', // Style for the selected option
    color: 'white'
  },
});