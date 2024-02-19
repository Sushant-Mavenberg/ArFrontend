import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable, ToastAndroid } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating } from 'react-native-elements';
import LoginModal from '../../RegisterComponent/LoginModel';
import ReviewSuccessModal from '../../ReviewSuccessModel';

const GiveRating = ({ id,image,name}) => {
  console.log(name,name)
  const [userRating, setUserRating] = useState(0);
  const [userReviewDate, setUserReviewDate] = useState(null);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [reviewSuccessModalVisible, setReviewSuccessModalVisible] = useState(false);
  useEffect(() => {
    // Fetch the user's rating information
    fetchUserRating();
  }, []);
  console.log(userReviewDate)
  const fetchUserRating = async () => {
   
    try {
      // Retrieve the token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      console.log(id,id)
      const response = await axios.get(
        `http://192.168.10.110:8000/api/reviews/${id}/fetch-user-rating`,
       
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    console.log(response.data)
      if (response.data.success === 'true') {
        setUserRating(response.data.rating || 0);
        setUserReviewDate(response.data.date || null);
      } else {
        // Handle the case where fetching user rating information was not successful
        console.log('Failed to fetch user rating:', response.data.message);
      }
    } catch (error) {
      // Handle errors related to the Axios call
      console.log('Error fetching user rating:', error.message);
    }
  };

  const handleStarPress = (starIndex) => {
    setUserRating(starIndex);
  };

  const showAndroidToast = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const handleWriteReview = async () => {
    console.log("handle")
    try {
      // Check if the user has a token (logged in)
      const token = await AsyncStorage.getItem('token');
      console.log(token,"token")
      if (token) {
        // Token is present, proceed with the review
        if (userRating === 0) {
          showAndroidToast('Please select a rating before writing a review');
          return;
        }
    
        // Make an Axios call to post a review with the token in the headers
        const response = await axios.post(
          `http://192.168.110.94:8000/api/reviews/post`,
          { rating: userRating, comment: '',productId:id },
          { headers: { Authorization: `Bearer ${token}`}}
        );
  
        if (response.data.success === 'true') {
          console.log("true vamsi")
          setReviewSuccessModalVisible(true);
         fetchUserRating()
       
        } else {
          showAndroidToast(`Failed to post review: ${response.data.message}`);
          console.log('Failed to post review:', response.data.message);
        }
      } else {
        // Token is not present, show the login modal
        setLoginModalVisible(true);
      }
    } catch (error) {
      showAndroidToast(`Error posting review: ${error.message}`);
      console.log('Error posting review:', error.message);
    }
  };

  const renderStarIcons = () => {
    const starIcons = [];
    const totalStars = 5;

    for (let i = 1; i <= totalStars; i++) {
      const isFilled = i <= userRating;
      const starSource = isFilled
        ? require('../../../assets/star.png')
        : require('../../../assets/starunfilled.png');

      starIcons.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleStarPress(i)}
          activeOpacity={0.7}
        >
          <Image source={starSource} style={styles.starIcon} />
        </TouchableOpacity>
      );
    }

    return starIcons;
  };

  return (
    <View style={styles.container}>
      {userReviewDate ? (
        <View>
          <Text style={styles.ratingText}>My Review</Text>
          <View style={styles.userReviewContainer}>
          <Rating
  startingValue={userRating}
  imageSize={20}
  readonly
  style={styles.userReviewRating}
/>
            <Text style={styles.postedDate}>{`Posted On ${userReviewDate}`}</Text>
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.ratingText}>Review this product</Text>
          <View style={styles.starsContainer}>{renderStarIcons()}</View>
          <Text style={styles.reviewText}>Share your opinion</Text>
          <Text style={styles.informedDecisionText}>
            Help others make an informed decision!
          </Text>
          <Pressable style={styles.writeReviewButton} onPress={handleWriteReview}>
            <Text style={styles.writeReviewButtonText}>Write a Review</Text>
          </Pressable>
        </View>
      )}
         <LoginModal visible={loginModalVisible} onClose={() => setLoginModalVisible(false)} />
         <ReviewSuccessModal
        visible={reviewSuccessModalVisible}
        onClose={() => setReviewSuccessModalVisible(false)}
        productImage={image}
        userRating={userRating}
        name={name}
      />
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'sans-serif',
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  starIcon: {
    width: 32,
    height: 32,
    marginRight: 5,
    tintColor: '#496152',
  },
  reviewText: {
    fontSize: 12,
    color: 'black',
    marginTop: 10,
    fontFamily: 'sans-serif',
  },
  informedDecisionText: {
    fontSize: 14,
    color: 'black',
    marginBottom: 20,
  },
  writeReviewButton: {
    backgroundColor: '#496152',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  writeReviewButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  userReviewContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  userReviewRating: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
  userName: {
    fontSize: 12,
    color: 'black',
    marginTop: 5,
    fontFamily: 'sans-serif',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
    marginBottom: 15,
    fontFamily: 'sans-serif',
  },
  postedDate: {
    fontSize: 12,
    color: 'black',
    marginTop: 2,
    fontFamily: 'sans-serif',
  },
});

export default GiveRating;
