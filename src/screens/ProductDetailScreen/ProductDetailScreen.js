import React, { useState, useRef, useEffect } from 'react';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  NativeModules,
  Share, Linking, Vibration, Pressable
} from 'react-native';
import { Rating } from 'react-native-ratings';
import { SliderBox } from 'react-native-image-slider-box';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Deliver from '../../components/HomePageComponents/ProductComponent/Deliver.js';
import ProductInformation from '../../components/HomePageComponents/ProductComponent/ProductInformation.js';
import RatingAndReview from '../../components/HomePageComponents/ProductComponent/RatingAndReview.js';
import GiveRating from '../../components/HomePageComponents/ProductComponent/GiveRating.js';
import CandleRequirementsBar from '../../components/HomePageComponents/ProductComponent/CandleRequirment.js';
import RequirementsBar from '../../components/HomePageComponents/ProductComponent/Requirement.js';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity } from '../../Redux/CartReducer.js';
import { addToFavorites, removeFromFavorites } from '../../Redux/FavouriteReducer.js';
import Product from '../../components/HomePageComponents/ProductComponent/Product.js';
import LoginModal from '../../components/RegisterComponent/LoginModel.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartNotification from '../../components/AddToCartNotifcation.js';
import QuantityPopup from '../../components/QuantityPop.js';
import CategoryModal from '../../components/CategoryModel.js';
import ARScene from '../ArScene/ArScene.js';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import Video from 'react-native-video';


const ProductDetailScreen = ({ route, navigation }) => {

 
  const fetchData = async () => {
    try {
      // Make API call to fetch data
      const response = await fetch('http://192.168.10.110:8000/api/products/images');
      const data = await response.json();
  
      // Log the API response
      console.log('AR Data Response:', data);
  
      // Extract necessary data from the API response
      const images = data.images; // Get the images array
      
      // Array to store objects with the first JPEG URL and GLB URL
      let imageData = [];
  
      images.forEach((imageSet, index) => {
        console.log(`Image Set ${index + 1}:`);
        console.log('GLB URL:', imageSet.glbUrl);
        console.log('JPEG URLs:', imageSet.jpegUrls); // Log the array directly
  
        const { jpegUrls, glbUrl } = imageSet;
  
        // Get the first JPEG URL
        const firstJpegUrl = jpegUrls[0];
        
        // Add an object with the first JPEG URL and GLB URL to the array
        imageData.push({ jpegUrl: firstJpegUrl, glbUrl: glbUrl });
      });
  
      // Pass the array of objects to the native module
      NativeModules.ARModule.startAR(imageData);
      console.log("Data passed to the Android", imageData);
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  
  const { product, type } = route.params;
  console.log('GLB url:... ', product.images.glbUrl)
  console.log('AR Condition: ', product.ar)
  console.log('Video url:', product.video)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const carouselData = product.images.jpegUrls.map((imageUrl) => ({
    type: 'image',
    url: imageUrl,
  }));

  if (product.video) {
    carouselData.push({
      type: 'video',
      url: product.video,
      controls: false,
    });
  }

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const favorites = useSelector((state) => state.favorite.favorites);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const cartCount = useSelector(state => state.cart.products.length);
  const productsInCart = useSelector((state) => state.cart.products);
  const [selectedItemImage, setSelectedItemImage] = useState('');
  const [modalQuantity, setModalQuantity] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isVideoModalVisible, setVideoModalVisible] = useState(false);

  const dispatch = useDispatch()
  const inCart = productsInCart.some((cartItem) => cartItem.id === product._id);
  const cartItem = productsInCart.find((cartItem) => cartItem.id === product._id);

  const categories = [
    { name: 'Table Tops', image: 'https://res.cloudinary.com/dlzcgycpi/image/upload/v1699253617/pld489-gr__10469.1639500378_mqjznb.jpg' },
    { name: 'Aroma Candles', image: 'https://res.cloudinary.com/dlzcgycpi/image/upload/v1700920787/aromatherapy-candle_dtcbz8.jpg' },
    { name: 'Wall Hangings', image: 'https://res.cloudinary.com/dlzcgycpi/image/upload/v1699253617/the-sill_hardy-houseplants-duo_hyde_mint_hzcevd.jpg' },
    { name: 'Metal Planters', image: 'https://res.cloudinary.com/dlzcgycpi/image/upload/v1699257920/DIY-Macrame-Plant-Hanger-Wall-Hanging-24.2_rpowkq.jpg' },
    { name: 'Floor Standings', image: 'https://res.cloudinary.com/dlzcgycpi/image/upload/v1699253617/pld489-gr__10469.1639500378_mqjznb.jpg' },
  ];
  const handleUpdateQuantity = (itemId, newQuantity) => {
    console.log(itemId, newQuantity, "vamsi")
    const quantityToUpdate = Math.max(newQuantity, 1); // Ensure quantity is not less than 1

    if (quantityToUpdate > 3) {
      setSelectedItemImage(product.images.jpegUrls[0]);
      setModalQuantity(3);
      setModalVisible(true);
      // ToastAndroid.show("You cannot add more than 3 items.", ToastAndroid.SHORT);
      return;
    }

    dispatch(updateQuantity({ id: itemId, quantity: quantityToUpdate }));
  };
  const handleFavoritePress = () => {
    // Check if the user is logged in before allowing them to favorite
    if (isLoggedIn) {
      if (isFavorited) {
        dispatch(removeFromFavorites({ id: product._id }));
      } else {
        dispatch(addToFavorites(product));
      }
      // Toggle the favorite status
      setIsFavorited((prevIsFavorited) => !prevIsFavorited);
    } else {
      // User is not logged in, open authentication modal
      setShowAuthModal(true);
    }
  };

  const handleARIconPress = () => {
  fetchData()
  };

  const toggleVideoModal = () => {
    setVideoModalVisible((prev) => !prev);
  };

  const handleVideoPlayerPress = () => {
    setVideoModalVisible((prev) => !prev);
    setIsVideoPlaying(!isVideoPlaying);

  };



  useEffect(() => {
    const handleDeepLink = async () => {
      // Check if the app was opened from a deep link
      const url = await Linking.getInitialURL();

      if (url) {
        // Parse the URL and extract the necessary information
        // Navigate to the appropriate screen based on the URL
        // Example: Extract productId from the URL and navigate to the product detail screen
        const productId = extractProductIdFromUrl(url);
        navigation.navigate('ProductDetail', { productId });
      }
    };

    handleDeepLink();
  }, [navigation]);

  useEffect(() => {
    // Check if the current product is in favorites
    const isProductInFavorites = favorites.some((item) => item._id === product._id);

    setIsFavorited(isProductInFavorites);
    checkLoginStatus();

  }, [favorites, product]);

  const checkLoginStatus = async () => {
    // Retrieve the user token from AsyncStorage or your authentication state
    // Replace 'userToken' with your actual AsyncStorage key for the user token
    const userToken = await AsyncStorage.getItem('token');

    const isLoggedIn = !!userToken; // Check if the user has a valid token

    setIsLoggedIn(isLoggedIn);
  };


  const closeAuthModal = async () => {
    // Close the authentication modal
    setShowAuthModal(false); const navigation = useNavigation();

    await checkLoginStatus();
  };


  const generateLink = async (id) => {
    try {
      const title = `Check out ${product.name}`;
      const imageUrl = product.images.jpegUrls[0];
      const description = `Discover more about ${product.name}. Only ₹${product.finalPrice}.`;

      const link = await dynamicLinks().buildShortLink({
        link: `https://arphibo.page.link/RtQw?productId=${id}`,
        domainUriPrefix: 'https://arphibo.page.link',
        android: {
          packageName: 'com.arproject1',
        },
        social: {
          title,
          description,
          imageUrl,
        },
      }, dynamicLinks.ShortLinkType.DEFAULT);

      console.log(link);
      return link;
    } catch (error) {
      console.error(error);
    }
  };

  const shareProduct = async (id, name, image) => {
    console.log(`sha "${id}`)
    const link = await generateLink(id, name, image);
    try {
      Share.share({
        message: link
      })
    } catch (error) {
      console.log(error)
    }
  }
  const AddToCartPress = (product) => {
    dispatch(addToCart({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.finalPrice,
      actualPrice: product.actualPrice,
      image: product.images.jpegUrls[0],
      quantity: 1,
    }));

    // Show the notification
    setNotificationVisible(true);
    Vibration.vibrate(200);
  };

  const windowWidth = Dimensions.get('window').width;
  const paddingHorizontal = windowWidth * 0.05; // Adjust the multiplier as needed

  const renderCarouselItem = ({ item }) => {
    return (
      <>
        {item.type === 'image' && (
          <Image
            source={{ uri: item.url }}
            style={{
              width: '100%',
              height: 300,
              borderRadius: 15,
              marginTop: 5,
            }}
          />
        )}
        {item.type === 'video' && (
          <Video
            source={{ uri: item.url }}
            style={{
              width: '100%',
              height: 300,
              borderRadius: 15,
              marginTop: 5,
            }}
            controls={item.controls}
            paused={false} // Adjust as needed
          />
        )}
      </>
    );
  };



  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingHorizontal }]}
      >
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.subDescription}>{product.description}</Text>

        <View style={styles.ratingContainer}>
          <Rating startingValue={product.averageRating} imageSize={20} readonly />
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={isFavorited ? 'heart' : 'heart-outline'}
              size={20}
              onPress={handleFavoritePress}
              style={styles.icon}
              color="black"
            />
            <MaterialCommunityIcons onPress={() => shareProduct(product._id, product.name, product.images.jpegUrls[0])} name="share-variant" size={20} style={styles.icon} color="black" />
          </View>
        </View>

        <View style={styles.sliderContainer}>
          <Carousel
            data={carouselData}
            sliderWidth={windowWidth - 2 * paddingHorizontal}
            itemWidth={windowWidth - 2 * paddingHorizontal}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
            loop
            autoplay={false}
            enableMomentum={false}
            onSnapToItem={(index) => setActiveSlide(index)}
            renderItem={renderCarouselItem}
            paginationStyle={styles.pagination} // Add this line to specify the pagination style
            dotStyle={styles.dot} // Add this line to specify the dot style
            inactiveDotStyle={styles.inactiveDot} // Add this line to specify the inactive dot style
            activeDotIndex={activeSlide} // Add this line to specify the active dot index
          />

          {/* AR part - Conditionally render only if 'ar' is true */}
          {product.ar && (
            <Pressable
              style={styles.arIconContainer}
              onPress={handleARIconPress}
            >
              <View style={styles.arBackground}>
                <Image
                  source={require('../../assets/augmented-reality.png')}
                  style={styles.arImage}
                />
              </View>
            </Pressable>
          )}

          {/* Video player button
          {product.video && (
            <Pressable
              style={styles.videoIconContainer}
              onPress={handleVideoPlayerPress}
            >
              <View style={styles.videoBackground}>
                <Image
                  source={require('../../assets/play-button.png')}
                  style={styles.videoImage}
                />
              </View>
            </Pressable>
          )} */}


        </View>
        <View style={styles.rowContainer}>
          <View style={styles.costContainer}>
            <View style={{ flexDirection: "row", gap: 10, alignItems: "center", marginBottom: 6 }}>
              <Text style={styles.costText}>₹{product.finalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
              <Text style={{
                color: "white",
                backgroundColor: "#496152",
                padding: 5,
                fontSize: 10,
                fontWeight: "600",
                borderRadius: 3
              }}>
                {`${product.discountPercentage}% off`}
              </Text>
            </View>

            <Text style={styles.mrpText}>
              M.R.P: <Text style={styles.strikethroughText}>₹{product.actualPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text> (Incl. of all taxes)
            </Text>

          </View>
        </View>


        {type === 'aroma-candle' ? <CandleRequirementsBar requirements={product.requirements} /> : <RequirementsBar requirements={product.requirements} />}

        <Deliver features={product.features} />

        <View style={styles.separator} />

        <ProductInformation product={product} />

        <View style={styles.separator} />

        <RatingAndReview averageRating={product.averageRating} starPercentages={product.starPercentages} />

        <GiveRating id={product._id} image={product.images.jpegUrls[0]} name={product.name} />


      </ScrollView>

      {/* Add to Cart button */}


      {inCart ? (<View style={styles.quantityContainer}>
        <View>
          <Text style={{ color: "#00000080", fontWeight: "400", fontSize: 12, marginBottom: 3 }}>Explore More!</Text>
          <Pressable onPress={() => setCategoryModalVisible(true)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
              <Text style={{ color: '#496152', fontWeight: '600' }}>View Categories</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#496152" />
            </View>
          </Pressable>


        </View>
        <View style={styles.quantityContainerChild}>
          <View style={styles.buttonView}>
            <Pressable style={styles.quantityIconContainer} onPress={() => handleUpdateQuantity(product._id, cartItem.quantity - 1)}>
              <MaterialCommunityIcons name="minus" style={styles.quantityIcon} />
            </Pressable>
          </View>

          <Text style={styles.quantityText}>{cartItem.quantity}</Text>
          <View style={styles.buttonView}>
            <Pressable style={styles.quantityIconContainer} onPress={() => handleUpdateQuantity(product._id, cartItem.quantity + 1)}>
              <MaterialCommunityIcons name="plus" style={styles.quantityIcon} />
            </Pressable>
          </View>

        </View>

      </View>) : (
        <Pressable
          style={styles.addToCartButton}
          onPress={() => AddToCartPress(product)}
        >
          <View style={styles.addToCartTouchable}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </View>
        </Pressable>

      )}


      {/* <CartNotification
          visible={notificationVisible}
          onClose={() => setNotificationVisible(false)}
          onViewCart={() => {
            setNotificationVisible(false);
            navigation.navigate('Cart');
          }}
          itemCount={cartCount} // Adjust the item count as needed
          totalAmount={(product.finalPrice)} // Assuming the notification shows the total amount
        /> */}
      <LoginModal visible={showAuthModal} onClose={closeAuthModal} />
      <QuantityPopup
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        selectedItemImage={selectedItemImage}
        modalQuantity={modalQuantity}
      />
      <CategoryModal
        isVisible={isCategoryModalVisible}
        categories={categories} // Replace with your actual array of categories
        onClose={() => setCategoryModalVisible(false)}
        onSelectCategory={(category) => {
          // Handle the selected category
          console.log('Selected Category:', category);
        }}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 80,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
    fontFamily: 'sans-serif',
  },
  subDescription: {
    fontSize: 12,
    marginBottom: 12,
    color: 'black',
    fontFamily: 'sans-serif',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  quantityIconContainer: {
    borderColor: "green",
    padding: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 300,
  },
  costContainer: {
    alignItems: 'flex-start',
    marginTop: 20,
  },
  quantityContainer: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    zIndex: 1,
    borderTopColor: "#00000080",
    borderWidth: 0.3

  },
  buttonView: {
    backgroundColor: "#496152",

    padding: 5,
    borderRadius: 60,

  },
  quantityContainerChild: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  quantityIcon: {
    color: 'white',
    fontSize: 18,
    paddingHorizontal: 10,
  },
  quantityText: {
    color: 'black',
    fontSize: 14,
    paddingHorizontal: 10,
    fontWeight: "600"
  },
  costText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  strikethroughText: {
    fontSize: 12,
    color: 'grey',
    textDecorationLine: 'line-through',
    fontWeight: "600"
  },
  mrpText: {
    fontSize: 12,
    color: 'grey',
    fontWeight: "600"
  },
  arImage: {
    width: 35, // Adjust the width as needed
    height: 35, // Adjust the height as needed
    justifyContent: 'flex-start',
    alignContent: 'flex-start'
  },
  arIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  arBackground: {
    backgroundColor: 'rgba(300, 300, 300, 1)', // Adjust the opacity as needed
    borderRadius: 15,
    padding: 5,
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginTop: 20,
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Adjust as needed
    marginTop: 20, // Add margin if necessary
    marginBottom: 15
  },
  addToCartButton: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    right: 0,
    backgroundColor: '#496152',
    paddingVertical: 15,
    alignItems: 'center',
    zIndex: 1,
    // Ensure the button is above other views
  },
  addToCartTouchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Take up the full width
  },
  addToCartText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },

  pagination: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#496152', // Active dot color
    marginHorizontal: 4,
  },
  inactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'gray', // Inactive dot color
    marginHorizontal: 4,
  },


});

export default ProductDetailScreen;