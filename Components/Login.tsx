import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { account, ID } from "../utils/appwrite/service";
import { showMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/redux/userSlice";
import { useTheme } from '../ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { isDarkMode, toggleDarkMode } = useTheme();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        try {
            // Use the appropriate method for your authentication
            // For example, if using Appwrite, you might want to use:
            // await account.createSession(email, password);
            showMessage({
                message: "Login Success!",
                type: "success",
            });

            navigation.navigate("StoriesList" as never);

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
            <View style={[styles.container, { backgroundColor: isDarkMode ? "#121212" : '#f5f5f5' }]}>
                <Image
                    style={styles.image}
                    source={{
                        uri: "https://img.pikbest.com/png-images/qiantu/hand-drawn-vector-school-start-student-reading-character-cartoon-image_2719520.png!sw800",
                    }}
                />
                <Text style={[styles.heading, { color: isDarkMode ? "#fff" : "#000" }]}>Login</Text>
                <Text style={[styles.discription, { color: isDarkMode ? "#fff" : "#000" }]}>
                    Login and enjoy access to many interesting stories!!!
                </Text>

                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={[styles.input, { color: isDarkMode ? "#fff" : "#000" }]}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    style={[styles.input, { color: isDarkMode ? "#fff" : "#000" }]}
                    secureTextEntry
                />
                
                <Pressable style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>

                {/* Dark Mode Toggle Button */}
                <Pressable style={styles.toggleButton} onPress={toggleDarkMode}>
                    <FontAwesomeIcon icon={isDarkMode ? faMoon : faSun} size={24} color="white" />
                </Pressable>
            </View>
            <View
                style={{
                    paddingBottom: 20,
                    backgroundColor: isDarkMode ? "#121212" : "#f5f5f5",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >

                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                    <Text style={{ fontSize: 15, fontWeight: "500", color: isDarkMode ? "#fff" : "#3498db" }}>
                <TouchableOpacity onPress={() => navigation.navigate("Signup" as never)}>
                    <Text style={{ fontSize: 15, fontWeight: "500" }}>

                        Don't have an account? <Text style={{color: '#3498db'}}>SignUp</Text>
                    </Text>
                </TouchableOpacity>
            </View>
            <FlashMessage position="top" />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    image: {
        height: 145,
        width: 200,
        marginBottom: 10,
    },
    heading: {
        fontSize: 25,
        fontWeight: "500",
        marginBottom: 2,
    },
    discription: {
        textAlign: "center",
        fontWeight: "300",
        fontSize: 13,
        width: "70%",
        marginBottom: 50,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 0,
        borderBottomWidth: 1,
        marginBottom: 16,
        width: "100%",
        padding: 8,
        textAlign: 'center',
    },
    button: {
        backgroundColor: "#3498db",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
    toggleButton: {
        position: 'absolute',
        top: 30,
        right: 30,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#3498db',
    },
});

export default Login;
