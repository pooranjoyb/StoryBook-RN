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

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [firstname, setFirstName] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [lastname, setLastName] = useState("");
  const [interests, setInterests] = useState("");
  const [favoriteGenres, setFavoriteGenres] = useState("");
  const navigation = useNavigation();

  async function handleSignup() {
    try {
      const userId=ID.unique();
      await account.create(userId, email, password,age);
      showMessage({
        message: "Account Successfully Created!",
        description: "Saved to Appwrite DB",
        type: "success",
      });
    } catch (err) {
      showMessage({
        message: "Error",
        description: `${err}`,
        type: "danger",
      });
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri:
              "https://png.pngtree.com/element_our/20200610/ourlarge/pngtree-library-reading-student-image_2250158.jpg",
          }}
        />
        <Text style={styles.heading}>Sign Up</Text>
        <Text style={styles.description}>
          Create an account to access amazing and great stories ahead!!!
        </Text>
        <Text style={styles.header}>Email</Text>
        <TextInput
          placeholder="storybook@gmail.com"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="gray"
        />
        <Text style={styles.header}>Password</Text>
        <TextInput
          placeholder="*********"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="gray"
        />

        <Text style={styles.header}>Age </Text>
        <TextInput
          placeholder="Enter your age"
          style={styles.input}
          onChangeText={(text) => setAge(text)}
          value={age}
          placeholderTextColor="gray"
        />

        <Text style={styles.header}>Bio </Text>
        <TextInput
        placeholder="Write a short bio"
          style={styles.input}
          onChangeText={(text) => setBio(text)}
          value={bio}
          placeholderTextColor="gray"
        />

        <Text style={styles.header}>First Name</Text>
        <TextInput
        placeholder=" Jose"
          style={styles.input}
          onChangeText={(text) => setFirstName(text)}
          value={firstname}
          placeholderTextColor="gray"
        />

        <Text style={styles.header}>Middle Name</Text>
        <TextInput 
        placeholder="Andrew"
        style={styles.input}
        onChangeText={(text)=>setMiddleName(text)}
        value={middlename}
        placeholderTextColor="gray"
        />

        <Text style={styles.header}>Last Name</Text>
        <TextInput
        placeholder="Dayne"
          style={styles.input}
          onChangeText={(text) => setLastName(text)}
          value={lastname}
          placeholderTextColor="gray"
        />

        <Text style={styles.header}>Interests</Text>
        <TextInput
        placeholder="Reading"
          style={styles.input}
          onChangeText={(text) => setInterests(text)}
          value={interests}
          placeholderTextColor="gray"
        />

        <Text style={styles.header}>Favorite Genres</Text>
        <TextInput
        placeholder="Action"
          style={styles.input}
          onChangeText={(text) => setFavoriteGenres(text)}
          value={favoriteGenres}
          placeholderTextColor="gray"
        />

        <Pressable style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
    

      <View
        style={{
          paddingBottom: 20,
          // backgroundColor: "#f5f5f5",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ fontSize: 30, fontWeight: "500" }}>
            Already have an account?{" "}
            <Text style={{ color: "#3498db" }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <FlashMessage position="top" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#016173",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  image: {
    height: 160,
    width: 200,
  },
  heading: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 2,
  },

  header:{
    textAlign:"center",
    fontSize:30,


  },
  description: {
    textAlign: "center",
    fontWeight: "300",
    fontSize: 25,
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
    textAlign: "center",
    fontSize:20,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    width: "50%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Signup;
