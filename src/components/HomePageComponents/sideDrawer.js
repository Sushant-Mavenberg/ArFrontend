import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Sidebar = () => {
  // Replace these placeholder values with your actual user data
  const user = {
    name: 'challpalli vamsi krishna',
    email: 'vamsikrishna.challapalli@mavenberg.com',
    profileImage: require('../../assets/aunt.png'), // Your user's profile image
  };

  const menuItems = [
    { label: 'Home', icon: require('../../assets/home.png'), action: () => console.log('Go to Home') },
    { label: 'Orders', icon: require('../../assets/checkout.png'), action: () => console.log('Go to Order') },
    { label: 'Privacy Policy', icon: require('../../assets/privacy-policy.png'), action: () => console.log('Go to Privacy Policy') },
    // Add more menu items here
  ];

  const signoutItem = { label: 'Signout', icon: require('../../assets/logout (1).png'), action: () => console.log('Signout') };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={user.profileImage} style={styles.profileImage} />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={item.action}>
            <Image source={item.icon} style={styles.menuIcon} />
            <Text style={styles.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.signoutItem} onPress={signoutItem.action}>
        <Image source={signoutItem.icon} style={styles.signoutIcon} />
        <Text style={styles.signoutLabel}>{signoutItem.label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A301F',
    justifyContent: 'space-between', // To position the Signout at the bottom
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userName: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  userEmail: {
    color: 'white',
    fontSize: 12,
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  menuIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: 'white',
  },
  menuLabel: {
    color: 'white',
    fontSize: 16,
  },
  signoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  signoutIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: 'white',
  },
  signoutLabel: {
    color: 'white',
    fontSize: 16,
  },
});

export default Sidebar;
