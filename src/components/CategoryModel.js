import React from 'react';
import { Modal, FlatList, Image, View, Text, TouchableOpacity, TouchableWithoutFeedback, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Separator = () => <View style={{ height: 1, backgroundColor: 'gray', marginTop: 10, marginBottom: 10 }} />;

const CategoryModal = ({ isVisible, categories, onClose, onSelectCategory }) => {
    const navigation = useNavigation();
    const productState = useSelector((state) => state.products);
  
    // Mapping function to map category names from categories array to Redux state property names
    const mapCategoryToState = (category) => {
      switch (category.toLowerCase()) {
        case 'table tops':
          return 'tableTops';
        case 'aroma candles':
          return 'aromaCandles';
        case 'wall hangings':
          return 'wallHangings';
        case 'metal planters':
          return 'metalPlanters';
        case 'floor standings':
          return 'floorStanding';
        default:
          return null;
      }
    };
  
    const handleCategoryPress = (category) => {
 
      const reduxPropertyName = mapCategoryToState(category);
      const categoryData = productState[reduxPropertyName];
   
      if (categoryData) {
        onSelectCategory(categoryData);
        onClose();
        navigation.navigate('ViewMorePage', { category: category, data: categoryData });
      }
    };
  
    return (
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => onClose()}
      >
        <TouchableWithoutFeedback onPress={() => onClose()}>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 10, width: '100%' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: "#496152" }}>Categories</Text>
                <Pressable onPress={() => onClose()}>
                  <MaterialCommunityIcons name="close" size={20} color="#496152" />
                </Pressable>
              </View>
              <FlatList
                data={categories}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => handleCategoryPress(item.name)}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                  >
                    <Image source={{ uri: item.image }} style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }} />
                    <Text style={{ color: "black", fontWeight: "600", fontSize: 12 }}>{item.name}</Text>
                    <MaterialCommunityIcons name="chevron-right" size={20} color="#496152" style={{ marginLeft: 'auto' }} />
                  </Pressable>
                )}
                ItemSeparatorComponent={Separator}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };
  
  export default CategoryModal;