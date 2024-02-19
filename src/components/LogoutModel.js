import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const LogoutConfirmationModal = ({ isVisible, onClose, onSignOut }) => {
    
  return (
    <Modal transparent visible={isVisible} animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Wish to Sign Out</Text>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <FeatherIcon name="x" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.modalText}>
                You might miss out on deals and offers made just for you. Do you still want to sign out?
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.signOutButton]} onPress={onSignOut}>
                  <Text style={[styles.buttonText, { color: '#fff' }]}>Sign Out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 14,  // Updated font size for heading
    fontWeight: '600',
    marginBottom: 10,
    color:"black"
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalText: {
    fontSize: 12,  // Updated font size for text
    marginBottom: 20,
    color:"black"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#e3e3e3',
    marginRight: 10,
  },
  signOutButton: {
    backgroundColor: '#496152',
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 12,  // Updated font size for button text
    fontWeight: '600',
    color:"black"
  },
});

export default LogoutConfirmationModal;
