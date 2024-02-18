import React from "react";
import {
    View,
    Linking,
    Text,
    Pressable,
    StyleSheet,
    Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectUser } from "../utils/redux/userSlice";

const Home = () => {
    const user = useSelector(selectUser);
    const navigation = useNavigation();

    const handleSignupPress = () => {
        navigation.navigate("Signup" as never);
    };

    const handleLoginPress = () => {
        if (user && user.isAuthenticated) {
            navigation.navigate("StoriesList" as never);
        } else {
            navigation.navigate("Login" as never);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image source={require("../assets/img/kid.jpg")} style={styles.image} />
                <Text style={styles.title}>StoryBook-RN</Text>
                <Text style={styles.description}>
                    Welcome to StoryBook - RN, an app where users can explore and read
                    various stories. Enjoy a collection of interesting and captivating
                    tales right at your fingertips.
                </Text>

                <Pressable style={styles.button} onPress={handleLoginPress}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
                <Pressable style={[styles.button]} onPress={handleSignupPress}>
                    <Text style={styles.buttonText}>Signup</Text>
                </Pressable>
            </View>
            <View style={styles.tag}>
                <Text style={{
                    fontWeight: "bold",
                    marginBottom: 25,
                }}>
                    Developed by
                    <Text
                        style={{ color: "#3498db" }}
                        onPress={() => Linking.openURL("http://github.com/pooranjoyb")}
                    >
                        &nbsp;Pooranjoy Bhattacharya
                    </Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    box: {
        // flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        paddingTop: 100,
    },
    image: {
        width: 210,
        height: 210,
        resizeMode: "cover",
        borderRadius: 10,
    },
    title: {
        marginTop: 10,
        fontSize: 25,
        color: "#000",
        marginBottom: 10,
        fontWeight: '500',
    },
    description: {
        fontWeight: '400',
        fontSize: 16,
        color: "#000",
        textAlign: "center",
        marginBottom: 50,
    },
    button: {
        backgroundColor: "#3498db",
        padding: 15,
        margin: 7,
        borderRadius: 10,
        width: "80%",
        color: "white",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 20,
        color: "#fff",
    },
    tag: {
        flex: 1,
        // backgroundColor: "red",
        justifyContent: "flex-end",
        alignItems: "center",
    },
});

export default Home;
