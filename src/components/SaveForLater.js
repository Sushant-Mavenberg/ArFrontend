import React from 'react';
import { View, Text, Image, Pressable, FlatList,Button } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSavedItem, addToCart, clearSavedItems } from '../Redux/CartReducer';

const SaveForLater = () => {
  const savedItems = useSelector((state) => state.cart.savedItems);
  const dispatch = useDispatch();
  const handleClearSavedItems = () => {
    dispatch(clearSavedItems());
  };
  const renderCarouselItem = ({ item }) => (
    <View style={{ alignItems: 'flex-start', paddingHorizontal: 6, marginHorizontal: 4, marginTop: 20 }}>
      <Image
        source={{ uri: item.image }}
        style={{ width: 120, height: 120, borderRadius: 10, marginBottom: 10 }}
      />
      <Text
        style={{
          width: 150, // Set the width to match the image width
          fontSize: 12,
          color: '#333',
          fontWeight: '600',
          lineHeight: 18,
        }}
        numberOfLines={2}
        ellipsizeMode="tail">
        {item.name}
      </Text>
      <Text style={{ fontSize: 14, marginBottom: 2, color: 'black', fontWeight: '600' }}>
        &#8377;{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </Text>
      <Text style={{ fontSize: 14, color: 'grey', textDecorationLine: 'line-through',fontWeight:"600", opacity: 0.6 }}>
        &#8377;{item.actualPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </Text>
      <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
        <Pressable
           onPress={() => {
            dispatch(addToCart(item));
            dispatch(deleteSavedItem(item.id));
          }}
          style={{
            backgroundColor: '#496152',
            borderRadius: 30,
            paddingHorizontal: 20,
            paddingVertical: 8,
            marginRight: 10,
          }}>
          <Text style={{ color: 'white', fontWeight: '600' }}>Add to Cart</Text>
        </Pressable>
        <Pressable onPress={() => dispatch(deleteSavedItem(item.id))}>
          <MaterialCommunityIcons
            name="delete-outline"
            style={{
              fontSize: 16,
              color: 'green',
              backgroundColor: '#F0F0F0',
              padding: 8,
              borderRadius: 100,
              marginLeft: 10,
            }}
          />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8 }}>
        <Text
          style={{
            fontSize: 14,
            color: '#333',
            fontWeight: '500',
            letterSpacing: 1,
            paddingTop: 20,
            paddingLeft: 10,
            marginBottom: 10,
          }}>
          Save for Later ({savedItems.length})
        </Text>
        {/* <Pressable>
          <Text
            style={{
              fontSize: 14,
              color: '#496152',
              fontWeight: '500',
              letterSpacing: 1,
              paddingTop: 20,
              marginBottom: 10,
            }}>
            View More
          </Text>
        </Pressable> */}
        {/* <Button title="Clear Saved Items" onPress={handleClearSavedItems} /> */}
      </View>
      <FlatList
        data={savedItems}
        renderItem={renderCarouselItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default SaveForLater;
