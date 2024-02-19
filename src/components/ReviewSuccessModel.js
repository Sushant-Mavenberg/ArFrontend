// ReviewSuccessModal.js

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Rating } from 'react-native-elements';

const ReviewSuccessModal = ({ visible, onClose, productImage, userRating, name }) => {

  return (
    <Modal transparent={true} animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.headerContainer}>
            <Text style={styles.modalTitle}>Thank you for submitting the review!</Text>
            <Text style={styles.processingText}>Your review is being processed. This may take several days, so we appreciate your patience🥳</Text>
          </View>
          <View style={styles.productInfoContainer}>
            <Image source={{ uri: productImage }} style={styles.productImage} />
            <Text style={styles.nameText} numberOfLines={5}>{name}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.userReviewContainer}>
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 }}>Your Review</Text>
            <Rating startingValue={userRating} imageSize={20} readonly style={styles.userReviewRating} />
          </View>
          <Pressable style={styles.closeModalButton} onPress={onClose}>
            <Text style={styles.closeModalButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20, // Add padding around the modal
  },
  headerContainer: {
    backgroundColor: '#8FEC8F', // Light green background color for the header
    padding: 10, // Add padding to the background
    borderRadius: 10,
    marginBottom: 10,
  },
  productInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  nameText: {
    color: "black",
    flex: 1, // Allow the text to take as much space as needed
  },
  separator: {
    height: 1,
    backgroundColor: 'grey',
    marginVertical: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '95%', // Adjust the width as needed
  },
  modalTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "black",
  },
  processingText: {
    color: "black",
    marginBottom: 10,
  },
  userReviewContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  userReviewRating: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
  closeModalButton: {
    backgroundColor: '#496152',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '100%', // Ensure the button takes the full width
  },
  closeModalButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
});

export default ReviewSuccessModal;
