import { View, Text, Pressable, Touchable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/redux/store';
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';

const Footer = () => {
    const navigation = useNavigation();
    const user = useSelector((state: RootState) => state.user.user.username);

    const handleProfilePress = () => {
        navigation.navigate('Profile', { username: user });
    }

    return (
        <View>
            <TouchableOpacity onPress={handleProfilePress}>
                <Feather name="user" size={30} color="white" />
            </TouchableOpacity>
        </View>
    )
}

export default Footer