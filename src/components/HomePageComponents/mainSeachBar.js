// MainSearchComponent.js

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, ToastAndroid, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import SearchResultsComponent from './ProductComponent/SearchResultComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch, useSelector } from 'react-redux';
import NoInternetStatus from '../NoInternet';


const MainSearchComponent = ({ navigation }) => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  const [hasSearchResults, setHasSearchResults] = useState(true);
  const textInputRef = useRef(null);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const categories = [
    { name: 'Table Tops', image: 'https://res.cloudinary.com/dlzcgycpi/image/upload/v1699253617/pld489-gr__10469.1639500378_mqjznb.jpg' },
    { name: 'Aroma Candles', image: 'https://res.cloudinary.com/dlzcgycpi/image/upload/v1700920787/aromatherapy-candle_dtcbz8.jpg' },
    { name: 'Wall Hangings', image: 'https://res.cloudinary.com/dlzcgycpi/image/upload/v1699253617/the-sill_hardy-houseplants-duo_hyde_mint_hzcevd.jpg' },
    { name: 'Metal Planter', image: 'https://res.cloudinary.com/dlzcgycpi/image/upload/v1699257920/DIY-Macrame-Plant-Hanger-Wall-Hanging-24.2_rpowkq.jpg' },
    { name: 'Floor Standings', image: 'https://res.cloudinary.com/dlzcgycpi/image/upload/v1699253617/pld489-gr__10469.1639500378_mqjznb.jpg' },
  ];



  const handleSearch = (isRecentSearch = false) => {
    if (!isRecentSearch && searchText.trim() === '') {
      // Show Android toast message if searchText is empty and not triggered by recent search
    
      return;
    }
  
    // Perform the search logic here
    const filteredResults = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase()) ||
    product.description.toLowerCase().includes(searchText.toLowerCase())
  );

  setSearchResults(filteredResults);

  if (!isRecentSearch && searchText.trim() !== '') {
    const updatedRecentSearches = [
      { term: searchText, timestamp: Date.now() },
      ...recentSearches.filter((item) => item.term !== searchText),
    ];
    setRecentSearches(updatedRecentSearches.slice(0, 5));
  }
};

  
  
const handleCategorySearch = (selectedCategory) => {
 
 const formattedCategory = selectedCategory
 .toLowerCase()
 .replace(/\s+/g, '-')
 .replace(/s$/, '');
 setSearchText(formattedCategory);

  const filteredResults = products.filter(
    (product) => product.category.toLowerCase() === formattedCategory
  );
  console.log(filteredResults)
  setSearchResults(filteredResults);
};



  const renderCategoryItem = ({ item }) => (
    <Pressable onPress={() => handleCategorySearch(item.name)}>
      <View style={styles.categoryItem}>
        <Image source={{ uri: item.image }} style={styles.categoryImage} />
        <Text style={styles.categoryName}>{item.name}</Text>
      </View>
    </Pressable>
  );

  const cart = useSelector((state) => state.cart);
  const cartItemCount = cart.products.reduce((acc, product) => acc + product.quantity, 0);
  const isConnected = useSelector((state) => state.network.isConnected)
  return (
    <View style={{ flex: 1 }}>
{ isConnected &&  <LinearGradient
      colors={['#496152', '#496152']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        paddingTop: 45,
        paddingBottom: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
     <Pressable onPress={() => navigation.goBack()}>
  <MaterialCommunityIcons
    name="chevron-left"
    style={styles.chevronBackIcon}
  />
</Pressable>


<View style={[styles.textInputContainer, { flex: 1, marginRight: 10 }]}>
  <MaterialCommunityIcons name="magnify" size={20} style={styles.searchIcon} />
  <TextInput
    ref={textInputRef}
    placeholder="Search Arphibo"
    placeholderTextColor="black"
    style={{ fontSize: 14, color: '#555', flex: 1 }}
    value={searchText}
    onChangeText={(text) => {
      setSearchText(text);
      handleSearch();
    }}
  />
  {!!searchText && (
    <TouchableOpacity onPress={() => setSearchText('')}>
      <MaterialCommunityIcons name="close" size={20} style={{ color: 'black' }} />
    </TouchableOpacity>
  )}
</View>


      {/* Cart Icon */}
      <Pressable onPress={() => navigation.navigate('Cart')}>
        <MaterialCommunityIcons name="cart" size={26} style={{ color: 'white', marginLeft: 10 }} />
        {cartItemCount > 0 && (
          <View style={styles.cartCount}>
            <Text style={styles.cartCountText}>{cartItemCount}</Text>
          </View>
        )}
      </Pressable>
    </LinearGradient>}
    {isConnected ? (
        searchResults.length > 0 ? (
          <SearchResultsComponent searchResults={searchResults} />
        ) : (
          <>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryHeaderText}>Search by Category</Text>
            </View>
            <View style={styles.categoryList}>
              <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.name}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryListContainer}
              />
            </View>
          </>
        )
      ) : (
        <NoInternetStatus />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 9,
    marginLeft: 4,
    color: '#555',
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 280,
    paddingHorizontal: 8,
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    elevation: 5,
    marginLeft:10
  },
  categoryList: {},
  categoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
  },
  categoryItem: {
    width: 100,
    alignItems: 'center',
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 40,
    marginBottom: 8,
    marginTop:10
  },
  categoryName: {
    fontSize: 12,
    color: '#555',
  },
  categoryHeader: {
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop:10
  },
  categoryHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  recentSearchItem: {
    fontSize: 13,
    marginVertical: 5,
    color: 'black',
    fontWeight: '500',
  },
  recentSearchList: {
    maxHeight: 100,
  },
  cartBadge: {
    position: 'relative',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 50,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentSearchContainer: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 18, // Adjust this value based on your preference and item height
    padding: 5,
    margin: 4,
    overflow: 'hidden', // Ensure the half-circle border radius is visible
  },
  recentSearchesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 8,
  },
  // Styles for the search results sectionz 
  searchResultsContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  searchResultContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    alignItems: 'center',
    elevation: 3,
  },
  searchResultImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  searchResultName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  searchResultPrice: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  addToCartButton: {
    backgroundColor: '#3498db',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  addToCartButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  // New styles for cart icon and count
  cartIcon: {
    color: 'white',
    height: 26,
    marginLeft: 10,
  },
  cartCount: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  cartCountText: {
    color: 'white',
    fontSize: 12,
  },
  chevronBackIcon: {
    fontSize: 28,
    color: 'white',
  
    borderRadius: 12,
  
  },
});

export default MainSearchComponent;