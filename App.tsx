import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import IntroPage from './src/screens/IntroPage/IntroPage.js';
import SignIn from './src/screens/SignIn/SignIn.js';
import Registration from './src/screens/RegistarionPage/RegistartionPage.js';
import OtpVerification from './src/screens/OtpVerfication/OTPverfication.js';
import ChooseLogin from './src/screens/ChooseLogin/ChooseLogin.js';
import EmailLogin from './src/screens/EmailSignIn/EmailSignIn.js';
import NetworkStatusComponent from './src/components/NetworkStatusComponent.js';
import SplashScreen from './src/screens/splashScreen/SplashScreen.js';
import IntroductionAnimationScreen from './src/screens/IntorductionAnimationScreen/IntorductionAnimationScreen.js';
import HomePage from './src/screens/HomePage/HomePage.js';
import Main from './src/screens/Main/Main.js'
import ProductOverview from './src/screens/productOverview/productOverview.js';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyCart from './src/screens/Cart/Cart.js';
import CheckoutPage from './src/screens/CheckoutScreen/CheckOut.js';
import ConfirmationScreen from './src/screens/ConformationScreen/ConformationScreen.js';
import ViewMorePage from './src/screens/viewMore/ViewMore.js';
import AddressScreen from './src/screens/AddressScreen/AddressScreen.js';
import OrderConfirmationScreen from './src/screens/OrderScreen/OrderScreen.js';
import MyPlantOrders from './src/screens/MyOrders/MyOrders.js';
import OrderDetailScreen from './src/screens/orderDetailScreen/orderDetailScreen.js';
import MainSearchComponent from './src/components/HomePageComponents/mainSeachBar.js';
import PrivacyPolicyComponent from './src/components/PrivacyPolicy/PrivacyPolicy.js';
import ProductDetailScreen from './src/screens/ProductDetailScreen/ProductDetailScreen.js';
import GradientHeader from './src/components/HomePageComponents/Header.js';
import ProductDetailSearchHeader from './src/components/HomePageComponents/ProductComponent/ProductSearchHeader.js'
import { Provider, useDispatch, useSelector }  from 'react-redux';
import { Text } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor }from './src/Redux/Store.js';
import NoInternetStatus from './src/components/NoInternet.js';
import OnboardingScreen from './src/screens/OnBoardingScreen/OnBoardingScreen.js';
import CustomRegisterModal from './src/components/RegisterComponent/LoginModel.js';
import ReportUsScreen from './src/screens/ReportUs/ReportUsScreen.js';
import ChangePassword from './src/screens/changePassword/changePassword.js';
import AboutUs from './src/screens/AboutUs/AboutUs.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider } from './src/Redux/useContext/AuthContext.js'
import ErrorScreen from './src/screens/ErrorScreen/ErrorScreen.js';
import { setToken } from './src/Redux/tokenReducer.js';
import EditProfile from './src/components/EditProfile.js';
import ARScene from './src/screens/ArScene/ArScene.js';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {

 

  // useEffect(() => {
  //   const checkAsyncStorage = async () => {
  //     try {
  //       const storedToken = await AsyncStorage.getItem('token');
  //       if (storedToken) {
  //         // Set the token from async storage to Redux store
  //         dispatch(setToken(storedToken));
  //       }
  //     } catch (error) {
  //       console.error('Error reading token from AsyncStorage:', error);
  //     }
  //   };

  //   checkAsyncStorage();
  // }, [dispatch]);


  return (
    <AuthProvider>
    <Provider store={store}>
  <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
      
        <Stack.Navigator initialRouteName="Splash">
     
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
       


          <Stack.Screen name="Intro" component={IntroPage} options={{ headerShown: false }} />

          <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
          <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false }} />
          <Stack.Screen name="otp" component={OtpVerification} options={{ headerShown: false }} />
          <Stack.Screen name="ChooseLogin" component={ChooseLogin} options={{ headerShown: false }} />
          <Stack.Screen name="EmailLogin" component={EmailLogin} options={{ headerShown: false }} />
          <Stack.Screen name="main" component={Main} options={{ headerShown: false }} />
          <Stack.Screen name="ProductOverview" component={ProductOverview} options={{ headerShown: false }} />

          <Stack.Screen name="MyCart" component={MyCart} options={{ headerShown: false }} />
          <Stack.Screen name="CheckoutPage" component={CheckoutPage} options={{ headerShown: false }} />
          <Stack.Screen name="ConformationPage" component={ConfirmationScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ViewMorePage" component={ViewMorePage} options={{ headerShown: false }} />
          <Stack.Screen name="AddressScreen" component={AddressScreen} options={{ headerShown: false }} />
          <Stack.Screen name="orderScreen" component={OrderConfirmationScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MyOrders" component={MyPlantOrders} options={{ headerShown: false }} />
          <Stack.Screen name="OrderDetails" component={OrderDetailScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MainSearchComponent" component={MainSearchComponent} options={{ headerShown: false }} />
          <Stack.Screen name="PrivacyPolicyComponent" component={PrivacyPolicyComponent} options={{ headerShown: false }} />
          <Stack.Screen name="NoInternet" component={NoInternetStatus} options={{ headerShown: false }} />
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ReportUsScreen" component={ReportUsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
          <Stack.Screen name="aboutUs" component={AboutUs} options={{ headerShown: false }} />
          <Stack.Screen name="ErrorScreen" component={ErrorScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
          <Stack.Screen name="ArScreen" component={ARScene}/>

          <Stack.Screen
            name="ProductDetailComponent"
            component={ProductDetailScreen}
            options={{
              header: ({ navigation }) => <ProductDetailSearchHeader navigation={navigation}/>,
            }}
          />

        </Stack.Navigator>
            
      </NavigationContainer>
    </SafeAreaView>
    </PersistGate>
    </Provider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
