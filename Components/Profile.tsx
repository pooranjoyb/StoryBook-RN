import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  Systrace,
  Image,
  Linking,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { account } from "../utils/appwrite/service";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/redux/userSlice";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BlurView } from "expo-blur";

type WelcomeRouteProps = {
  Welcome: { username: string };
};

type WelcomeNavigationProps = StackNavigationProp<WelcomeRouteProps, "Welcome">;

type Props = {
  route: RouteProp<WelcomeRouteProps, "Welcome">;
  navigation: WelcomeNavigationProps;
};

//Temporary Data that will be later fetch from backend storage when its schema will be defined
// This List is later fetched from backend that will be defined by individual user's interest
const profilePhotoUrl =
  "https://www.unsw.edu.au/content/dam/images/medicine-health/population-health/headshots/2022-07-med-pop-health/2022-08-tewodros-profile.cropimg.width=335.crop=square.jpg";

const interestsList = [
  "Sherlock Holmes",
  "StarLight Wishes",
  "The Grateful Garden",
  "The Curious Kitten",
  "A Random Kid",
];

// This List is later fetched from backend that will be defined by individual user's interest
const favoriteGenre = [
  "Drama",
  "Crime",
  "Fantasy",
  "Romantic",
  "SiFi",
  "Comedy",
];

function getRandomColor() {
  const colorCodes = [
    "#F5665B",
    "#D86B62",
    "#54DCF7",
    "#BA77C3",
    "#FF0E99",
    "#44F276",
    "#8B8D8C",
  ]; // Add more color codes as needed
  const randomIndex = Math.floor(Math.random() * colorCodes.length);
  return colorCodes[randomIndex];
}

function getCards(item: String, index: number) {
  return (
    <View
      key={index}
      style={[styles.getCards, { backgroundColor: getRandomColor() }]}
    >
      <Text style={{ textAlign: "center", fontSize: 12 }}>{item}</Text>
    </View>
  );
}

const Profile: React.FC<Props> = ({ route }) => {
  const { username } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      const user = { username: "", isAuthenticated: false };
      dispatch(setUser(user));
      navigation.navigate("Home" as never);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDirectOnBackpage = () => {
    navigation.navigate("StoriesList" as never);
  };

  return (
    <View style={styles.container}>
      {/*In case if you are using other than expo then install npm i react-native-linear-gradient*/}
      <LinearGradient colors={["#007BFF", "white"]} style={styles.heading}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={handleDirectOnBackpage}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, color: "white", fontWeight: "600" }}>
            Profile Info
          </Text>
          <TouchableOpacity onPress={handleLogout}>
            <MaterialIcons name="logout" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <Image
          style={styles.image}
          source={{
            uri: profilePhotoUrl,
          }}
        />
        <Text style={{ marginTop: 15, fontSize: 20, fontWeight: "500" }}>
          Username
        </Text>
        <Text style={{ marginTop: 0, fontSize: 15, fontWeight: "300" }}>
          user: Nickname
        </Text>
      </LinearGradient>

      <View style={styles.body}>

        <LinearGradient colors={[ "white" ,"#009BFF", "white"]} style={{ borderRadius: 10, overflow: 'scroll', width: "100%" , justifyContent: 'center', alignItems: 'center', flex: 1, paddingBottom: 25}}>
          <BlurView intensity={30} style={styles.bodyBox}>
            <Text style={styles.bodyHeading}>Account Info: </Text>
            <Text style={styles.bodySubHeading}>
              Email: <Text style={styles.bodySubText}>{username}</Text>
            </Text>
            <Text style={styles.bodySubHeading}>
              Age: <Text style={styles.bodySubText}>UserAge</Text>

            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "baseline",
                flexWrap: "wrap",
              }}
            >
              <Text
                style={[styles.bodySubHeading]}
              >
                Interestes:{" "}
              </Text>

              {interestsList.map((item, index) => getCards(item, index))}
            </View>

            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                alignItems: "baseline",
                flexWrap: "wrap",
              }}
            >
              <Text style={[styles.bodySubHeading]}>Genre: </Text>
              {favoriteGenre.map((item, index) => getCards(item, index))}
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Having Trouble?</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.footerText}>Contact us on:</Text>
          <Pressable
            onPress={() =>
              Linking.openURL("https://github.com/pooranjoyb/StoryBook-RN")
            }
          >
            <Image
              style={styles.footerImages}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
              }}
            />
          </Pressable>
          <Pressable
            onPress={() =>
              Linking.openURL(
                "https://discord.com/channels/1186630692793233498/1194917839920959549"
              )
            }
          >
            <Image
              style={[styles.footerImages, { padding: 13 }]}
              source={{
                uri: "https://www.freepnglogos.com/uploads/discord-logo-png/discord-logo-logodownload-download-logotipos-1.png",
              }}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  heading: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  topBar: {
    // marginTop: 50,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 30,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: "black",
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bodyBox: {
    // borderWidth: 0.2,
    overflow: 'scroll',
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    width: "90%",
  },
  bodyHeading: {
    fontSize: 18,
    fontWeight: "600",
    paddingBottom: 15,
  },
  bodySubHeading: {
    fontSize: 16,
    fontWeight: "500",
    paddingBottom: 5,
  },
  bodySubText: {
    fontSize: 16,
    fontWeight: "300",
  },
  getCards: {
    padding: 7,
    borderRadius: 25,
    margin: 1,
    marginHorizontal: 3,
    marginTop: 5,
  },
  footer: {
    backgroundColor: "white",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
  },
  footerImages: {
    height: 20,
    width: 20,
    marginLeft: 5,
    borderRadius: 10,
  },
});

export default Profile;
