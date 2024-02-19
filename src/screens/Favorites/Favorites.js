import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, ScrollView, Text, Image, TouchableOpacity, StyleSheet, View, Pressable, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { removeFromFavorites } from '../../Redux/FavouriteReducer';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.50; // 47% of the screen width for each card
const marginHorizontal = (width - cardWidth * 2) / 3; // Calculate margin dynamically

const EmptyWishlist = ({ onPressShopNow }) => (
  <View style={styles.centeredContainer}>
    <View style={styles.emptyWishlistContainer}>
      <Image
        source={require('../../assets/empty_wishlist.png')}
        style={styles.emptyWishlistImage}
      />
      <Text style={styles.emptyWishlistText}>
        <Text style={styles.boldText}>You haven't liked any items yet.</Text>
        <Text style={styles.nonBoldText}>{'\n'}{'\n'}Tap on the heart to add to your favorites</Text>
        
      </Text>

      <Pressable style={styles.shopNowButton} onPress={onPressShopNow}>
        <Text style={styles.shopNowButtonText}>Add Now</Text>
      </Pressable>
    </View>
  </View>
);

const FavoriteScreen = () => {
  const favorites = useSelector((state) => state.favorite.favorites);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const renderFavoriteItem = ({ item }) => (
    <View style={[styles.favoriteItem, { marginLeft: marginHorizontal, marginRight: marginHorizontal }]}>
      <Image source={{ uri: item.images.jpegUrls[0] }} style={styles.productImage} />
      <View style={styles.removeFavorite}>
        <TouchableOpacity onPress={() => dispatch(removeFromFavorites({ id: item._id }))}>
          <MaterialCommunityIcons name="close" style={styles.crossIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.bodySection}>
        <View style={styles.productDetails}>
          <Text style={styles.productName} numberOfLines={2} ellipsizeMode="tail">
            {item.name}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.productCost}>
              ₹{item.finalPrice} {/* Indian currency */}
            </Text>
            <Text style={styles.actualPrice}>
              ₹{item.actualPrice} {/* Actual price */}
            </Text>
            <Text style={styles.discountText}>
              {item.discountPercentage}% OFF {/* Discount percentage */}
            </Text>
          </View>
        </View>
      </View>
      {/* Container for "Move to Bag" */}
      <View style={styles.moveToBagContainer}>
        <Pressable>
          <Text style={styles.moveToBagText}>Move to Bag</Text>
        </Pressable>
      </View>
    </View>
  );

  const onPressShopNow = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {favorites.length === 0 ? (
          <EmptyWishlist onPressShopNow={onPressShopNow} />
        ) : (
          <React.Fragment>
            <Text style={styles.favoriteCountText}>
              Your favoriteproducts ({favorites.length})
            </Text>
            <View style={styles.cardRow}>
              {favorites.map((item) => (
                <React.Fragment key={item._id}>
                  {renderFavoriteItem({ item })}
                </React.Fragment>
              ))}
            </View>
          </React.Fragment>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  favoriteItem: {
    flexDirection: 'column',
    width: cardWidth,
    overflow: 'hidden',
    elevation: 5, // Add elevation for shadow
    backgroundColor: "#fff",
   // Add borderRadius for rounded corners
    marginBottom: 5,
    borderColor: 'black',
    borderBottomWidth: 0,
    
  },
  favoriteCountText: {
  
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 20,
    marginLeft:10,
    color: 'black',
  },
  removeFavorite: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 5,
    zIndex: 1,
  },
  crossIcon: {
    fontSize: 18,
    color: 'black',
  },
  bodySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderBottomWidth: 1, // Added borderBottom
    borderColor: 'black', // Added borderColor
    paddingBottom: 10, // Added paddingBottom
  },
  productImage: {
    width: '100%',
    height: 160,
  },
  icon: {
    fontSize: 14,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productCost: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  actualPrice: {
    fontSize: 12,
    color: '#666',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  discountText: {
    color: 'red',
    fontSize: 12,
    fontWeight: 'bold',
  },
  moveToBagContainer: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  
    alignItems: 'center',
    justifyContent: 'center',
 
  },
  moveToBagText: {
    color: '#496152',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
   
  },
  emptyWishlistContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyWishlistText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
    color: "black",
  },
  shopNowButton: {
    backgroundColor: '#496152',
    //borderWidth: 2,
    //borderColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  shopNowButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  emptyWishlistImage: {
    width: 180, 
    height: 150,
    marginBottom: 30, 
  },
  nonBoldText:{
    color:'#888',
    fontSize:14,
  },
});

export default FavoriteScreen;
