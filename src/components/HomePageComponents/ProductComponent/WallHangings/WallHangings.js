import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, Pressable } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const CartItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <ShimmerPlaceholder autoRun={true} visible={!item.loading}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['#2E7D32', '#388E3C']}
        style={styles.gradientContainer}
      >
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.separator}></View>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>&#8377;{item.price}</Text>
        </View>
      </LinearGradient>
    </ShimmerPlaceholder>
  </View>
);

const Cart = ({ data }) => {
  const limitedData = data.slice(0, 4);
  const navigation = useNavigation();
  const handleViewMorePress = () => {
    navigation.navigate('ViewMorePage', { category: 'Wall Hangings', data });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleLeft}>Wall Hangings</Text>
        <Pressable onPress={handleViewMorePress}>
          <Text style={styles.titleRight}>View More</Text>
        </Pressable>
      </View>
      <FlatList
        horizontal
        data={limitedData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <CartItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  titleLeft: {
    fontSize: 14,
                maxWidth: '100%',
                color: '#333', // Text color
                fontWeight: '600',
                letterSpacing: 1,
  },
  titleRight: {
    fontSize: 14,
    fontWeight: '600',
    color: '#009950',
    letterSpacing: .5
  },
  itemContainer: {
    width: 100,
    padding: 5,
    alignItems: 'center',
  },
  gradientContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 5,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'white',
  },
  itemName: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 10,
    color: 'white',
  },
});

export default Cart;
