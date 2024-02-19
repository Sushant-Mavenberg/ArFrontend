import React, { useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Animated, ScrollView, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { setConnectionStatus, selectIsConnected } from '../Redux/NetworkReducer.js';

const { height } = Dimensions.get('window');

const NetworkStatusComponent = () => {
  const isConnected = useSelector(selectIsConnected);
  const dispatch = useDispatch();
  const translateY = new Animated.Value(0);

  useEffect(() => {
    const updateNetworkStatus = (state) => {
      dispatch(setConnectionStatus({ isConnected: state.isConnected }));
      if (!state.isConnected) {
        // Animate the text when the network is disconnected
        Animated.timing(translateY, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start();
      } else {
        // Animate the text back to the bottom when the network is connected
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    };

    const unsubscribe = NetInfo.addEventListener(updateNetworkStatus);

    return () => {
      unsubscribe();
    };
  }, [dispatch, translateY]);

  const handlePress = () => {
    // Implement any logic you want when the user presses the network status component
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {/* Rest of your content goes here */}
      </ScrollView>

      <Animated.View
        style={[
          styles.floatingContainer,
          {
            transform: [
              {
                translateY: translateY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, height - 40], // Adjust the value for the desired space above the bottom
                }),
              },
            ],
          },
        ]}
      >
        {!isConnected && (
          <TouchableOpacity activeOpacity={1} onPress={handlePress} style={styles.innerContainer}>
            <Icon name="wifi-off" size={20} color="white" style={styles.wifiIcon} />
            <Text style={styles.modalText}>You are offline. Please check your internet connection</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  floatingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1, // Ensure the component stays on top of other UI elements
  },
  innerContainer: {
    padding: 10,
    backgroundColor: 'black', // Background color for the modal
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wifiIcon: {
    marginRight: 5,
  },
  modalText: {
    color: 'white',
    fontSize: 12, // Small font size
  },
});

export default NetworkStatusComponent;
