import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, Image, StyleSheet, Modal, Pressable, Text, Animated, Easing } from 'react-native';
import FilterScreen from "../../screens/filterScreen/filterScreen";
import { useNavigation } from '@react-navigation/native';

const SearchInput = ({ onSearchActivate, onChangeText, value }) => {
  const [searchValue, setSearchValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [isPlaceholderVisible, setPlaceholderVisibility] = useState(true);
  const categories = ['Table tops', 'Wall hangings', 'Aroma candles', 'Floor standings', 'Metal planters'];
  const translateY = new Animated.Value(0);
  const navigation = useNavigation();

  const inputRef = useCallback((node) => {
    if (node !== null) {
      inputRef.current = node;
    }
  }, []);

  const handleInputChange = (text) => {
    setSearchValue(text);

    if (onChangeText) {
      onChangeText(text);
    }
  };

  const handleInputFocus = () => {
    inputRef.current.blur();

    setTimeout(() => {
      navigation.navigate('MainSearchComponent');
    }, 100);
  };

  const handleInputBlur = () => {
    if (searchValue.length === 0) {
      setPlaceholderVisibility(true);
      handleFocus('unfocused');
    }
  };

  const handleFocus = (value) => {
    if (onSearchActivate) {
      onSearchActivate(value);
    }
  };

  const handleDonePress = () => {
    if (searchValue.length > 0) {
      handleFocus('focused');
    } else {
      handleFocus('unfocused');
    }
  };

  const openFilterModal = () => {
    setModalVisible(true);
  };

  const closeFilterModal = () => {
    setModalVisible(false);
  };

  const changeCategory = () => {
    const nextIndex = (currentCategoryIndex + 1) % categories.length;

    translateY.setValue(3);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start(() => {
      setCurrentCategoryIndex(nextIndex);
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      changeCategory();
    }, 2000); // Change category every 2 seconds

    return () => clearInterval(intervalId);
  }, [currentCategoryIndex]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Image source={require('../../assets/search.png')} style={styles.searchIcon} />
        <View style={styles.textInputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder={
              isPlaceholderVisible
                ? `Search "${categories[currentCategoryIndex]}"`
                : ' '
            }
            placeholderTextColor="black"
            onChangeText={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onSubmitEditing={handleDonePress}
            returnKeyType="done"
            value={searchValue}
            keyboardShouldPersistTaps="handled"  // This line prevents the keyboard from showing
          />
        </View>
      </View>

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeFilterModal}
      >
        <FilterScreen applyFilters={(filters) => console.log('Applied filters:', filters)} />
        <Pressable style={styles.modalCloseButton} onPress={closeFilterModal}>
          <Text style={{ color: 'white' }}>Close</Text>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginHorizontal: 16,
    marginBottom: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    elevation: 5,
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginRight: 9,
    marginLeft: 9,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: 'black',
    padding: 0,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
});

export default SearchInput;
