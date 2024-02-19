import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Modal, KeyboardAvoidingView, ScrollView, ToastAndroid } from 'react-native';
import GradientHeader from './HomePageComponents/Header';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-modern-datepicker';
import moment from 'moment';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const showToast = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

const EditProfile = ({ route, navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = async () => {
    try {
      // Convert all values to strings
      const payload = {
        firstName: String(firstName),
        lastName: String(lastName),
        mobileNumber: `+91${String(mobileNumber)}`,
        email: String(email),
        gender: String(gender).toLowerCase(),
        dateOfBirth: moment(selectedDate, 'DD-MM-YYYY').format('YYYY-MM-DD')
      };

      //  endpoint of your API
      const apiUrl = 'http://192.168.10.110:8000/api/users/update-profile';

      // Retrieve the user's authentication token from AsyncStorage
      const userAuthToken = await AsyncStorage.getItem('token');

      // Make the PUT request using axios with the Bearer token in the headers
      const response = await axios.put(apiUrl, payload, {
        headers: {
          Authorization: `Bearer ${userAuthToken}`,
          // Add other headers if needed
        },
      });

      // Handle the response as needed
      if (response.data.success) {
        showToast(response.data.message);
        navigation.goBack();
      } else {
        showToast('Failed to add/edit address. Please try again.');
      }
    } catch (error) {
      // Handle errors
      console.error('Error while saving profile:', error.message);
    }
  };

  const handleDatePress = () => {
    setSelectedDate(''); // Clear the selected date
    setShowDatePicker(true);
  };

  const handleDateChange = (date) => {
    const formattedDate = moment(date, 'YYYY/MM/DD HH:mm').format('DD-MM-YYYY');
    setSelectedDate(formattedDate);
    setShowDatePicker(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <GradientHeader text="Edit Profile" navigation={navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              placeholder="--"
            />

            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              placeholder="--"
            />

            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={mobileNumber}
              onChangeText={(text) => setMobileNumber(text)}
              maxLength={10}
            />

            <Text style={styles.label}>Email ID</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderContainer}>
              <Picker
                selectedValue={gender}
                style={styles.genderPicker}
                onValueChange={(itemValue) => setGender(itemValue)}
              >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
              </Picker>
            </View>

            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity onPress={handleDatePress}>
              <TextInput
                style={styles.input}
                value={selectedDate ? selectedDate : 'Select Date'}
                editable={false}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        transparent={true}
        animationType="slide"
        visible={showDatePicker}
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.datePickerModal}>
          <View style={styles.datePickerContainer}>
            <DatePicker
              options={{
                backgroundColor: '#496152',
                textHeaderColor: '#FFFFFF',
                textDefaultColor: '#FFFFFF',
                selectedTextColor: '#E3B448',
                mainColor: '#FFFFFF',
                textSecondaryColor: '#FFFFFF',
                borderColor: 'rgba(122, 146, 165, 0.1)',
                dateFormat: 'DD-MM-YYYY',
                isTimePickerVisible: false,
              }}
              mode="datepicker"
              onSelectedChange={handleDateChange}
              selected={selectedDate}
            />
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  datePickerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignSelf: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
    color: 'black',
  },
  input: {
    height: 40,
    borderBottomWidth: 2,
    borderColor: 'gray',
    marginBottom: 15,
    paddingHorizontal: 10,
    color: 'black',
  },
  saveButton: {
    backgroundColor: '#496152',
    padding: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  genderContainer: {
    borderBottomWidth: 2,
    borderColor: 'grey',
    marginBottom: 25,
    overflow: 'hidden',
    paddingHorizontal: 10,
  },
  genderPicker: {
    height: 45,
    color: 'black',
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
});

export default EditProfile;
