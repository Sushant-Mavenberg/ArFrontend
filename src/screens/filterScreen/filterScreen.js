import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import StarRating from 'react-native-star-rating';

const CustomCheckbox = ({ value, onChange, label }) => {
  return (
    <Pressable onPress={onChange} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, value && styles.checked]}>
        {value && <View style={styles.checkIcon} />}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </Pressable>
  );
};

const FilterScreen = ({ applyFilters }) => {
  const [categories, setCategories] = useState({
    indoor: false,
    outdoor: false,
    flowering: false,
    succulent: false,
  });

  const [priceRange, setPriceRange] = useState([0, 100]);
  const [ratingRange, setRatingRange] = useState([0, 5]);

  const handleApplyFilters = () => {
    // You can send the selected filters to the parent component or make an API call here
    const filters = {
      priceRange,
      ratingRange,
      categories: Object.keys(categories).filter((category) => categories[category]),
    };

    // Example: Log the applied filters
    console.log('Applied Filters:', filters);

    // If you want to send filters to the parent component, use applyFilters prop
    if (applyFilters) {
      applyFilters(filters);
    }
  };

  const handleCategoryToggle = (category) => {
    setCategories((prevCategories) => ({
      ...prevCategories,
      [category]: !prevCategories[category],
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Options</Text>

      <View style={styles.filterSection}>
        <Text style={styles.label}>Price Range</Text>
        <MultiSlider
          values={priceRange}
          sliderLength={300}
          onValuesChange={(values) => setPriceRange(values)}
          min={0}
          max={100}
          step={1}
          allowOverlap
          snapped
        />
        <Text style={styles.value}>Min Price: {priceRange[0].toFixed(2)}</Text>
        <Text style={styles.value}>Max Price: {priceRange[1].toFixed(2)}</Text>
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.label}>Rating Range</Text>
        <MultiSlider
          values={ratingRange}
          sliderLength={300}
          onValuesChange={(values) => setRatingRange(values)}
          min={0}
          max={5}
          step={0.1}
          allowOverlap
          snapped
        />
        <View style={styles.starRatingContainer}>
          <Text style={styles.value}>Min Rating: {ratingRange[0].toFixed(1)}</Text>
          <StarRating
            disabled
            maxStars={5}
            rating={ratingRange[0]}
            starSize={20}
            fullStarColor="#FFD700"
          />
        </View>
        <View style={styles.starRatingContainer}>
          <Text style={styles.value}>Max Rating: {ratingRange[1].toFixed(1)}</Text>
          <StarRating
            disabled
            maxStars={5}
            rating={ratingRange[1]}
            starSize={20}
            fullStarColor="#FFD700"
          />
        </View>
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.label}>Categories</Text>
        <View style={styles.checkboxContainer}>
          {Object.keys(categories).map((category) => (
            <CustomCheckbox
              key={category}
              value={categories[category]}
              onChange={() => handleCategoryToggle(category)}
              label={category}
            />
          ))}
        </View>
      </View>

      <Pressable style={styles.applyButton} onPress={handleApplyFilters}>
        <Text style={styles.applyButtonText}>Apply Filters</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  filterSection: {
    marginBottom: 20,
  },
  label: {
    color: 'black',
    marginBottom: 10,
    fontSize:16,
    
  },
  value: {
    color: 'black',
    marginBottom:5
  },
  applyButton: {
    backgroundColor: '#008397',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight:10,
    marginBottom:20
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 20,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#008397',
  },
  checkIcon: {
    width: 10,
    height: 10,
    backgroundColor: 'white',
  },
  checkboxLabel: {
    color: 'black',
  },
  starRatingContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom:5
  },
});

export default FilterScreen;
