import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChooseLogin = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.imageContainer}>
        {/* Image for the top 60% of the screen */}
        <Image source={require('../../assets/YOGA.jpg')} style={styles.image} />
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.welcome}>Welcome Back!</Text>
        <Text style={styles.nonbuttonText}>Choose Login Method</Text>
        <View style={styles.touchContainer}>
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate('EmailLogin');
            }}
          >
            <Text style={styles.buttonText}>Login via Email</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate('SignIn');
            }}
          >
            <Text style={styles.buttonText}>Login via Phone Number</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    flex: 5, // 60% of the screen
    marginTop: -StatusBar.currentHeight, // Adjust for the status bar
  },
  nonbuttonText: {
    fontSize: 20,
    color: 'black',
  },
  welcome: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: '100%', // Change the height to cover the entire container
    resizeMode: 'cover',
  },
  cardContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '48%', // 40% of the screen
  },
  circle: {
    backgroundColor: '#496152',
    width: 60,
    height: 60,
    borderRadius: 35,
    position: 'absolute',
    top: -20,
    right: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowImage: {
    width: 30,
    height: 40,
  },
  touchContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#496152',
    borderRadius: 30,
    padding: 15,
    marginVertical: 13,
  },
  buttonText: {
    fontSize: 16, fontWeight: '500', color: '#fff', textAlign: 'center'
  },
});

export default ChooseLogin;
