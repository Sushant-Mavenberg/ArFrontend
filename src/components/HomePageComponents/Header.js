import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const GradientHeader = ({ navigation, text, onBackPress}) => {
  const handleBackPress = onBackPress || (() => navigation.goBack());
  return (
    <LinearGradient
      colors={['#496152', '#496152']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        flexDirection: 'row',
        paddingTop: 45,
        paddingBottom: 10,
        paddingHorizontal: 16,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      
      <Pressable onPress={handleBackPress}>
        <MaterialCommunityIcons
          name="chevron-left"
          style={{
            fontSize: 30,
            color: 'white',
            borderRadius: 12,
          }}
        />
      </Pressable>
      <Text
        style={{
          fontSize: 16,
          color: 'white',
          marginLeft: 5,
          fontWeight: '600',
          textShadowColor: 'rgba(0, 0, 0, 0.5)',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 3,
        }}
      >
        {text}
      </Text>
    </LinearGradient>
  );
};

export default GradientHeader;
