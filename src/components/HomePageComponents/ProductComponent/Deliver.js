import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FeaturesDetails = ({ features }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Features & Details</Text>
     
      <View style={styles.listContainer}>
        {features.map((feature, index) => (
          <View key={index} style={styles.listItemContainer}>
            <Text style={styles.listItemBullet}>•</Text>
            <Text style={styles.listItemText}>{feature}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
 
  heading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'black',
    fontFamily: 'sans-serif',
  },
  listContainer: {},
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  listItemBullet: {
    fontSize: 12,
    marginRight: 5,
    color: 'black',
    fontFamily: 'sans-serif',
  },
  listItemText: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'sans-serif',
  },
});

export default FeaturesDetails;
