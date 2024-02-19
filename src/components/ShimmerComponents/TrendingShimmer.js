import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectIsConnected } from '../../Redux/NetworkReducer';

const ShimmerTrendingPlantCardItem = ({ imageSize, maxCharsPerLine }) => {
  const navigation = useNavigation();
  const isConnected = useSelector(selectIsConnected);

  const navigateToNoInternet = () => {
    if (!isConnected) {
      navigation.navigate('NoInternet');
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={navigateToNoInternet}>
      <ShimmerPlaceholder
        autoRun={true}
        visible={false}
        style={[styles.image, { width: imageSize, height: imageSize }]}
        LinearGradient={LinearGradient}
      />
      <View style={styles.overlay}>
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          autoRun={true}
          visible={false}
          style={[styles.nameAndCost, { width: imageSize }]}  // Adjusted style here
        />
      </View>
    </TouchableOpacity>
  );
};

const TrendingPlantCardItem = ({ item, imageSize, maxCharsPerLine }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => { /* Add navigation or item click functionality */ }}>
      <Image source={{ uri: item.images.jpegUrls[0] }} style={[styles.image, { width: imageSize, height: imageSize }]} resizeMode="cover" />
      <View style={styles.overlay}>
        <Text style={[styles.nameAndCost, { width: imageSize }]} numberOfLines={2}>  {/* Adjusted style here */}
          {item.name.length > maxCharsPerLine ? item.name.substring(0, maxCharsPerLine) + '...' : item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const TrendingPlantCard = () => {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  const screenHeight = Dimensions.get('window').height;
  const imageSize = screenWidth > screenHeight ? screenWidth / 5 : screenWidth * 0.35;
  const maxCharsPerLine = Math.floor(imageSize / 8);

  // Dummy shimmer data
  const shimmerData = Array.from({ length: 10 }, (_, index) => ({ _id: index.toString() }));

  return (
    <View style={styles.container}>
      <FlatList
        data={shimmerData}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ShimmerTrendingPlantCardItem imageSize={imageSize} maxCharsPerLine={maxCharsPerLine} />
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
    letterSpacing: 1,
    marginBottom: 10,
  },
  image: {
    borderRadius: 8,
    marginBottom: 8,
    marginRight: 16,
  },
  overlay: {
    paddingHorizontal: 5,
  },
  nameAndCost: {
    fontSize: 14,
    color: 'black',
    // Remove the width property to allow it to be dynamic
  },
});

export default TrendingPlantCard;
