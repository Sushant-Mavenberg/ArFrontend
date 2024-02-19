import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function CandleRequirementsBar({ requirements }) {
    const iconsData = [
        { icon: 'fire', label: 'Heat Source' },
        { icon: 'candle', label: 'Type of Wax' },
        { icon: 'clock-outline', label: 'Burn Time' },
    ];

    return (
        <View style={{ marginTop: 5, marginBottom: 10 }}>
            <Text style={styles.heading}>Requirements</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {iconsData.map((item, index) => (
                    <View key={index} style={styles.iconContainer}>
                        <Icon
                            name={item.icon}
                            size={16} // Adjust the size as needed
                            color='green'
                        />
                        <Text style={styles.label}>{item.label}</Text>
                        <Text style={styles.detail}>
                            {requirements[index]?.split(':').length > 1
                                ? requirements[index]?.split(':')[1].trim()
                                : requirements[index]}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    heading: {
        color: 'black',
        marginBottom: 15,
        fontWeight: 'bold',
        fontSize: 14,
        fontFamily: 'sans-serif', // Apply sans-serif font
    },
    iconContainer: {
        alignItems: 'center',
        maxWidth: 100, // Adjust the maximum width as needed
    },
    label: {
        marginTop: 5,
        color: 'black',
        fontSize: 12, // Adjusted font size
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'sans-serif', // Apply sans-serif font
    },
    detail: {
        marginTop: 5,
        color: 'gray',
        fontSize: 12, // Adjusted font size
        textAlign: 'center',
        fontFamily: 'sans-serif', // Apply sans-serif font
    },
});
