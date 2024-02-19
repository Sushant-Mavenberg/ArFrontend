import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const TrendingPlantCardItem = ({ item, imageSize, maxCharsPerLine}) => {
  const navigation = useNavigation()
  const handlePress = (category) => {
    // Navigate to 'ProductDetailComponent' with the selected item and additional parameter 'type'
    navigation.navigate('ProductDetailComponent', { product: item, type: category });
  };
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={()=>handlePress(item.category)}>
   
        <Image source={{ uri: item.images.jpegUrls[0] }} style={[styles.image, { width: imageSize, height: imageSize }]} resizeMode="cover" />
 
      <View style={styles.overlay}>
   
          <Text style={styles.nameAndCost} numberOfLines={2}>
            {item.name.length > maxCharsPerLine ? item.name.substring(0, maxCharsPerLine) + '...' : item.name}
          </Text>
     
      </View>
    </TouchableOpacity>
  );
};

const TrendingPlantCard = ({ plants }) => {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

 

  const screenHeight = Dimensions.get('window').height;
  const imageSize = screenWidth > screenHeight ? screenWidth / 5 : screenWidth * 0.35;
  const maxCharsPerLine = Math.floor(imageSize / 8);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Trending Products</Text>
      <FlatList
        data={plants}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TrendingPlantCardItem item={item} imageSize={imageSize} maxCharsPerLine={maxCharsPerLine} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    marginLeft: 10,
  },
  heading: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    //letterSpacing: 1,
    marginBottom: 10,
  },
  image: {
    borderRadius: 8,
    marginBottom: 8,
    marginRight: 16,
  },
  overlay: {
    paddingHorizontal: 10,
  },
  nameAndCost: {
    fontSize: 14,
    color: 'black',
  },
});

export default TrendingPlantCard;
