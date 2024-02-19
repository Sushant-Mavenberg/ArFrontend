import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ErrorScreen = ({ route }) => {
  const { errorMessage } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'black',
  },
});

export default ErrorScreen;
