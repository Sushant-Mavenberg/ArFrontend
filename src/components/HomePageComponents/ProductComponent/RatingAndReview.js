import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Rating } from 'react-native-elements';

const RatingAndReview = ({ averageRating, starPercentages }) => {
  console.log(averageRating,starPercentages)
  const isTablet = Dimensions.get('window').width >= 600;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Rating & Review</Text>
      <View style={isTablet ? styles.tabletSectionsContainer : styles.sectionsContainer}>
        {/* Left Section: Rating Value and Stars */}
        <View style={isTablet ? styles.tabletLeftSection : styles.leftSection}>
          <Text style={styles.ratingValue}>{averageRating.toFixed(1)}</Text>
          <Rating startingValue={averageRating} imageSize={20} readonly />
        </View>

        {/* Add space between left and right sections */}
        <View style={styles.sectionSpacer} />

        {/* Right Section: Bar Chart for Each Star */}
        <View style={isTablet ? styles.tabletRightSection : styles.rightSection}>
          <BarChart
            data={{
              labels: Array.from({ length: 5 }, (_, i) => `${i + 1} Star`),
              datasets: [
                {
                  data: starPercentages,
                },
              ],
            }}
            width={isTablet ? 300 : 350}
            height={200}
            yAxisSuffix="%"
            fromZero
            chartConfig={{
              backgroundColor: '#FFF',
              backgroundGradientFrom: '#FFF',
              backgroundGradientTo: '#FFF',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 150, 136, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={{ marginVertical: 8, borderRadius: 16 }}
          />
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {

    flexDirection: 'column',
  },
  heading: {
    fontSize: 14,   
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  sectionsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap:10
  },
  tabletSectionsContainer: {
    flexDirection: 'column',
  },
  leftSection: {
    alignItems: 'center',
  },
  tabletLeftSection: {
    flex: 0.5,
    alignItems: 'center',
  },
  starIcons: {
    flexDirection: 'row',
  },
  ratingValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  starIcon: {
    width: 18,
    height: 18,
  },
  sectionSpacer: {
    width: 20,
  },
  rightSection: {
    flex: 1,
    flexDirection: 'column',
  },
  tabletRightSection: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default RatingAndReview;
