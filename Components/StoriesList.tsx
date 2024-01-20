import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  Modal,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../utils/appwrite/service";
import {
  MaterialIcons,
  FontAwesome5,
  Ionicons,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";
import moment from "moment";
import { BlurView } from "expo-blur";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { RootState } from "../utils/redux/store";
import { account } from "../utils/appwrite/service";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/redux/userSlice";
import { LinearGradient } from "expo-linear-gradient";

const StoriesList = () => {
  // All used states and functions
  const navigation = useNavigation();
  const [stories, setStories] = useState([]);
  const [FavStories, setFavStories] = useState([]); //A temporary list to store favoriate stories
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector((state: RootState) => state.user.user.username); //Fetching user data to use in logout functions
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await db.listDocuments(
          "657ef4698093d40c3e86",
          "657ef47a34784a4383d1"
        );
        console.log(response);
        setStories(response.documents as never);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stories:", error);
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  //Redirect to story function
  const handleStoryPress = (storyId: string) => {
    navigation.navigate("Story", { storyId });
  };

  //Logout function
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

  //random color generating function
  function getRandomColor() {
    const colorCodes = [
      "#F5665B",
      "#D86B62",
      "#54DCF7",
      "#BA77C3",
      "#FF0E99",
      "#44F276",
      "#8B8D8C",
      "#FFF63B",
      "#53ba6a",
      "#9abfe3",
      "#64b483",
      "#bfdecb",
    ]; // Add more color codes as needed
    const randomIndex = Math.floor(Math.random() * colorCodes.length);
    return colorCodes[randomIndex];
  }

  // function to render each story
  function StoryRender({ item }) {
    // updating date into right format
    const updatedAtMoment = moment(item.$updatedAt);
    const formattedDate = updatedAtMoment.format("DD MMM");

    return (
      // shows a story
      <LinearGradient
        colors={[getRandomColor(), getRandomColor()]}
        style={{
          marginTop: 10,
          marginBottom: 5,
          borderRadius: 15,
          borderWidth: 0,
          overflow: "scroll",
          elevation: 5,
        }}
      >
        <BlurView intensity={80} style={styles.storyContainer}>
          <View style={{}}>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 13, fontWeight: "300", paddingTop: 3 }}>
              by {item.author}
            </Text>

            {/* updating Liked and share UI */}
            <View style={{ flexDirection: "row", gap: 15 }}>
              {/* sync and smooth heart icon funtionalities */}
              <TouchableOpacity
                style={{ paddingTop: 15 }}
                onPress={() => {
                  if (FavStories.includes(item)) {
                    const updatedFavStories = FavStories.filter(
                      (story) => story !== item
                    );
                    setFavStories(updatedFavStories);
                    Alert.alert("Removed from Favoriate List");
                  } else {
                    setFavStories((prevFavStories) => [
                      ...prevFavStories,
                      item,
                    ]);
                    Alert.alert("Added to Favoriate List");
                  }
                }}
              >
                {FavStories.includes(item) ? (
                  <AntDesign name="heart" size={20} color="red" />
                ) : (
                  <FontAwesome5 name="heart" size={20} color="black" />
                )}
              </TouchableOpacity>

              {/* Smooth Share icon functionalities */}
              <TouchableOpacity
                style={{ paddingTop: 15 }}
                onPress={() => Alert.alert("Still in Progress!!!")} //access this option once the app host live
              >
                <AntDesign name="sharealt" size={23} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Show date or time of stories */}
          <View
            style={{ alignItems: "flex-end", justifyContent: "space-around" }}
          >
            <Ionicons name="chevron-forward" size={24} color="black" />
            <Text style={{ fontSize: 12, fontWeight: "300" }}>
              Updated at:{" "}
              <Text style={{ fontSize: 14, fontWeight: "500" }}>
                {formattedDate}
              </Text>
            </Text>
          </View>
        </BlurView>
      </LinearGradient>

      //   End of Functions
    );
  }

  return (
    <>
      {/* Modal */}
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log("Modal has been closed.");
        }}
      >
        {/*All views of Modal*/}

        {/* modal Header */}
        <BlurView intensity={3} tint={"dark"} style={styles.modalBackView}>
          <LinearGradient
            colors={["#FFFBA6", "#FF9F38"]}
            style={styles.modalContainer}
          >
            <View
              style={styles.modalHeader}
            >
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                Favoriate List
              </Text>
              <Entypo
                name="cross"
                size={30}
                color="black"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>

            {/* modal body */}
            {FavStories.length == 0 ? (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: StatusBar.currentHeight + 15,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "500",
                  }}
                >
                  No story available at this moment!!!{" "}
                  <Text style={{ fontSize: 15, fontWeight: "300" }}>
                    {"\n"}Please Add Some Stories{" "}
                  </Text>
                </Text>
              </View>
            ) : (
              <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={FavStories}
                keyExtractor={(item) => item.$id}
                style={{ marginTop: 7 }}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleStoryPress(item.$id)}>
                    <StoryRender item={item} />
                  </TouchableOpacity>
                )}
              />
            )}
          </LinearGradient>
        </BlurView>
      </Modal>
      {/* End of Modal */}

      {/* starting of the main application overview */}
      <LinearGradient
        colors={[
          "#01796C",
          "#007BFF",
          "#35D6C5",
          "#FFBAF4",
          "#ACF1CF",
          "#F5D578",
        ]}
        style={styles.container}
      >
        {/* header */}
        <View style={styles.header}>
          <Footer />
          <Text style={styles.headingText}>Stories List</Text>
          <MaterialIcons
            name="logout"
            size={30}
            color="white"
            onPress={handleLogout}
          />
        </View>

        {/* Body */}
        {stories.length == 0 ? (
          <View style={styles.bodyOptional}>
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 18,
                fontWeight: "500",
              }}
            >
              No story available at this moment!!!{" "}
              <Text style={{ color: "black", fontSize: 15, fontWeight: "300" }}>
                {"\n"}Please try again later{" "}
              </Text>
            </Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={stories}
            keyExtractor={(item) => item.$id}
            style={{ marginTop: 7 }}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleStoryPress(item.$id)}>
                <StoryRender item={item} />
              </TouchableOpacity>
            )}
          />
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <View>
            <AntDesign
              name="heart"
              size={24}
              color="white"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    // backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 5 : 35,
    alignItems: "center",
  },
  headingText: { fontSize: 20, fontWeight: "600", color: "white" },
  footer: {
    position: "absolute",
    bottom: 50,
    right: 10,
    backgroundColor: "royalblue",
    padding: 23,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  bodyOptional: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: StatusBar.currentHeight ? StatusBar.currentHeight + 15 : 45,
  },
  storyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    overflow: "hidden",
  },
  modalBackView: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "white",
    height: 500,
    width: "100%",
    padding: 15,
    paddingTop: 15,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default StoriesList;
