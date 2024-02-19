import React, { useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Pressable, ScrollView, } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from '../../../../Redux/ProductReducer'; // Update the path accordingly
import DummyShimmerComponent from '../../../ShimmerComponents/TrendingShimmer'; 
const TableTopItem = ({ item, type,category }) => {
  const navigation = useNavigation();
  const isConnected = useSelector((state) => state.network.isConnected)
  const handleItemPress = (category) => {
    if (isConnected) {
          // Navigate to the "ProductDetailComponent" with the specific item data
    navigation.navigate('ProductDetailComponent', { product:item,type:category });
    } else {
          // Navigate to the "ProductDetailComponent" with the specific item data
          navigation.navigate('NoInternet');
    }

  };

  return (
    <Pressable onPress={() => handleItemPress(item.category)}>
      <View style={styles.itemContainer}>
        <ShimmerPlaceholder autoRun={true} visible={!item.loading}>
          <View style={styles.cardContainer}>
            <Image source={{ uri: item.images.jpegUrls[0] }} style={styles.image} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.textContainer}>
              <Text style={styles.itemName}>
                {item.name}
              </Text>
            </ScrollView>
          </View>
        </ShimmerPlaceholder>
      </View>
    </Pressable>
  );
};

const TableTop = ({ data, type }) => {
  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <TableTopItem item={item} type={type} />}
    />
  );
};
const useCategoryEffect = (category) => {
  const dispatch = useDispatch();
  const loadingByCategory = useSelector((state) => state.products.loadingByCategory);
  const data = useSelector((state) => {
    switch (category) {
      case 'table-top':
        return state.products.tableTops;
      case 'wall-hanging':
        return state.products.wallHangings;
      case 'aroma-candle':
        return state.products.aromaCandles;
      case 'metal-planter':
        return state.products.metalPlanters;
      case 'floor-standing':
        return state.products.floorStanding;
      default:
        return [];
    }
  });



  return { loadingByCategory, data };
};
const HomeTableTop = ({text, type,category }) => {
  const navigation = useNavigation();
  const { loadingByCategory, data } = useCategoryEffect(category);

  const isConnected = useSelector((state) => state.network.isConnected)
  const dispatch = useDispatch();
  const handleViewMorePress = () => {

    if (isConnected) {
      // Navigate to the "View More" page
      navigation.navigate('ViewMorePage', { category: text, data });
    } else {
      // Navigate to the "NoInternet" page or show a modal, etc.
      navigation.navigate('NoInternet');
    }
  };
  
    useEffect(() => {
    // Fetch data when the component mounts or when the internet connection is restored
    if (isConnected) {
      dispatch(fetchProductsByCategory(category));
    }
  }, [dispatch, category, isConnected]);
  return (
    <View style={styles.container}>
    
      <View style={styles.header}>
        <Text style={styles.titleLeft}>{text}</Text>
        <Pressable onPress={handleViewMorePress}>
          <Text style={styles.titleRight}>View More</Text>
        </Pressable>
      </View>
      {loadingByCategory === 'pending' || loadingByCategory === 'failed' ? (
            <DummyShimmerComponent/>
          ) : (
            <TableTop data={data} type={type} />
          )}
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 13,
  },
  titleLeft: {
    fontSize: 14,
    maxWidth: '100%',
    color: '#333',
    fontWeight: '700',
    paddingVertical:10
  
  },
  titleRight: {
    fontSize: 12,
    fontWeight: '700',
    color: '#009950',
    letterSpacing: 0.5,
 
    paddingVertical:10
  },
  itemContainer: {
    width: 120,
    height: 150,
    padding: 5,
    margin: 0,
    alignItems: 'center',
    paddingHorizontal: 1,
  },
  cardContainer: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5
  },
  textContainer: {
    width: 100,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  itemName: {
    textAlign: 'center',
    color: 'black', // Adjust the text color as needed
    fontSize: 12,
    fontWeight: '400',
  },
});

export default HomeTableTop;