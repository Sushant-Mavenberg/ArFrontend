import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Pressable,Modal } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import FilterModal from '../../FilterModel';
import SortModal from '../../SortModel';
import { addToCart, deleteItem, updateQuantity } from '../../../Redux/CartReducer.js';
import { useNavigation } from '@react-navigation/native';
import { addToFavorites, removeFromFavorites } from '../../../Redux/FavouriteReducer';
const SearchResultsComponent = ({ searchResults }) => {

  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart);
  const favorites = useSelector((state) => state.favorite.favorites);
  const dispatch = useDispatch();
  const [isSortModalVisible, setSortModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState(null);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  
  const toggleFavorite = (item) => {
    if (isItemInFavorites(item._id)) {
      dispatch(removeFromFavorites({ id: item._id }));
    } else {
      dispatch(addToFavorites(item));
    }
  };
  
  
  const isItemInFavorites = (itemId) => favorites.some((favorite) => favorite._id === itemId);

  
  const isItemInCart = (itemId) => cart.products.some((cartItem) => cartItem.id === itemId);
  const toggleCart = (item) => {
    const isInCart = isItemInCart(item._id);
  
    if (isInCart) {
      dispatch(deleteItem({ id: item._id }));
    } else {
      dispatch(addToCart({
        id: item._id,
        name: item.name,
        description: item.description,
        price: item.finalPrice,
        actualPrice: item.actualPrice,
        image: item.images.jpegUrls[0],
        quantity: 1,
      }));
    }
  };
  
  const isFavorite = (item) => favorites.includes(item.id);

  const handleSortOptionPress = (option) => {
    setSortModalVisible(false);
    setSortOption(option);
   

    // You can perform sorting logic here based on the selected option
    if (option === 'Price: High to Low') {
      searchResults.sort((a, b) => b.finalPrice - a.finalPrice);
    } else if (option === 'Price: Low to High') {
      searchResults.sort((a, b) => a.finalPrice - b.finalPrice);
    } else if (option === 'Latest') {
      searchResults.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  };
  const renderSearchResultItem = ({ item }) => (
  
    <Pressable
      onPress={() => navigation.navigate('ProductDetailComponent', { product:item,type:item.category })}
      style={styles.searchResultContainer}
    >
     <View style={styles.leftSection}>
        <Image source={{ uri: item.images.jpegUrls[0] }} style={styles.searchResultImage} />
        <TouchableOpacity
          style={[
            styles.favoriteIconContainer,
            { borderColor: isItemInFavorites(item._id) ? 'red' : 'black' },
          ]}
          onPress={() => toggleFavorite(item)}
        >
          <MaterialCommunityIcons
            name={isItemInFavorites(item._id) ? 'heart' : 'heart-outline'}
            style={[styles.favoriteIcon, { color: isItemInFavorites(item._id) ? 'red' : 'black' }]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.rightSection}>
  <Text style={styles.searchResultName}>{item.name}</Text>
  <View style={styles.priceContainer}>
  
    <Text style={styles.searchResultPrice}>
      ₹{item.finalPrice}
      <Text style={styles.strikeThrough}>  ₹{item.actualPrice}</Text>
      <Text style={styles.discountText}> {item.discountPercentage}% Off</Text>
    </Text>
  </View>
</View>

<View style={styles.addToCartContainer}>
        <Pressable
          style={styles.addToCartButton}
          onPress={() => toggleCart(item)}
        >
          <Text style={styles.addToCartText}>
            {isItemInCart(item._id) ? 'Remove' : 'Add'}
          </Text>
          {isItemInCart(item._id) ? (
            <MaterialCommunityIcons
              name="delete"
              style={[styles.addToCartIcon, { marginLeft: 4, color: "red" }]}
            />
          ) : (
            <MaterialCommunityIcons
              name="plus"
              style={[styles.addToCartIcon, { marginLeft: 4 }]}
            />
          )}
        </Pressable>
      </View>
    </Pressable>
  );
  

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      {/* Text sections at the top */}
      <View style={styles.headerContainer}>
        <View style={styles.leftHeaderTextContainer}>
          <Text style={styles.headerText}>Search Result</Text>
        </View>
        <View style={styles.rightHeaderTextContainer}>
        <Pressable style={styles.filterSortContainer} onPress={() => setSortModalVisible(true)}>
  <MaterialCommunityIcons name="sort" style={styles.headerIcon} />
  <Text style={styles.filterSortText}>Sort</Text>
</Pressable>

          {/* <Pressable style={styles.filterSortContainer} onPress={() => setFilterModalVisible(true)}>
            <MaterialCommunityIcons name="tune" style={styles.headerIcon} />
            <Text style={styles.filterSortText}>Filter</Text>
          </Pressable> */}
        </View>
      </View>

      {/* FlatList for search results */}
      <FlatList
        data={searchResults}
        renderItem={renderSearchResultItem}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={renderSeparator}
      />

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <FilterModal visible={isFilterModalVisible} onClose={() => setFilterModalVisible(false)} />
      </Modal>
      <SortModal visible={isSortModalVisible} onClose={() => setSortModalVisible(false)}  onPress={handleSortOptionPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f2f2f2',
  },
  
  leftHeaderTextContainer: {
    flex: 2,
  },
  rightHeaderTextContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  headerText: {
    fontSize: 14,
    fontWeight: '700',
    color: 'black',
    fontFamily:"sans-serif"
  },
  headerIcon: {
    fontSize: 20,
    marginHorizontal: 4,
    color: 'black',
  },
  filterSortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  filterSortText: {
    marginLeft: 2,
    fontSize: 12,
    color: 'black',
    fontWeight:"600"
  },
  searchResultContainer: {
    flexDirection: 'row',
    padding: 8,
    margin: 4,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  strikeThrough: {
    textDecorationLine: 'line-through',
    color: 'grey',
    fontSize: 12,
    fontWeight: '400',
    
   
  
  },
  
  discountText: {
    color: 'red',
    fontSize: 12,
    fontWeight: 'bold',
 
    marginHorizontal:10
  },
  
  leftSection: {
    flex: 1,
    marginRight: 8,
    position: 'relative',
  },
  rightSection: {
    flex: 2,
  },
  searchResultImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  searchResultName: {
    fontSize: 12,
    fontFamily: 'sans-serif',
    fontWeight:'500',
    marginBottom: 4,
    color: 'rgba(0,0,0,.65)',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
   
  },
  indianSymbol: {
    fontSize: 14,
    marginRight: 2,
    color: 'black',
    fontWeight: 'bold',
  },
  searchResultPrice: {
    fontSize: 12,
    color: 'black',
    fontWeight: '600',
  },
  addToCartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  counterContainer: {
    width: 25,
    height: 25,
    borderRadius: 16,
    borderColor: 'grey',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  counterIcon: {
    fontSize: 14,
    color: 'black',
  },
  counterText: {
    marginHorizontal: 5,
    fontSize: 14,
    color: 'black',
  },
 addToCartButton: {
  backgroundColor: 'transparent',
  padding: 6,
  borderRadius: 15,
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: 'lightgray',
  position: 'relative',
  overflow: 'hidden',
  justifyContent: 'center',  // Center content vertically
},

  addToCartIcon: {
    fontSize: 14,
    color: 'black',
    marginRight: 4,
   
  },
  addToCartText: {
  marginRight:6,
    fontWeight: '600',
    color: 'black',
    fontSize:14
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  favoriteIconContainer: {
    position: 'absolute',
    top: 2,
    right: 5,
    borderRadius: 12,
    padding: 4,
  },
  favoriteIcon: {
    fontSize: 20,
  },
});

export default SearchResultsComponent;
