
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';
const SwiperComponent = ({ product }) => {
    return (
      <Swiper
        style={styles.wrapper}
        dotStyle={styles.dot}
        activeDotColor="#FFF"
        activeDotStyle={styles.activeDot}
      >
        {product.images.jpegUrls.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        ))}
      </Swiper>
    );
  };
  
  const styles = StyleSheet.create({
    wrapper: {
     
    },
    slide: {
 
      justifyContent: 'center',
      alignItems: 'center',
  
     
    },
    image: {
      marginLeft: 120,
    
      height: 640,
      width: '130%',
      borderBottomLeftRadius:90,
      resizeMode: 'contain',
    borderColor:"green",
    borderWidth:1
  
     
      
    },
    dot: {
      marginTop: -100,
      width: 15,
      height: 5,
      borderRadius: 10,
      backgroundColor: '#FFF',
    },
    activeDot: {
      marginTop: -100,
      width: 30,
      height: 6,
      borderRadius: 10,
      backgroundColor: '#FFF',
    },
  });
  export default SwiperComponent