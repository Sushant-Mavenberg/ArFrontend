import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet,Pressable} from 'react-native';
import { Card } from 'react-native-elements';
import Product from './Product';
import { useNavigation } from '@react-navigation/native';
const ProductCarousel = ({ products }) => {
  const limitedData = products.slice(0, 4);
    const [cart, setCart] = useState([]);
    const [isShimmering, setIsShimmering] = useState(true);
  
    const handleAddToCart = (product) => {
      ;
      setCart([...cart, product]);

    };
  
    useEffect(() => {
      // Simulate a loading delay to showcase shimmer effect
      setTimeout(() => {
        setIsShimmering(false);
      }, 2000);
    }, []);
    const navigation = useNavigation()
    const handleViewMorePress = () => {
      // Navigate to the "View More" page
      // You need to have set up navigation properly in your app
      navigation.navigate('ViewMorePage', { category: 'New Plants', data:{products }}); // Replace 'ViewMorePage' with the actual screen name
    };
    return (
      <View style={styles.container}>
        {/* <View style={styles.divider} /> */}
        <View style={styles.productTxt}>
          <Text style={styles.productTxtText}>New plants</Text>
          <Pressable onPress={handleViewMorePress}>
          <Text style={styles.titleRight}>View More</Text>
        </Pressable>
        </View>
        <FlatList
          data={limitedData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Product
              product={item}
              onAddToCart={handleAddToCart}
              isShimmering={isShimmering}
            />
          )}
        />
        {/* <Text style={styles.cartInfo}>Cart items: {cart.length}</Text> */}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    productTxt: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingLeft: 20,
      paddingRight: 20,
    },
    productTxtText: {
      paddingTop:12,
      paddingBottom:10,
      fontSize: 12,
      maxWidth: '100%',
      color: '#333', // Text color
      fontWeight: '600',
      //letterSpacing: 1,
    },
    titleRight: {
      paddingTop:12,
      fontSize:12,
      color: 'green',
      letterSpacing:.5, 
      fontWeight:'600'// Set text color to black
    },
    cartInfo: {
      fontSize: 20,
      fontWeight: 'bold',
      alignSelf: 'center',

    },
    divider: {
      height: 1,
      backgroundColor: '#ddd',
      marginVertical: 3,
      elevation: 5, // Add elevation for shadow (Android-only)
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
  });
  
  export default ProductCarousel;