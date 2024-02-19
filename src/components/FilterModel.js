import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Pressable,
} from 'react-native';

const FilterModal = ({ visible, onClose }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('Category');

  const filterOptions = {
    Category: ['Table Tops', 'Aroma Candles', 'Wall Hangings', 'Floor Standings', 'Metal Gardens'],
    'Price Range': [
      '₹100 & below',
      '₹100 - ₹200',
      '₹200 - ₹300',
      '₹300 - ₹500',
      '₹500 - ₹1000',
      '₹1000 & above',
    ],
  };

  useEffect(() => {
    // Set the initial filter to 'Category' when the modal opens
    setCurrentFilter('Category');
  }, [visible]);

  const toggleFilter = (filterTitle, option) => {
    const updatedFilters = [...selectedFilters];
    const index = updatedFilters.findIndex((filter) => filter.title === filterTitle);

    if (index !== -1) {
      const filter = updatedFilters[index];

      // If the current filter is "Price Range", select only one option
      if (filterTitle === 'Price Range') {
        filter.selectedOptions = [option];
      } else {
        const optionIndex = filter.selectedOptions.indexOf(option);

        if (optionIndex !== -1) {
          filter.selectedOptions.splice(optionIndex, 1);
        } else {
          filter.selectedOptions.push(option);
        }
      }

      if (filter.selectedOptions.length === 0) {
        updatedFilters.splice(index, 1);
      }
    } else {
      updatedFilters.push({ title: filterTitle, selectedOptions: [option] });
    }

    setSelectedFilters(updatedFilters);
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
  };

  const applyFilters = () => {
    const formattedFilters = {};
  
    selectedFilters.forEach((filter) => {
      formattedFilters[filter.title] = filter.selectedOptions;
    });
  
    console.log('Applied Filters:', formattedFilters);
    onClose();
  };
  

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={() => onClose()}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView style={styles.leftSide}>
            {Object.keys(filterOptions).map((filterTitle, index) => (
              <TouchableOpacity
                key={filterTitle}
                style={[
                  styles.filterTitleContainer,
                  {
                    backgroundColor: currentFilter === filterTitle ? '#f5f5f5' : 'transparent',
                  },
                ]}
                onPress={() => setCurrentFilter(filterTitle)}
              >
                <Text style={styles.filterTitle}>{filterTitle}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ScrollView style={styles.rightSide}>
            {filterOptions[currentFilter].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.filterOption,
                  {
                    backgroundColor:
                      selectedFilters.find((f) => f.title === currentFilter)?.selectedOptions.includes(option)
                        ? '#3498db'
                        : 'transparent',
                  },
                ]}
                onPress={() => toggleFilter(currentFilter, option)}
              >
                {currentFilter === 'Price Range' ? (
                  <View style={styles.radioButtonContainer}>
                    <View
                      style={[
                        styles.radioButton,
                        {
                          backgroundColor:
                            selectedFilters.find((f) => f.title === currentFilter)?.selectedOptions.includes(option)
                              ? '#fff'
                              : 'transparent',
                          borderColor:
                            selectedFilters.find((f) => f.title === currentFilter)?.selectedOptions.includes(option)
                              ? '#fff'
                              : '#ecf0f1',
                        },
                      ]}
                    />
                    <Text style={styles.filterOptionText}>{option}</Text>
                  </View>
                ) : (
                  <Text style={styles.filterOptionText}>{option}</Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Bottom bar with Clear All and Apply buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={clearAllFilters} style={[styles.button, styles.clearButton]}>
            <Text style={styles.buttonText}>Clear All</Text>
          </TouchableOpacity>
          <Pressable onPress={applyFilters} style={[styles.button, styles.applyButton]}>
            <Text style={styles.buttonText}>Apply</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)', // Completely transparent
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 400, // Fixed height in pixels
  },
  leftSide: {
    width: '0%',
    borderRightColor: '#ddd',
  },
  rightSide: {
    flex: 1,
  },
  filterTitleContainer: {
    padding: 10,
    borderBottomWidth: 0, // No borderBottom
    marginBottom: 10, // Add margin to create space after the filter title
  },
  filterTitle: {
    fontSize: 14,
    color: '#333',
  },
  filterOption: {
    padding: 8, // Adjust padding for space around filter options
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: 'white',
  },
  filterOptionText: {
    color: '#2c3e50',
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  button: {
    padding: 12,
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 8,
  },
  applyButton: {
    backgroundColor: '#2ecc71',
    marginLeft: 8,
  },
  buttonText: {
    color: '#000', // Black color for text
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
    backgroundColor: 'transparent', // Set the initial background color
    borderWidth: 1, // Add a border
    borderColor: '#3498db', // Set the border color
  },
});

export default FilterModal;
