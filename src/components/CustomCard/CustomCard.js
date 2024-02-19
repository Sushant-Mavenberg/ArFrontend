// ProductCard.js

import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductCard = ({ item }) => {
  const handleAddToCart = () => {
    // Add your logic for adding to cart here
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.favoriteIcon}>
          <MaterialCommunityIcons name="heart" style={styles.favoriteIconInner} />
        </View>
        <Pressable onPress={handleAddToCart} style={styles.cartIcon}>
          <MaterialCommunityIcons name="cart" style={styles.cartIconInner} />
        </Pressable>
      </View>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCost}>&#8377;{item.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 15,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  favoriteIconInner: {
    fontSize: 24,
    color: '#fff',
  },
  cartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 50,
    zIndex: 1,
  },
  cartIconInner: {
    fontSize: 24,
    color: '#fff',
  },
  itemDetails: {
    padding: 15,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color:"black"
  },
  itemCost: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductCard;
