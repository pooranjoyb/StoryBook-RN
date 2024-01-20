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
      await account.create(userId, email, password,age,bio,nickname,fullName);
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
        <Text style={styles.discription}>
          Create an account to access amazing and great stories ahead!!!
        </Text>
        <Text>Email</Text>
        <TextInput
          placeholder="storybook@gmail.com"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text>Password</Text>
        <TextInput
          placeholder="xyz"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <Text>Age </Text>
        <TextInput
          placeholder="14"

          style={styles.input}
          onChangeText={(text) => setAge(text)}
          value={age}
        />

        <Text>Bio </Text>
        <TextInput
        placeholder="passionate reader"
          style={styles.input}
          onChangeText={(text) => setBio(text)}
          value={bio}
        />

        <Text>First Name</Text>
        <TextInput
        placeholder="Jose"
          style={styles.input}
          onChangeText={(text) => setFirstName(text)}
          value={firstname}
        />

        <Text>Middle Name</Text>
        <TextInput 
        placeholder="Andrew"
        style={styles.input}
        onChangeText={(text)=>setMiddleName(text)}
        value={middlename}
        />

        <Text>Last Name</Text>
        <TextInput
        placeholder="Dayne"
          style={styles.input}
          onChangeText={(text) => setLastName(text)}
          value={lastname}
        />

        <Text>Interests:</Text>
        <TextInput
        placeholder="reading"
          style={styles.input}
          onChangeText={(text) => setInterests(text)}
          value={interests}
        />

        <Text>Favorite Genres:</Text>
        <TextInput
        placeholder="e.g., Action, Drama"
          style={styles.input}
          onChangeText={(text) => setFavoriteGenres(text)}
          value={favoriteGenres}
        />

        <Pressable style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>

      <View
        style={{
          paddingBottom: 20,
          backgroundColor: "#f5f5f5",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            Already have an account?{" "}
            <Text style={{ color: "#3498db" }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <FlashMessage position="top" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
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
    textAlign: "center",
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
});

export default Signup;
