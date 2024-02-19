  import React from 'react';
  import { View, TextInput,Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import LinearGradient from 'react-native-linear-gradient';
  import { useNavigation } from '@react-navigation/native';
  import { useSelector } from 'react-redux';
  const ProductDetailSearchHeader = ({ navigation }) => {
    const cartItems = useSelector((state) => state.cart.products);
    const handleSearchPress = () => {
      // Navigate to the MainSearch screen
      navigation.navigate('MainSearchComponent');
    };
    const handleCartPress = () => {
      navigation.navigate('Cart'); // Navigate to the "Cart" screen
    };

    return (
      <LinearGradient
        colors={['#496152', '#496152']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          flexDirection: 'row',
          paddingTop: 45,
          paddingBottom: 10,
          paddingHorizontal: 16,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="chevron-left"
            style={{
              fontSize: 16,
              color: '#555',
              padding: 12,
              backgroundColor: '#F0F0F0',
              borderRadius: 12,
              marginRight: 10,
            }}
          />
        </Pressable>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="magnify" size={20} style={styles.searchIcon} />
          <TextInput
            placeholder="Search Product"
            placeholderTextColor="black"
            style={styles.inputText}
            onFocus={handleSearchPress}
            // Additional props or logic for handling search input
          />
        </View>

        <Pressable onPress={handleCartPress}>
          <MaterialCommunityIcons name="cart" size={26} style={styles.cartIcon} />
          {cartItems.length > 0 && (
            <View style={styles.cartCount}>
              <Text style={styles.cartCountText}>{cartItems.length}</Text>
            </View>
          )}
        </Pressable>
      </LinearGradient>
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
    cartIcon: {
      color: 'white',
      height: 26,
      marginLeft: 10,
    },
    cartCount: {
      position: 'absolute',
      top: -5,
      right: -5,
      backgroundColor: 'red',
      borderRadius: 10,
      width: 16,
      height: 16,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    cartCountText: {
      color: 'white',
      fontSize: 10,
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingHorizontal: 8,
      height: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.2)',
      elevation: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputText: {
      fontSize: 14,
      color: '#555',
      flex: 1,
    },
  });

  export default ProductDetailSearchHeader;
