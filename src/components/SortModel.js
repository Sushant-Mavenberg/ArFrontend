import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const SortModal = ({ visible, onClose,onPress }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSortOptionPress = (option) => {
    setSelectedOption(option);
    onPress(option);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.sortContainer}>
          <View style={styles.header}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Sort</Text>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <MaterialCommunityIcons name="close" style={styles.closeIcon} />
            </Pressable>
          </View>
          {['Latest', 'Price: High to Low', 'Price: Low to High'].map((option) => (
            <Pressable
              key={option}
              style={styles.sortTextContainer}
              onPress={() => handleSortOptionPress(option)}
            >
              <View style={styles.radioButton}>
                {selectedOption === option && <View style={styles.selectedIndicator} />}
              </View>
              <Text style={styles.sortText}>{option}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)', // Completely transparent
  },
  sortContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    marginTop: 'auto', // Make the modal open from the bottom
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
  },
  sortText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  closeButton: {
    alignItems: 'center',
    padding: 16,
  },
  closeIcon: {
    fontSize: 24,
    color: 'black',
  },
  sortTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  sortText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
    marginLeft: 8,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'blue',
  },
});

export default SortModal;
