import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import GradientHeader from '../../components/HomePageComponents/Header';
import { useNavigation } from '@react-navigation/native';

const ChangePassword = ({navigation}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    // Implement your logic to change the password
    console.log('Changing password...');
  };

  return (
    <View style={styles.mainContainer}>

      {/* Header */}
      <GradientHeader text="Change Password" navigation={navigation}/>

      {/* Content */}
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Ionic name="lock-closed" style={styles.icon} />
          <TextInput
            placeholder="Current Password"
            secureTextEntry
            style={styles.input}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholderTextColor='black'
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionic name="lock-closed" style={styles.icon} />
          <TextInput
            placeholder="New Password"
            secureTextEntry
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholderTextColor='black'
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionic name="lock-closed" style={styles.icon} />
          <TextInput
            placeholder="Confirm New Password"
            secureTextEntry
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor='black'
          />
        </View>

        <TouchableOpacity style={styles.changeButton} onPress={handleChangePassword}>
          <Text style={styles.changeButtonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  header: {
    flexDirection: 'row',
    paddingTop: 45,
    paddingBottom: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 24,
    color: 'white',
    marginRight: 10,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center', // Align the title in the center
  },
  headerTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F2F2F2',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
    color: '#555',
  },
  input: {
    flex: 1,
    fontSize: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    paddingVertical: 8,
  },
  changeButton: {
    backgroundColor: '#496152', // Change the background color here
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  changeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ChangePassword;