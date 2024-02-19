import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NoInternetStatus = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    // Navigate to the previous screen
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#333" />
          <Text style={{ fontSize: 15, marginLeft: 10, color: '#333' }}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* No Internet Image */}
      <Image
        source={require('../assets/NoInternet.png')} // Replace with your image path
        style={{ width: 200, height: 200, resizeMode: 'contain', marginBottom: 20 }}
      />

      {/* Content */}
      <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 10, color: '#333' }}>
        You are offline
      </Text>
      <Text style={{ fontSize: 16, textAlign: 'center', color: '#333' }}>
        Please check your internet connection
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white', 
    // You can change the background color as needed
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
});

export default NoInternetStatus;
