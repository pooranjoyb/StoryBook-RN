import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Rootstate } from '../utils/redux/store'

const Footer = () => {
    const navigation = useNavigation();
    const user = useSelector((state: RootState) => state.user.user.username);

    const handleProfilePress = () => {
        navigation.navigate('Profile', { username: user });
    }

    return (
        <View style={{ backgroundColor: '#f8f8f8', padding: 16, alignItems: 'center', justifyContent: 'center', bottom: 0 }}>
            <Pressable onPress={handleProfilePress}>
                <Text style={{ color: '#007BFF', fontWeight: 'bold' }}>View Profile</Text>
            </Pressable>
        </View>
    )
}

export default Footer