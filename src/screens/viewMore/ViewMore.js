import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Rating } from 'react-native-ratings';

import GradientHeader from '../../components/HomePageComponents/Header';
import SortModal from '../../components/SortModel';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity } from '../../Redux/CartReducer';
import QuantityPopup from '../../components/QuantityPop';

const ViewMorePage = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const productsInCart = useSelector((state) => state.cart.products);
  const { category, data } = route.params;
  const [filteredData, setFilteredData] = useState(data);
  const [numColumns, setNumColumns] = useState(2);
  const [isSortVisible, setSortVisible] = useState(false)
  const [isSortModalVisible, setSortModalVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItemImage, setSelectedItemImage] = useState('');
  const [modalQuantity, setModalQuantity] = useState(0);
  useEffect(() => {
    // Adjust the number of columns based on the screen width
    const screenWidth = Dimensions.get('window').width;
    setNumColumns(screenWidth >= 600 ? 3 : 2); // Adjust the breakpoint as needed
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const toggleSortModal = () => {
    setSortModalVisible(!isSortModalVisible);
  };
  const handleAddToCart = (item) => {
    // Dispatch the addToCart action with the required information
    dispatch(addToCart({
      id: item._id, // Assuming _id is the unique identifier for your product
      name: item.name,
      description: item.description,
      price: item.finalPrice,
      actualPrice: item.actualPrice,
      image: item.images.jpegUrls[0],
      quantity: 1,
    }));
  };

  const handleSort = (sortOption) => {
    console.log(sortOption)
    console.log(filteredData);
    let sortedData = [...filteredData];

    switch (sortOption) {
      case 'Latest':
        // Sort by the latest items (you may need a timestamp or date field in your data)
        sortedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'Price: High to Low':
        // Sort by price from high to low
        sortedData.sort((a, b) => b.finalPrice - a.finalPrice);
        break;
      case 'Price: Low to High':
        // Sort by price from low to high
        sortedData.sort((a, b) => a.finalPrice - b.finalPrice);
        break;
      default:
        break;
    }

    setFilteredData(sortedData);
    toggleSortModal();
  };
  const handleItemPress = (item) => {
    // Navigate to the product overview page and pass the selected item as a parameter
    navigation.navigate('ProductDetailComponent', { product: item,type:item.category });
  };
 
  const renderItems = ({ item }) => {
    const discountedPrice = (item.finalPrice * (100 - item.discountPercentage)) / 100;
    const inCart = productsInCart.some((cartItem) => cartItem.id === item._id);
    const cartItem = productsInCart.find((cartItem) => cartItem.id === item._id);
    const handleUpdateQuantity = (item,itemId, newQuantity) => {
  
      const quantityToUpdate = Math.max(newQuantity, 1); // Ensure quantity is not less than 1
    
      if (quantityToUpdate > 3) {
        setSelectedItemImage(item.images.jpegUrls[0]);
        setModalQuantity(3);
        setModalVisible(true);
        // ToastAndroid.show("You cannot add more than 3 items.", ToastAndroid.SHORT);
        return;
      }
    
      dispatch(updateQuantity({ id: itemId, quantity: quantityToUpdate }));
    };
    
  
    return (
      <View style={styles.itemContainer}>
    
       <Pressable onPress={() => handleItemPress(item)} >
      <Image source={{ uri: item.images.jpegUrls[0] }} style={styles.image} />
      <Text style={styles.discountPercentageText}>{item.discountPercentage}% OFF</Text>
      <View style={styles.itemDetails}>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.itemName}>
          {item.name}
        </Text>
        <Rating startingValue={item.averageRating} imageSize={15} readonly style={styles.ratingContainer}/>
      
        <View style={styles.priceContainer}>
          <Text style={styles.discountedPrice}>
            &#8377;{discountedPrice.toFixed(2)}
          </Text>
          <Text style={styles.finalPrice}>
            <Text style={{ textDecorationLine: 'line-through', color: 'gray',fontWeight:"600" }}>
              &#8377;{item.finalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>{' '}

          </Text>
        </View>
      </View>
      
    </Pressable>
    <Pressable onPress={() => handleAddToCart(item)}>
  {inCart ? (
    <View style={styles.quantityContainer}>
      <Pressable onPress={() => handleUpdateQuantity(item,item._id, cartItem.quantity - 1)}>
        <MaterialCommunityIcons name="minus" style={styles.quantityIcon} />
      </Pressable>
      <Text style={styles.quantityText}>{cartItem.quantity}</Text>
      <Pressable onPress={() => handleUpdateQuantity(item,item._id, cartItem.quantity + 1)}>
        <MaterialCommunityIcons name="plus" style={styles.quantityIcon} />
      </Pressable>
    </View>
  ) : (
    <View style={{ backgroundColor: "#496152", borderRadius: 15, marginBottom: 8, marginHorizontal: 4 }}>
      <Text style={{ color: "white", textAlign: "center", paddingVertical: 6 }}>Add to cart</Text>
    </View>
  )}
</Pressable>

    </View>
     
    );
  };
  

  return (
    <SafeAreaView style={styles.container}>
     
      <GradientHeader navigation={navigation} text={category} onPress={() => navigation.goBack()} />
     
        {filteredData.length > 0 ? (
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItems}
            contentContainerStyle={styles.flatListContainer}
            numColumns={numColumns}
          />
        ) : (
          <View style={styles.noProductsContainer}>
            <Image
              source={require('../../assets/no_products.png')}
              style={styles.noProductsImage}
            />
            <Text style={styles.noProductsText}>No products available</Text>
          </View>
        )}
   
       {/* Fixed bottom container */}
    <View style={styles.headerRight}>
          <Text style={styles.itemCountText}>{data.length} Items</Text>
          
          <Pressable style={styles.filterSortContainer} onPress={toggleSortModal}>
  <MaterialCommunityIcons name="sort" style={styles.headerIcon} />
  <Text style={styles.filterSortText}>Sort</Text>
</Pressable>
<SortModal visible={isSortModalVisible} onClose={toggleSortModal} onPress={(option) => handleSort(option)} />
        </View>
        <QuantityPopup
      isVisible={isModalVisible}
      onBackdropPress={() => setModalVisible(false)}
      selectedItemImage={selectedItemImage}
      modalQuantity={modalQuantity}
    />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white"
  },
  filterSortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  filterSortText: {
    marginLeft: 2,
    fontSize: 12,
    color: 'black',
    fontWeight:"600"
  },
  headerIcon: {
    fontSize: 20,
    marginHorizontal: 4,
    color: 'black',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // To align items and sort icon horizontally
    paddingHorizontal:20,
    marginTop:5,
    marginBottom:5,
    color:"black", 
   backgroundColor:"white",
    backfaceVisibility:"white"// Adjust the margin as needed
  },
  itemCountText: {
    fontSize: 14,
    color: 'black',
    fontWeight:"600"
  },
  header: {
    flexDirection: 'row',
    paddingTop: 45,
    paddingBottom: 10,
    marginBottom: 10,
    paddingHorizontal: 16,
   
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 18,
    color: '#555',
    padding: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 16,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontWeight: '600',
  },
  flatListContainer: {
  
  },
  itemContainer: {
    flex: 1,
  backgroundColor:"#fff",
    overflow: 'hidden',
    elevation: 5,
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
  },
 
  itemDetails: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 15,
    flex: 1,
  },
  itemName: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
    letterSpacing: 1,
  },
  itemCost: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
  },
  noProductsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductsImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  noProductsText: {
    fontSize: 18,
    color: '#333',
  },
  ratingContainer: {
 
    marginTop:10
  },
  starIcon: {
    fontSize: 16,
    color: 'gold',
    marginRight: 2,
  },
  filterIcon: {
    fontSize: 25,
    color: 'black',
    paddingHorizontal: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
   
 // Adjust the marginTop as needed
  },
  
  discountedPrice: {
    fontSize: 12,
    fontWeight: '600',
    color: 'black',
    marginRight: 8,
  },
  bottomItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  finalPrice: {
    fontSize: 12,
    fontWeight: '400',
    color: 'black',
  },
  
  discountPercentageText: {
    color:"white",
     backgroundColor:"red",
     padding:5,
     fontSize:10,
     fontWeight:"600",
     borderRadius:6,
     fontSize:8,
     width:30,
     position:"absolute",
     marginLeft:5,
     marginTop:5
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff', // Set the background color as needed
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
 
  },

  bottomIcon: {
    fontSize: 24,
    color: 'black', // Set the icon color as needed
  },
  bottomText: {
    fontSize: 12,
    color: 'black', // Set the text color as needed
    marginTop: 4, // Adjust the margin as needed
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"space-around",
    borderColor: '#496152',
    borderWidth:1.5,
    borderRadius: 15,
    marginBottom: 8,
    marginHorizontal: 4,
    paddingVertical: 5,
    paddingHorizontal: 16,
  },
  quantityIcon: {
    color: 'black',
    fontSize: 18,
    paddingHorizontal: 10,
  },
  quantityText: {
    color: 'black',
    fontSize: 14,
    paddingHorizontal: 10,
    fontWeight:"600"
  },
});

export default ViewMorePage;
