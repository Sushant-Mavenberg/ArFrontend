import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Dimensions, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CartNotification from '../../../components/AddToCartNotifcation'; // Import the CartNotification component
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const AverageRatingDisplay = ({ averageRating }) => {
  const loading = useSelector((state) => state.products.loadingAll);
  console.log('trending');
  console.log(loading)
  return (
    <View style={styles.ratingContainer}>
      <MaterialCommunityIcons
        name="star"
        color="#FFD700" // Gold color
        size={8}
        style={styles.starIcon}
      />
      <Text style={styles.ratingText}>{averageRating}</Text>
    </View>
  );
};

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

const Product = ({ product, onAddToCart }) => {
  const navigation = useNavigation();
  const [cartNotificationVisible, setCartNotificationVisible] = useState(false);

  const handleProductPress = () => {
    navigation.navigate('ProductOverview', { product, type: 'plant' });
  };

  const handleAddToCart = () => {
    setCartNotificationVisible(true);

    // Optionally, you can close the notification after a delay
    setTimeout(() => {
      setCartNotificationVisible(false);
    }, 5000); // Adjust the delay as needed
  };

  const handleViewCart = () => {
    // Navigate to the "MyCart" screen
    navigation.navigate('MyCart');
  };

  const truncateText = (text, maxLength) => {
    const words = text.split(' ');
    return words.length > 1 ? words.slice(0, 2).join(' ') : text;
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.productContainer}
      colors={['#FFFFFF', '#FFFFFF']}
    >
      <Pressable onPress={handleProductPress}>
        <ImageBackground
          source={{ uri: product.images.jpegUrls[0] }}
          style={styles.productImage}
          resizeMode="cover"
        >
          {/* Include the AverageRatingDisplay component */}
          <AverageRatingDisplay averageRating={4.5 /* Replace with actual average rating */} />
        </ImageBackground>
      </Pressable>

      <View style={styles.productInfo}>
        <View>
          {/* Wrap the product name in a View to control width */}
          <View style={styles.productNameContainer}>
            <Text style={styles.productName}>{truncateText(product.name, 20)}</Text>
          </View>
        </View>
        <View style={styles.productFooterRow}>
          {/* ... */}
        </View>
        {/* ... */}
      </View>

      {/* Cart Notification */}
      <CartNotification
        visible={cartNotificationVisible}
        onClose={() => setCartNotificationVisible(false)}
        onViewCart={handleViewCart}
        productName={product.name} // Pass additional props as needed
        totalAmount={product.price} // Pass additional props as needed
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  productNameContainer: {
    width: CARD_WIDTH, // Set a maximum width for the product name
  },
  productContainer: {
    borderRadius: 10,
    margin: 4,
    alignItems: 'center',
    shadowColor: '#757575', // Gray shadow color
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  productImage: {
    height: 100,
    width: 100,
    borderTopEndRadius: 10,
    borderTopLeftRadius:10,
    borderBottomEndRadius:10,
    borderBottomLeftRadius:10,
    overflow: 'hidden',
    position: 'relative',
  },
  productInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 5,
    width: '100%',
  },
  productFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },

  ratingContainer: {
    flexDirection: 'row',
    backgroundColor: 'black',
    alignItems: 'center',
    padding: 5,
    borderBottomLeftRadius: 20,
    position: 'absolute',
    right: 0,
  },
  starIcon: {
    marginRight: 5,
  },
  ratingText: {
    color: '#FFD700', // Gold color
    fontSize: 10,
  },
  productName: {
    fontSize: 12,
    textAlign:'center',
    color: '#263238', // Dark grey text color
    fontWeight: '400',
    paddingHorizontal:15
  },
  productSubtitle: {
    fontSize: 12,
    color: '#263238', // Dark grey text color
  },
  // productPriceCurrency: {
  //   fontFamily: 'Poppins-SemiBold',
  //   color: '#FF8F00', // Amber text color
  //   fontSize: 12,
  //   fontWeight: '100',
  //   position:'absolute'
  // },
  // productPrice: {
  //   color: '#263238', // Dark grey text color
  //   fontWeight: 'bold',
  // },
  // productAddIconContainer: {
  //   position: 'absolute',
  //   right: 15,
  //   top: 20,
  // },
  // productAddIcon: {
  //   height: 20,
  //   width: 20,
  //   color: '#008000',
  // },
});

export default Product;