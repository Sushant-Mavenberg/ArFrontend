import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, Pressable, ScrollView } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { useNavigation } from '@react-navigation/native';



const TableTopItem = ({ item, type }) => {
  const navigation = useNavigation();

//   const handleItemPress = () => {
//     navigation.navigate('ProductDetailComponent', { product: item, type });
//   };

  return (
    <Pressable>
      <View style={styles.itemContainer}>
        <ShimmerPlaceholder autoRun={true} style={styles.cardContainer}>
       
        </ShimmerPlaceholder>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.textContainer}>
          <ShimmerPlaceholder autoRun={true}  style={styles.itemName}>
          
          </ShimmerPlaceholder>
        </ScrollView>
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

const HomeTableTopShimmer = ({ text, type }) => {
  const navigation = useNavigation();
  const dummyData = Array.from({ length: 10 }, (_, index) => ({ _id: index.toString(), loading: true }));

  const handleViewMorePress = () => {
    navigation.navigate('ViewMorePage', { category: text, data: dummyData });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleLeft}>{text}</Text>
        <Pressable onPress={handleViewMorePress}>
          <Text style={styles.titleRight}>View More</Text>
        </Pressable>
      </View>
      <TableTop data={dummyData} type={type} />
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
    fontSize: 12,
    maxWidth: '100%',
    color: '#333',
    fontWeight: '700',
  },
  titleRight: {
    fontSize: 12,
    fontWeight: '700',
    color: '#009950',
    letterSpacing: 0.5,
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
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  textContainer: {
    width: 100,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName: {
    textAlign: 'center',
    color: 'black',
    fontSize: 12,
    fontWeight: '400',
  },
  dummyShimmerItem: {
    width: 120,
    height: 150,
    padding: 5,
    margin: 0,
    alignItems: 'center',
    paddingHorizontal: 1,
  },
});

export default HomeTableTopShimmer;
