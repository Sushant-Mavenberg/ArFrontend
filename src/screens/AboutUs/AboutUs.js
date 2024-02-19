import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Email from 'react-native-email';
import GradientHeader from '../../components/HomePageComponents/Header';


const AboutUs = ({navigation}) => {


    const openEmail = () => {
        const to = ['orders@arphibo.com']; // Array of email addresses
        Email(to, {
            subject: 'Subject of the Email',
            body: 'Body of the Email',
        }).catch(console.error);
    };

    return (
        <ScrollView style={styles.scrollView}>
           <GradientHeader text="About Us" navigation={navigation}/>

            <View style={styles.logoCenter}>
            <Image
                    source={require('../../assets/logo.png')}
                    style={styles.logoImage}
                />
            </View>

            {/* Large Assortment */}
            <View style={styles.centerContent}>
                <Text style={styles.pageHeaderText}>Discover Our Story</Text>
                <Text style={styles.centeredText}>
                    Order now and appreciate the beauty of nature
                </Text>
                <Image
                    source={require('../../assets/alocasia.png')}
                    style={styles.LargeAssortmentImage}
                />
                <Text style={styles.largeAssortment}>Large Assortment</Text>
                <Text style={styles.largeAssortmentText}>
                    We offer a wide variety of high-quality products with a focus on
                    sustainability and environmental responsibility.
                </Text>
            </View>

            {/* 24/7 Call Support */}
            <View style={styles.centerContent}>
                <Image
                    source={require('../../assets/parcel.png')}
                    style={styles.CallImage}
                />
                <Text style={styles.largeAssortment}>Fast & Free Shipping</Text>
                <Text style={styles.largeAssortmentText}>
                '60min or less delivery time, free shipping and an expedited delivery option.'
                </Text>
            </View>

            {/* 24/7 Call Support */}
            <View style={styles.centerContent}>
                <Image
                    source={require('../../assets/outgoing-call.png')}
                    style={styles.CallImage}
                />
                <Text style={styles.largeAssortment}>24/7 Support</Text>
                <Text style={styles.largeAssortmentText}>
                    Answers to any business-related inquiry 24/7 and in real-time.
                </Text>
                <View style={styles.contactInfo}>
                <TouchableOpacity onPress={openEmail}>
                    <Text style={styles.contactEmail}>Email: orders@arphibo.com</Text>
                </TouchableOpacity>
                <Text style={styles.contactText}>Phone: +91 8618122018</Text>
            </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    header: {
        flexDirection: 'row',
        paddingTop: 45,
        paddingBottom: 10,
        marginBottom: 10,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerIcon: {
        fontSize: 30,
        color: '#fff',
    },
    headerTitleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    pageHeaderText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    centeredText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
    },
    largeAssortment: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    largeAssortmentText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#555',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    image: {

        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 20,
    },
    LargeAssortmentImage:{
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 20,
    },
    CallImage:{
        width: 80,
        height: 80,
        borderRadius: 10,
        marginBottom: 20,
    },
    ParcelImage:{
        width: 80,
        height: 80,
        borderRadius: 10,
        marginBottom: 20,
    },
    logoImage:{
        width:180,
        height:60,
        resizeMode: 'contain',
        justifyContent:'center'
    },
    logoCenter:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    contactEmail:{
        paddingBottom:2,
        justifyContent:'center',

    },
    contactInfo:{
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center'
    }

});

export default AboutUs;