import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import React from 'react';

export default function RenderRequirementsBar({ requirements }) {

    const iconsData = [
        { icon: 'weather-sunny', label: 'Sunlight' },
        { icon: 'water', label: 'Water' },
        { icon: 'thermometer', label: 'Room Temp' },
        { icon: 'flower', label: 'Soil' },
        { icon: 'seed', label: 'Fertilizer' },
    ];

    return (
        <View style={{ marginTop: 5, marginBottom: 10 }}>
            <Text style={styles.heading}>Requirements</Text>
            <View style={styles.iconContainer}>
                {iconsData.map((item, index) => (
                    <View key={index} style={styles.requirementContainer}>
                        <Icon
                            name={item.icon}
                            size={20}
                            color='green'
                        />
                        <Text style={styles.label}>{item.label}</Text>
                        <Text style={styles.detail}>
                            {requirements[index].split(':').length > 1
                                ? requirements[index].split(':')[1].trim()
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
        fontWeight: '600',
        fontSize: 16,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    requirementContainer: {
        alignItems: 'center',
    },
    label: {
        marginTop: 5,
        color: 'black',
        fontSize: 12,
        fontWeight: 'bold',
    },
    detail: {
        marginTop: 5,
        color: 'gray',
        fontSize: 12,
    },
});
    