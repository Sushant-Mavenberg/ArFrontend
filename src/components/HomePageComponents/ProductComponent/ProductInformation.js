import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductInformation = ({ product }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Product Information</Text>
      <Text style={styles.sectionHeading}>GENERAL INFORMATION</Text>
      <Text style={styles.infoText}>
        <Text style={styles.infoVariable}>Brand:</Text> {product?.brand || 'N/A'}
      </Text>
      <Text style={styles.infoText}>
        <Text style={styles.infoVariable}>Manufacturer:</Text> {product?.manufacturer || 'N/A'}
      </Text>
      <Text style={styles.infoText}>
        <Text style={styles.infoVariable}>Manufacturer Address:</Text> {product?.manufacturerAddress || 'N/A'}
      </Text>
      {showMore && (
        <>
          <Text style={styles.infoText}>
            <Text style={styles.infoVariable}>Manufacturer Email:</Text> {product?.manufacturerEmail || 'N/A'}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoVariable}>Sold By:</Text> {product?.soldBy || 'N/A'}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoVariable}>Arphibo Customer Care Email:</Text>{' '}
            {product?.jioMartCustomerCareEmail || 'N/A'}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoVariable}>Arphibo Customer Care Phone:</Text>{' '}
            {product?.jioMartCustomerCarePhone || 'N/A'}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoVariable}>Included Components:</Text>{' '}
            {product?.includedComponents || 'N/A'}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoVariable}>Country of Origin:</Text>{' '}
            {product?.countryOfOrigin || 'N/A'}
          </Text>
        </>
      )}

      <Text style={styles.sectionHeading}>PRODUCT DETAILS</Text>
      <Text style={styles.infoText}>
        <Text style={styles.infoVariable}>Product Type:</Text> {product?.productType || 'N/A'}
      </Text>
      <Text style={styles.infoText}>
        <Text style={styles.infoVariable}>Color:</Text> {product?.color || 'N/A'}
      </Text>
      <Text style={styles.infoText}>
        <Text style={styles.infoVariable}>Material:</Text> {product?.material || 'N/A'}
      </Text>
      <Text style={styles.infoText}>
        <Text style={styles.infoVariable}>Hazardous Material:</Text>{' '}
        {product?.hazardousMaterial || 'N/A'}
      </Text>

      <Text style={styles.sectionHeading}>USAGE DETAILS</Text>
      <Text style={styles.infoText}>
        <Text style={styles.infoVariable}>Transportation:</Text>{' '}
        {product?.transportation || 'N/A'}
      </Text>
      <Text style={styles.infoText}>
        <Text style={styles.infoVariable}>Age Of The Plant (Year):</Text>{' '}
        {product?.ageOfThePlant || 'N/A'}
      </Text>
      <Text style={styles.infoText}>
        <Text style={styles.infoVariable}>Organic:</Text> {product?.organic || 'N/A'}
      </Text>
      <Text style={styles.infoText}>
        <Text style={styles.infoVariable}>Net Quantity:</Text>{' '}
        {product?.netQuantity || 'N/A'}
      </Text>

      <Text style={styles.sectionHeading}>ITEM DIMENSIONS</Text>
      <Text style={styles.infoText}>
        <Text style={styles.infoVariable}>Height:</Text>{' '}
        {product?.itemDimensions?.height || 'N/A'}
      </Text>
      <Text style={styles.infoText}>
        <Text style={styles.infoVariable}>Length:</Text>{' '}
        {product?.itemDimensions?.length || 'N/A'}
      </Text>
      <Text style={styles.infoText}>
        <Text style={styles.infoVariable}>Width:</Text>{' '}
        {product?.itemDimensions?.width || 'N/A'}
      </Text>
      <Text style={styles.infoText}>
        <Text style={styles.infoVariable}>Net Weight:</Text>{' '}
        {product?.itemDimensions?.netWeight || 'N/A'}
      </Text>
      <Text style={styles.infoText}>
        <Text style={styles.infoVariable}>Volume:</Text>{' '}
        {product?.itemDimensions?.volume || 'N/A'}
      </Text>
      <Text style={styles.infoText}>
        <Text style={styles.infoVariable}>Depth:</Text>{' '}
        {product?.itemDimensions?.depth || 'N/A'}
      </Text>

      <Text style={styles.moreLessButton} onPress={toggleShowMore}>
        {showMore ? 'Less Details' : 'More Details'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
 
  heading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
    color: 'black',
    fontFamily: 'sans-serif',
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#C78F5F',
    fontFamily: 'sans-serif',
  },
  infoText: {
    color: 'black',
    fontSize: 12,
    marginVertical: 5,
    fontFamily: 'sans-serif',
  },
  infoVariable: {
    fontWeight: '500',
  },
  moreLessButton: {
    color: '#496152',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'sans-serif',
  },
});

export default ProductInformation;
