import React, { useState } from 'react';
import { Modal, Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const CustomAlert = ({ isVisible, message, onClose }) => {
  return (
    <Modal transparent visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.alertContainer}>
          <Text style={styles.alertMessage}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>OK</Text>
          </TouchableOpacity>
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
    backgroundColor: 'grey',
  },
  alertContainer: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius:4,
    width: '80%',
  },
  alertMessage: {
    fontSize: 23,
    textAlign: 'center',
    marginBottom: 20,
    color:"#496152",
    fontWeight:"bold"
  },
  closeButton: {
  
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight:"bold"
  },
});

export default CustomAlert;
