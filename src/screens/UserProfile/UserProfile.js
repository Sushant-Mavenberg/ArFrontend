import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import LogoutConfirmationModal from '../../components/LogoutModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { clearToken } from '../../Redux/tokenReducer';
import { firstName, userEmail } from '../OtpVerfication/OTPverfication';

const SECTIONS = [
  {
    header: 'Profile',
    items: [
      { id: 'Orders', icon: 'shopping-bag', label: 'Orders', type: 'select' },
      { id: 'Cart', icon: 'shopping-cart', label: 'Cart', type: 'toggle' },
      { id: 'Favourites', icon: 'heart', label: 'Favourites', type: 'toggle' },
      // { id: 'Addresses', icon: 'map-pin', label: 'Address', type: 'link' },
    ],
  },
  {
    header: 'Help',
    items: [
      { id: 'ReportUsScreen', icon: 'flag', label: 'Report Us', type: 'link' },
      { id: 'ChangePassword', icon: 'lock', label: 'Change Password', type: 'link' },
    ],
  },
  {
    header: 'Content',
    items: [
      { id: 'aboutUs', icon: 'info', label: 'About Us', type: 'link' },
      { id: 'logout', icon: 'log-out', label: 'Log-Out', type: 'link' },
      { id: 'PrivacyPolicy', icon: 'file', label: 'Privacy and Policy', type: 'link' }
    ],
  },
];

export default function UserProfile() {
  const dispatch = useDispatch()
  const isConnected = useSelector((state) => state.network.isConnected);
  const [form, setForm] = useState({
    language: 'English',
    darkMode: true,
    wifi: false,
  });
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
  });
  const navigation = useNavigation();
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const handleItemPress = (itemId) => {
    if (isConnected) {
      switch (itemId) {
        case 'Cart':
          navigation.navigate('Cart'); // Change to your actual MyCart screen name
          break;
        case 'Orders':
          navigation.navigate('MyOrders'); // Change to your actual MyOrders screen name
          break;
        case 'PrivacyPolicy':
          navigation.navigate('PrivacyPolicyComponent');
          break;
        case 'aboutUs': // Assuming 'save' corresponds to 'About Us'
          navigation.navigate('aboutUs'); // Replace 'AboutUs' with your actual screen name
          break;
        case 'Favourites':
          navigation.navigate('Favorite'); // Change to your actual MyCart screen name
          break;
        case 'ChangePassword':
          navigation.navigate('ChangePassword'); // Change to your actual ChangePassword screen name
          break;
        case 'ReportUsScreen':
          navigation.navigate('ReportUsScreen'); // Change to your actual ChangePassword screen name
          break;
        case 'logout':
          setLogoutModalVisible(true);
          break;
        default:
          // Do nothing for other items
          break;
      }
    } else {
      navigation.navigate('NoInternet');
    }

  };
  const handleLogout = async () => {

    try {
      await AsyncStorage.removeItem('token');
    } catch (e) {
      console.log('Error removing JWT token:', e);
    }

    // Navigate to the sign-in page
    navigation.navigate('Home'); // Change to your actual sign-in screen name

    // Close the logout modal
    setLogoutModalVisible(false);
    dispatch(clearToken());
  };

  useEffect(() => {
    // Assuming userEmail is a string, you might need to modify accordingly
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      email: userEmail,
      name:firstName
    }));
  }, [userEmail]);

  return (
    <SafeAreaView style={{ backgroundColor: '#f6f6f6' }}>

      {/* ScrollView content */}
      <ScrollView contentContainerStyle={styles.container}>
        <LogoutConfirmationModal
          isVisible={isLogoutModalVisible}
          onClose={() => setLogoutModalVisible(false)}
          onSignOut={handleLogout}
        />

        <View style={styles.profile}>
          <Image
            alt=""
            source={{
              uri: 'https://res.cloudinary.com/dlzcgycpi/image/upload/v1704443634/dcrxcskziftqgaf1596538693802_Original_jmcdof.jpg',
            }}
            style={styles.profileAvatar}
          />

          <Text style={styles.profileName}>{userProfile.name}</Text>
          <Text style={styles.profileEmail}>{userProfile.email}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EditProfile');
            }}>
            <View style={styles.profileAction}>
              <Text style={[styles.profileActionText, { fontSize: 14, }]}>
                Edit Profile
              </Text>

              <FeatherIcon color="#fff" name="edit" size={14} />
            </View>
          </TouchableOpacity>
        </View>

        {SECTIONS.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{header}</Text>
            </View>
            <View style={styles.sectionBody}>
              {items.map(({ id, label, icon, type, value }, index) => (
                <View
                  key={id}
                  style={[
                    styles.rowWrapper,
                    index === 0 && { borderTopWidth: 0 },
                  ]}
                >
                  <Pressable onPress={() => handleItemPress(id)}>
                    <View style={styles.row}>
                      <FeatherIcon
                        color="#496152"
                        name={icon}
                        style={styles.rowIcon}
                        size={22}
                      />

                      <Text style={styles.rowLabel}>{label}</Text>

                      <View style={styles.rowSpacer} />

                      {type === 'select' && (
                        <Text style={styles.rowValue}>{form[id]}</Text>
                      )}

                      {/* Add chevron right icon for all types */}
                      <FeatherIcon
                        color="#496152"
                        name="chevron-right"
                        size={22}
                      />
                    </View>
                  </Pressable>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  appBar: {
    flexDirection: 'row',
    paddingTop: 45,
    paddingBottom: 10,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appBarIcon: {
    fontSize: 18,
    color: '#555',
    padding: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
  },
  appBarTitle: {
    fontSize: 18,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontWeight: '600',
  },
  container: {
    //paddingVertical: 20,
    paddingBottom: 20,
  },
  section: {
    justifyContent: 'center',
    paddingTop: 5,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#a7a7a7',
    textTransform: 'uppercase',
    //letterSpacing: 1.2,
  },
  sectionBody: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  // title: {
  //   fontSize: 32,
  //   fontWeight: '700',
  //   color: '#1d1d1d',
  //   marginBottom: 6,
  // },
  // subtitle: {
  //   fontSize: 15,
  //   fontWeight: '500',
  //   color: '#929292',
  // },
  profile: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
  },
  profileName: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
    color: '#090909',
  },
  profileEmail: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: '400',
    color: '#848484',
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#496152',
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 24,
    height: 50,
  },
  rowWrapper: {
    paddingLeft: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
  },
  rowIcon: {
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
  rowValue: {
    fontSize: 17,
    color: '#616161',
    marginRight: 4,
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});