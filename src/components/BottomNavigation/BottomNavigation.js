import React, { useEffect, useState } from 'react';
import { BackHandler, ToastAndroid, Text, View, Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import CartScreen from '../../screens/Cart/Cart';
import HomeScreen from '../../screens/HomePage/HomePage';
import UserProfileScreen from '../../screens/UserProfile/UserProfile';
import FavoriteScreen from '../../screens/Favorites/Favorites';
import GradientHeader from '../../components/HomePageComponents/Header';
import EmptyCart from '../../components/emptyCard.js'; // Import your EmptyCart component

import NoInternetStatus from '../NoInternet';
import LoginScreen from '../../screens/SignIn/SignIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectToken } from '../../Redux/tokenReducer';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation, }) => {
  const products = useSelector((state) => state.cart.products);
  const cartItemCount = products.length;



  return (
    <View
      style={{
        flexDirection: 'row',
        height: 60,
        borderTopWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 2,
        position: 'relative',
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: 'center', position: 'relative' }}
            accessibilityRole="button"
          >
            <View style={{ position: 'relative' }}>
              <Feather
                name={options.tabBarIconName}
                size={20} // Adjusted the size to 20
                color={isFocused ? '#496152' : 'grey'}
                style={{ marginBottom: 5 }}
              />
              {isFocused && (
                <View
                  style={{
                    position: 'absolute',
                    top: -10,
                    left: 0,
                    right: 0,
                    height: 3,
                    backgroundColor: '#496152',
                  }}
                />
              )}
            </View>
            {route.name === 'Cart' && cartItemCount > 0 && (
              <View
                style={{
                  position: 'absolute',
                  top: -4,
                  backgroundColor: 'red',
                  borderRadius: 50,
                  width: 15,
                  height: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 1,
                  transform: [{ translateX: 8.5 }],
                }}
              >
                <Text style={{ color: 'white', fontSize: 8 }}>{cartItemCount}</Text>
              </View>
            )}
            <Text style={{ color: isFocused ? '#496152' : 'grey', fontSize: 10 }}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default function BottomBar () {
  const [lastBackPressed, setLastBackPressed] = useState(0);
  const navigation = useNavigation();
  const products = useSelector((state) => state.cart.products);
  const [token, setToken] = useState(null);
  const cartItemCount = products.length;

  const isConnected = useSelector((state) => state.network.isConnected);
  // const [token,setToken] = useState(null)
  // useEffect(() => {
  //   const getToken = async () => {
  //     const storedToken = await AsyncStorage.getItem('token');
  //     setToken(storedToken);
  //   };

  //   getToken();
  // }, []); 

  console.log(token,"token in bobar")
  const handleBackButton = () => {
    const currentTime = new Date().getTime();

    if (currentTime - lastBackPressed < 2000) {
      BackHandler.exitApp();
    } else {
      ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
      setLastBackPressed(currentTime);
    }

    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

      return () => {
        backHandler.remove();
      };
    }, [lastBackPressed])
  );
  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    };

    getToken();
  }, );

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = route.name === 'Home' ? 'home' : 'shopping-cart';

          return <Feather name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home', tabBarIconName: 'home', headerShown: false }}
      />

<Tab.Screen
  name="Cart"
  component={isConnected ? (cartItemCount > 0 ? CartScreen : EmptyCart) : NoInternetStatus}
  options={({ navigation }) => ({
    tabBarLabel: 'Cart',
    tabBarIconName: 'shopping-cart',
    headerShown: isConnected,
    header: isConnected ? ({ navigation }) => <GradientHeader navigation={navigation} text='My cart' /> : undefined,
  })}
/>


<Tab.Screen
  name="Favorite"
  component={isConnected ? FavoriteScreen : NoInternetStatus}
  options={({ navigation }) => ({
    tabBarLabel: 'Favorite',
    tabBarIconName: 'heart',
    headerShown: isConnected,
    header: isConnected ? ({ navigation }) => <GradientHeader navigation={navigation} text='Favorite' /> : undefined,
  })}
/>





      <Tab.Screen
        name="UserProfile"
        component={token ? UserProfileScreen:LoginScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIconName: 'user',
          headerShown: true,
          header: ({ navigation }) => <GradientHeader navigation={navigation} text={token ? 'Profile' : 'Login'} />,
        }}
      />
    </Tab.Navigator>
  );
}
