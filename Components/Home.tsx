import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectUser } from '../utils/redux/userSlice';

const Home = () => {
    const user = useSelector(selectUser);
    const navigation = useNavigation();

    const handleSignupPress = () => {
        navigation.navigate('Signup' as never);
    };

    const handleLoginPress = () => {
        if (user && user.isAuthenticated) {
            navigation.navigate('StoriesList' as never);
        } else {
            navigation.navigate('Login' as never);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image source={require('../assets/img/kid.jpg')} style={styles.image} />
                <Text style={styles.title}>StoryBook-RN</Text>
                <Text style={styles.description}>
                    Welcome to StoryBook - RN, an app where users can explore and read various stories. Enjoy a collection of interesting and captivating tales right at your fingertips.
                </Text>
                <View style={styles.box}>
                    <Pressable style={styles.button} onPress={handleSignupPress}>
                        <Text style={styles.buttonText}>Signup</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={handleLoginPress}>
                        <Text style={styles.buttonText}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    box: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        color: '#000', 
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
        marginBottom: 24,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        margin: 2,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
    },

    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
    }
});

export default Home;
