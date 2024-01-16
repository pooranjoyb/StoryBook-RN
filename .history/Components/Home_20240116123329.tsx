import React from 'react';
import { View, Linking, Text, Pressable, StyleSheet, TextInput,Animated,use} from 'react-native';
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

    const handleFacebookPress = () => {
        
        Linking.openURL('https://www.facebook.com');
    };

    const handleInstagramPress = () => {
       
        Linking.openURL('https://www.instagram.com');
    };

    const handleGitHubPress = () => {
      
        Linking.openURL('https://www.github.com');
    };

    const handleLinkedInPress = () => {
   
        Linking.openURL('https://www.linkedin.com');
    };

    const handleContactUsPress = () => {
       
        console.log('Contact Us button pressed');
    };
    const fadeInText = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeInText, {
            toValue: 1,
            duration: 1000, // Adjust the duration as needed
            useNativeDriver: true,
        }).start();
    }, [fadeInText]);



    return (
        <View style={styles.container}>
            <View style={styles.header}>
        <Text style={styles.headerTitle}>StoryBook-RN</Text>
    </View>
        <View style={styles.contentContainer}>
        <Animated.View style={[styles.leftContainer, { opacity: fadeInText }]}>
                        <Animated.Text style={[styles.title, { opacity: fadeInText }]}>StoryBook-RN</Animated.Text>
                        <Animated.Text style={[styles.description, { opacity: fadeInText }]}>
                            Welcome to StoryBook - RN, an app where users can explore and read various stories. Enjoy a collection of interesting and captivating tales right at your fingertips.
                        </Animated.Text>
                        <Animated.Text style={[styles.tag, { opacity: fadeInText }]}>
                            Developed by
                            <Text
                                style={{ color: '#e74c3c', fontWeight: 'bold' }}
                                onPress={() => Linking.openURL('http://github.com/pooranjoyb')}
                            >
                                &nbsp;Pooranjoy Bhattacharya
                            </Text>
                        </Animated.Text>
                    </Animated.View>
            <View style={styles.rightContainer}>
                {/* Login Form */}
                <View style={styles.loginBox}>
                    <View style={styles.loginForm}>
                        {/* Email and Password Input */}
                        <Text style={styles.txt}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            keyboardType="email-address"
                        />
                        <Text style={styles.txt}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                        />
                        {/* Login Button */}
                        <Pressable style={styles.button} onPress={handleLoginPress}>
                            <Text style={styles.buttonText}>Login</Text>
                        </Pressable>
                    </View>
                    {/* Register Box */}
                    <View style={styles.registerContainer}>
                        <Text style={styles.dontHaveAccountText}>Don't have an account?</Text>
                        <Pressable style={styles.registerButton} onPress={handleSignupPress}>
                            <Text style={styles.registerButtonText}>Register</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
    
        </View>
          {/* Footer Section */}
          <View style={styles.footer}>
                            {/* Left Icons */}
                            <View style={styles.socialIcons}>
                                <Pressable onPress={handleFacebookPress}>
                                    <Text style={{color: "#87CEEB"}}>Facebook</Text> 
                                </Pressable>
                                <Pressable onPress={handleInstagramPress}>
                                    <Text style={{color: "#87CEEB"}}>Instagram</Text> 
                                </Pressable>
                                <Pressable onPress={handleGitHubPress}>
                                    <Text style={{color: "#87CEEB"}}>GitHub</Text> 
                                </Pressable>
                                <Pressable onPress={handleLinkedInPress}>
                                    <Text style={{color: "#87CEEB"}}>LinkedIn</Text>
                                </Pressable>
                            </View>
                            {/* Contact Us Button */}
                            <Pressable style={styles.contactUsButton} onPress={handleContactUsPress}>
                                <Text style={styles.contactUsButtonText}>Contact Us</Text>
                            </Pressable>
                        </View>
    </View>
    
    );
};

const styles = StyleSheet.create({

    registerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#B8C6F5',
        justifyContent: 'center',
     
    },
    // box: {
    //     flex: 1,
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     justifyContent: 'center'
    // },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
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
    txt:{
        fontSize:18,
        fontWeight:'bold',
        marginTop:20,
    },
    description: {
        fontSize: 16,
        color: '#000',
        textAlign: 'left',
        fontFamily:'cursive',
        marginBottom: 24,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        marginTop:30,
        borderRadius: 5,
        width: '50%',
        color: 'white',

        
    },

    tag: {
        fontWeight: 'bold',
        marginBottom: 50
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
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },

    leftContainer: {
        flex: 1,
        alignItems: 'center',
        width:'20%',
    },

   

    loginForm: {
        height:'90%',
        width: '80%',
        backgroundColor: '#AEAEF1',
        padding: 20,
        borderRadius: 8,
        elevation: 3,
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginTop:40,
        marginBottom: 10,
        paddingLeft: 10,
    },

    
    dontHaveAccountText: {
        marginRight: 10,
    },

   

    registerButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#3498db',
    },

    registerButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    rightContainer: {
        flex: 1,
        height: 500,
        alignItems: 'center',
        justifyContent: 'center',
        width:4000
        
    

    },

    loginBox: {
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        padding: 20,
        borderRadius: 10,
        elevation: 3,
         width: '80%',
        height: '100%', // Adjusted height
    },
    footer: {
        flexDirection: 'row',
        backgroundColor: 'black',
        justifyContent: 'space-between',
        padding: 16,
        marginTop: 'auto', // Pushes the footer to the bottom
        height:100,
    },

    socialIcons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '50%',
    },

    contactUsButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        height:50,
    },

    contactUsButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    header: {
        backgroundColor: '#3498db',
        padding: 10,
        alignItems: 'flex-start',
    },
    
    headerTitle: {
        marginBottom:20,
        color: '#fff',
        fontSize: 20,
        fontFamily:'cursive',
        fontWeight: 'bold',
    },
});

export default Home;
