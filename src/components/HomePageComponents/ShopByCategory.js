import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const ShopByCategory = () => {
  const navigation = useNavigation();


  const { tableTops, wallHangings, aromaCandles, metalPlanters, floorStanding } = useSelector(
    (state) => state.products
  );

  const categories = [
    { name: 'Table Tops', image: 'https://res.cloudinary.com/dlzcgycpi/image/upload/v1699253617/pld489-gr__10469.1639500378_mqjznb.jpg' },
    { name: 'Aroma Candles', image: 'https://res.cloudinary.com/dlzcgycpi/image/upload/v1700920787/aromatherapy-candle_dtcbz8.jpg' },
    { name: 'Wall Hangings', image: 'https://res.cloudinary.com/dlzcgycpi/image/upload/v1699253617/the-sill_hardy-houseplants-duo_hyde_mint_hzcevd.jpg' },
    { name: 'Metal Planters', image: 'https://res.cloudinary.com/dlzcgycpi/image/upload/v1699257920/DIY-Macrame-Plant-Hanger-Wall-Hanging-24.2_rpowkq.jpg' },
    { name: 'Floor Standings', image: 'https://res.cloudinary.com/dlzcgycpi/image/upload/v1699253617/pld489-gr__10469.1639500378_mqjznb.jpg' },
  ];

  const handleCategoryPress = async (category) => {
    try {
      // Fetch products for the selected category
      let selectedCategoryData = [];
      switch (category.name) {
        case 'Table Tops':
          selectedCategoryData = tableTops;
          break;
        case 'Wall Hangings':
          selectedCategoryData = wallHangings;
          break;
        case 'Aroma Candles':
          selectedCategoryData = aromaCandles;
          break;
        case 'Metal Planters':
          selectedCategoryData = metalPlanters;
          break;
        case 'Floor Standings':
          selectedCategoryData = floorStanding;
          break;
        default:
          break;
      }

      // Navigate to the "View More" page with the selected category data
      navigation.navigate('ViewMorePage', { category: category.name, data: selectedCategoryData });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const renderItem = ({ item }) => (
    <Pressable style={styles.categoryContainer} onPress={() => handleCategoryPress(item)}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.categoryImage} />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shop By Category</Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      />
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 10,
  },
  heading: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom:10
  },
  scrollView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryContainer: {
    alignItems: 'center',
    justifyContent:"space-between",
    marginVertical: 8, // Adjust the vertical margin as needed
    marginRight:15,
   
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 40,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryName: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 10,
    color: '#333',
    fontWeight: '600',
    letterSpacing: 1,
  },
});

export default ShopByCategory;
