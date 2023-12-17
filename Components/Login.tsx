import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { account, ID } from '../utils/appwrite/service';
import { showMessage } from "react-native-flash-message";
import FlashMessage from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setUser } from '../utils/redux/userSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        try {

            await account.createEmailSession(email, password);
            showMessage({
                message: "Login Success!",
                type: "success",
            });

            navigation.navigate('StoriesList' as never);

            const user = { username: email, isAuthenticated: true };
            dispatch(setUser(user));

        } catch (err) {
            showMessage({
                message: "Error Login Failed",
                description: `${err}`,
                type: "danger",
            });
        }
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.heading}>Login</Text>

                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry
                />

                <Pressable style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
            </View>
            <FlashMessage position="top" />

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    heading: {
        fontSize: 24,
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        width: '100%',
        padding: 8,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Login;
