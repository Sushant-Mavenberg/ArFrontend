import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Animated, Easing, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const IntroPage = () => {
  const navigation = useNavigation();
  const arrowPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startArrowAnimation();
  }, []);

  const handleSignInPress = () => {
    navigation.navigate('ChooseLogin');
  };

  const handleSkipPress = () => {
    navigation.navigate('main');
  };

  const startArrowAnimation = () => {
    Animated.loop(
      Animated.timing(arrowPosition, {
        toValue: 1,
        duration: 9000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start(() => {
      handleSkipPress();
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/bgg.jpg')} style={styles.backgroundImage} filter={{ brightness: 0.2 }}>
        <View style={styles.contentContainer}>
          <Text style={styles.introText}>The Best App{'\n'}for Your Plants</Text>
          <View style={styles.centeredContent}>
            <TouchableOpacity style={styles.createAccountButton} onPressIn={handleSignInPress}>
              <Text style={styles.createAccountButtonText}>Sign In</Text>
            </TouchableOpacity>
            <Text style={styles.createAccountText} onPress={() => navigation.navigate('Registration')}>
              Create Account
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.skipButtonContainer}>
        <TouchableOpacity onPressOut={handleSkipPress}>
          <Animated.View
            style={[
              styles.skipButton,
              {
                transform: [
                  {
                    translateX: arrowPosition.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 60],
                    }),
                  },
                ],
              },
            ]}
          >
            <Image source={require('../../assets/next.png')} style={styles.arrowImage} />
            <Image source={require('../../assets/next.png')} style={styles.arrowImage} />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  introText: {
    fontSize: 62,
    textAlign: 'left',
    fontFamily: 'AlumniSansInlineOne-Italic',
    color: 'white',
    marginLeft: 20,
    marginTop: 20,
    position: 'absolute',
    top: 90,
    left: 0,
  },
  centeredContent: {
    position: 'relative',
    top: 130,
    alignItems: 'center',
    width: "80%",
  },
  createAccountButton: {
    backgroundColor: '#496152',
    padding: 15,
    borderRadius: 30,
    width: '100%',
    marginBottom: 20,
  },
  createAccountButtonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: "Agbalumo-Regular",
  },
  createAccountText: {
    fontFamily: 'Agbalumo-Regular',
    color: 'white',
    fontSize: 20,
  },
  skipButtonContainer: {
    position: 'absolute',
    bottom: 50,
    right: 0,
    width:90,
    borderTopLeftRadius:35,
    borderBottomLeftRadius:35,
    backgroundColor:"black",
    borderColor:'white'
  },
  skipButton: {
    // backgroundColor: '#496152',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row'
  },
  arrowImage: {
    width: 40,
    height: 40,
  },
});

export default IntroPage;
