import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Pressable } from 'react-native';
import SwiperComponent from '../../components/SwiperComponent/SwiperComponent.js';
import Modal from 'react-native-modal';
import Deliver from '../../components/HomePageComponents/ProductComponent/Deliver.js';
import ProductInformation from '../../components/HomePageComponents/ProductComponent/ProductInformation.js';
import RatingAndReview from '../../components/HomePageComponents/ProductComponent/RatingAndReview.js';
import GiveRating from '../../components/HomePageComponents/ProductComponent/GiveRating.js';
import RequirementsBar from '../../components/HomePageComponents/ProductComponent/Requirement.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CartNotification from '../../components/AddToCartNotifcation.js';
import { useNavigation } from '@react-navigation/native';
import CandleRequirementsBar from '../../components/HomePageComponents/ProductComponent/CandleRequirment.js';
const ProductOverview = ({ route }) => {
    const [cartNotificationVisible, setCartNotificationVisible] = useState(false);
    const { product, type } = route.params;

    const [isModalVisible, setModalVisible] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false); // State for favorite status

    // Function to handle favorite toggle
    const handleFavoriteToggle = () => {
        setIsFavorite(!isFavorite); // Toggle favorite status
    };
    const handleAddToCart = () => {

        setCartNotificationVisible(true);

        // Optionally, you can close the notification after a delay
        setTimeout(() => {
            setCartNotificationVisible(false);
        }, 5000); // Adjust the delay as needed
    };
    const handleViewCart = () => {
        // Navigate to the "MyCart" screen
        navigation.navigate('MyCart');
    };
    const navigation = useNavigation()
    return (
        <View style={{
            flex: 1,
            backgroundColor: "#FFF",


        }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{
                    flexDirection: "row",
                    width: "100%",

                    height: 650

                }}>
                    <View style={{ width: "20%", paddingLeft: 20 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image
                                source={require('../../assets/back-arrow.png')}
                                style={{
                                    marginVertical: 40, height: 20,
                                    width: 20,
                                    tintColor: "green"
                                }}
                            />
                        </TouchableOpacity>



                        <View style={{
                            backgroundColor: "#FFF",
                            height: 50,
                            width: 50,
                            borderRadius: 5,
                            elevation: 5,
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 50
                        }}>
                            <Image
                                source={require('../../assets/augmented-reality.png')}
                                style={{
                                    height: 30,
                                    width: 30,
                                }}
                            />
                        </View>

                        <View style={{
                            backgroundColor: "#FFF",
                            height: 50,
                            width: 50,
                            borderRadius: 5,
                            elevation: 5,
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 50
                        }}>
                            <Pressable onPress={handleFavoriteToggle}>
                                <Icon
                                    name={isFavorite ? 'heart' : 'heart-outline'}
                                    size={30}
                                    color={isFavorite ? 'red' : 'green'}
                                />
                            </Pressable>
                        </View>
                        <View style={{
                            backgroundColor: "#FFF",
                            height: 50,
                            width: 50,
                            borderRadius: 5,
                            elevation: 5,
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 50
                        }}>
                            <Pressable onPress={() => { navigation.navigate('MyCart') }}>
                                <Icon
                                    name="cart-outline"
                                    size={30}
                                    color="green"
                                />
                            </Pressable>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <SwiperComponent product={product} />
                    </View>
                </View>

                <View style={{ paddingHorizontal: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#62636a', marginVertical: 10 }}>
                        {product.name}
                    </Text>
                    <Text style={{ fontWeight: 'bold', color: '#00a46c', fontSize: 20 }}>
                        &#8377;{product?.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Text>
                </View>



                <View style={styles.separator} />
                {type === 'candle' ? (
                    <CandleRequirementsBar />
                ) : (
                    <RequirementsBar />
                )}
                <Deliver features={product.features} />
                <View style={styles.separator} />
                <ProductInformation product={product} />
                <View style={styles.separator} />
                <RatingAndReview averageRating={averageRating} starPercentages={starPercentages} />
                <GiveRating />
            </ScrollView>
            <View style={{
                flexDirection: "row",
                width: "100%"
            }}>
                <Pressable style={{
                    width: "50%",
                    backgroundColor: "#00a46c",
                    height: 70,
                    marginTop: 20,
                    borderTopRightRadius: 25,
                    alignItems: "center",
                    justifyContent: "center"
                }} onPress={() => { handleAddToCart() }} >
                    <View >
                        <Text style={{
                            color: "#FFF",
                            fontSize: 17
                        }}>Add to cart</Text>
                    </View>

                </Pressable>

                <View style={{
                    width: "50%",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 20
                }}>
                    <TouchableOpacity onPressIn={() => setModalVisible(true)}
                    >
                        <Text style={{
                            color: "black",
                            fontWeight: "bold",
                            fontSize: 17
                        }}>Description</Text>
                    </TouchableOpacity>

                </View>
                <Modal
                    isVisible={isModalVisible}
                    style={styles.modal}
                    onBackdropPress={() => setModalVisible(false)}
                    swipeDirection={['down']}
                    onSwipeComplete={() => setModalVisible(false)}
                    //         animationIn="slideInUp" // Specify your custom animation
                    //   animationOut="slideOutDown"
                    hasBackdrop={true}
                    backdropOpacity={0}
                >
                    <View style={styles.modalContent}>


                        <Text style={styles.modalTitle}> {product.name}</Text>
                        <Text style={styles.modalDescription}>{product.description}</Text>
                        {/* You can add more content to your modal here */}
                    </View>

                </Modal>
                <CartNotification
                    visible={cartNotificationVisible}
                    onClose={() => setCartNotificationVisible(false)}
                    onViewCart={handleViewCart}
                    productName={product.name}  // Pass additional props as needed
                    totalAmount={product.price} // Pass additional props as needed
                />
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    modal: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 20,
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
        marginTop: 20,
        marginBottom: 20,

    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: "Agbalumo-Regular",
        marginBottom: 10,
        color: '#333', // Custom title text color
    },
    modalDescription: {
        fontSize: 16,
        marginBottom: 10,
        color: '#666', // Custom description text color
    },
});

export default ProductOverview;
