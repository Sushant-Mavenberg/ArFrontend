import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, StatusBar, Animated, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const navigateToNextScreen = () => {
    // Navigate directly to the 'main' screen
    navigation.replace('main');
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();

    const timeout = setTimeout(() => {
      navigateToNextScreen();
    }, 5000); // 4000 milliseconds (4 seconds)

    // Clear the timeout when the component is unmounted
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Image source={{ uri: "https://www.arphibo.com/assets/img/logo.png" }} style={styles.logo} />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 0, // Adjust for status bar height
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
