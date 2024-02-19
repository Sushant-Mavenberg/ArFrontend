import React, { useState ,useEffect} from 'react';


import { View, Text, StyleSheet, TouchableOpacity, Image,SafeAreaView, StatusBar } from 'react-native';
import FastImage from 'react-native-fast-image';
import SearchInput from '../../components/HomePageComponents/Search.js'
import ImageSlider from '../../components/HomePageComponents/offerCarosule.js';

import { ScrollView } from 'react-native-gesture-handler';
import HomeTableTop from '../../components/HomePageComponents/ProductComponent/TableTops/TableTopPlant.js';

import Icon from 'react-native-vector-icons/MaterialIcons';

import ShopByCategory from '../../components/HomePageComponents/ShopByCategory.js';
import TrendingPlantCard from '../../components/HomePageComponents/ProductComponent/TrendingPlants/TrendingPlants.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchProductsByCategory } from '../../Redux/ProductReducer.js';
import DummyShimmerComponent from '../../components/ShimmerComponents/TrendingShimmer.js'; 
import NetworkStatusComponent from '../../components/NetworkStatusComponent.js';
import NetInfo from '@react-native-community/netinfo';
import { setConnectionStatus } from '../../Redux/NetworkReducer.js';

const HomePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loadingAll);


  useEffect(() => {
    // Fetch products when the component mounts
    dispatch(fetchProducts());

    // Subscribe to network status changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      dispatch(setConnectionStatus({ isConnected: state.isConnected }));

      // If the connection is restored, make the API call again
      if (state.isConnected) {
        dispatch(fetchProducts());
      }
    });

    // Clean up the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'transparent'} translucent />
      <NetworkStatusComponent/>
      <ScrollView>
        <View style={styles.container}>
     
          <View style={styles.appBar}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/logo.png')}
                style={styles.logoImage}
              />
            </View>
            <View style={styles.gifContainer}>
              <FastImage
                source={{
                  uri:
                    'https://res.cloudinary.com/dlzcgycpi/image/upload/v1700976525/54313f603114ee4fdb479268e8f18637_hwvlfj.gif',
                }}
                style={styles.gifImagee}
              />
              <FastImage
                source={{
                  uri:
                    'https://res.cloudinary.com/dlzcgycpi/image/upload/v1699533927/giphy.gif_z3qbcw.gif',
                }}
                style={styles.gifImage}
              />
              <FastImage
                source={{
                  uri:
                    'https://res.cloudinary.com/dlzcgycpi/image/upload/v1700976525/KiKGrcNCr4ye_i2re88.gif',
                }}
                style={styles.gifImage}
              />
            </View>
          </View>
          <SearchInput />
          <ImageSlider />
          <ShopByCategory />
          {loading === 'pending' || loading === 'failed' ? (
            <DummyShimmerComponent />
          ) : (
            <TrendingPlantCard plants={products} />
          )}
          {/* <ProductCarousel /> */}
         
         
          <HomeTableTop
          
            gradientColors={['#0DCDA4', '#C1FCD4']}
            text="Table Tops"
            type="plant"
            category='table-top'
          />
          <HomeTableTop
         
            gradientColors={['#FFB961', '#FFD384']}
            text="Aroma Candles"
            type="candle"
            category='aroma-candle'
          />
          <HomeTableTop
         
            gradientColors={['#FF8C9A', '#FFD3B6']}
            text="Wall Hangings"
            category='wall-hanging'
          />
          <HomeTableTop
          
          
            text="Metal planters"
            category='metal-planter'
          />
          <HomeTableTop
          
       
            text="Floor standings"
            category='floor-standing'
          />
        </View>
      </ScrollView>
   
    </SafeAreaView>
  );
};
const PlantCard = ({ plant, navigation }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Details', plant)}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: plant.like
                ? 'rgba(245, 42, 42, 0.2)'
                : 'rgba(0, 0, 0, 0.2)',
            }}>
            <Icon name="favorite" size={18} color={plant.like ? 'red' : 'black'} />
          </View>
        </View>

        <View style={styles.imageContainer}>
          <Image source={{ uri: plant.image }} style={styles.plantImage} />
        </View>

        <Text style={styles.plantName}>{plant.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.plantPrice}>${plant.price}</Text>
          <View style={styles.addButton}>
            <Text style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
              +
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginBottom: 10,
    backgroundColor: '#FFFFFF',
   
  },

  largeText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
    fontFamily: 'AlumniSansInlineOne-Italic',
  },

  largeTextt: {
    color: 'green',
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 10,

  },

  gifImage: {
    width: 50,
    height: 50,
    margin: ""
  },
  gifImagee: {
    width: 45,
    height: 45,
    margin: ""
  },

  textContainer: {
    marginRight: 5,
  },
  searchContainer: {
    marginBottom: 10,
  },

  plantCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Adjust as needed
    paddingHorizontal: 10, // Adjust as needed
  },

  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  centeredImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  centeredImage: {
    width: 200, // Adjust the width and height as needed
    height: 200,
  },

  card: {
    width: 160,
    // Set the width to 48% for two cards in a row
    margin: 5,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  iconContainer: {
    alignItems: 'flex-end',
  },

  imageContainer: {
    height: 100,
    width: '100%',
    alignItems: 'center',
  },

  plantImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 8,
  },

  plantName: {
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 10,
    color: 'black', // Set text color to black
  },

  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },

  plantPrice: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black', // Set text color to black
  },

  addButton: {
    height: 25,
    width: 25,
    backgroundColor: 'green',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoContainer: {
    marginRight: 5,
    marginLeft: 10,
    marginTop: 0
  },

  logoImage: {
    width: 120, // Set the width and height as needed
    height: 60,
    resizeMode: 'contain',
  },

  gifContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: 'row'
  },

  appBar:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    marginTop:30,
    backgroundColor: '#FFFFFF', // Adjust the background color as needed
    borderBottomColor: '#FFFFFF',
  }


});

export default HomePage;