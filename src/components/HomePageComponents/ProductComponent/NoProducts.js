// NoProductsFound.js
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const NoProductsFound = ({ searchText }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://your-placeholder-image-url.com' }} // Replace with your placeholder image URL
        style={styles.image}
      />
      <Text style={styles.title}>Sorry! No products found</Text>
      <Text style={styles.subtitle}>We could not find any products related to your search "{searchText}"</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});

export default NoProductsFound;
