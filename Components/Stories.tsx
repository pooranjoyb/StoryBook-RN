
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { db } from '../utils/appwrite/service';
import { useTheme } from '../ThemeContext';
import React, { useEffect, useState, useContext } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Image,
  FlatList,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { db } from "../utils/appwrite/service";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface RouteParams {
  storyId?: string;
}

const Story = () => {
    const route = useRoute();
    const params = route.params as RouteParams;
    const [story, setStory] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isDarkMode } = useTheme(); 
  const route = useRoute();
  const params = route.params as RouteParams;
  const [story, setStory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchStory = async () => {
      try {
        if (params.storyId) {
          const response = await db.getDocument(
            "657ef4698093d40c3e86",
            "657ef47a34784a4383d1",
            params.storyId
          );
          setStory(response as never);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching story:", error);
        setLoading(false);
      }
    };

    fetchStory();
  }, [params.storyId]);

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
        <Text style={{ fontSize: 15, color: "#0000ff" }}>
          Loading, Please wait!!!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* // Header */}
      <View style={styles.heading}>
        <Ionicons name="arrow-back-outline" size={24} color="white" onPress={() => navigation.goBack()} />
        <Text style={styles.headingFont}>Story</Text>
      </View>
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={{ padding: 16, backgroundColor: isDarkMode ? '#121212' : '#fff' }}>
            {story.length === 0 ? (
                <Text>No story available</Text>
            ) : (
                <>
                    <ScrollView style={{ height: '100%', width: '100%' }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: isDarkMode ? '#fff' : '#000' }}>
                            {story.title}
                        </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', paddingTop: 20, color: isDarkMode ? '#fff' : '#000' }}>
                            Author : {story.author}
                        </Text>
                        <Text style={{ paddingTop: 15, fontSize: 17, color: isDarkMode ? '#fff' : '#000' }}>{story.data}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, paddingTop: 20, color: isDarkMode ? '#fff' : '#000' }}>
                            MORAL : {story.moral}
                        </Text>
                    </ScrollView>
                </>
            )}
        </View>
    );
      {/* body */}
      <LinearGradient style={styles.bodyCover} colors={["#1FA3FB", "#3498DB"]}>
        {story.length === 0 ? (
          <View style={styles.secondaryBody}>
            <Text style={styles.secondaryBodyText1}>
              Story is not avilable at this moment.{" "}
              <Text style={styles.secondaryBodyText2}>
                {"\n"}please try again later!!!
              </Text>
            </Text>
          </View>
        ) : (
          <>
            <ScrollView
              style={styles.mainBody}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.bodyHeading}>
                <Text style={styles.bodyHeadingText1}>Title: </Text>
                <Text style={styles.bodyHeadingText2}>{story.title}</Text>
              </View>

              <View style={styles.bodyHeading}>
                <Text style={styles.bodyHeadingText1}>Author: </Text>
                <Text style={styles.bodyHeadingText2}>{story.author}</Text>
              </View>

              <View style={styles.discriptionHeading}>
                <Text style={styles.discriptionHeadingText1}>StoryLine: </Text>
                <Text style={styles.discriptionHeadingText2}>{story.data}</Text>
              </View>

              <View style={styles.moral}>
                <Text style={styles.moralHeadingText1}>Moral: </Text>
                <Text style={styles.moralHeadingText2}>{story.moral}</Text>
              </View>
            </ScrollView>
          </>
        )}
      </LinearGradient>

      {/* Footer */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    paddingHorizontal: 10,
    flexDirection: "row",
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 5 : 35,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomWidth: 2,
    borderColor: "#3498DB",
    // overflow: "visible",
    backgroundColor: "#1FA3FB",
    elevation: 15,
  },
  headingFont: {
    fontSize: 20,
    fontWeight: "500",
    paddingHorizontal: 7,
    color: "white",
  },
  bodyCover: {
    flex: 1,
    paddingHorizontal: 10,
    color: "white",
  },
  secondaryBody: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
    color: "white",
  },
  secondaryBodyText1: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    textTransform: "uppercase",
    color: "white",
  },
  secondaryBodyText2: {
    fontSize: 13,
    fontWeight: "300",
    color: "white",
    textAlign: "center",
  },
  mainBody: {},
  bodyHeading: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "flex-start",
    marginTop: 15,
  },
  bodyHeadingText1: {
    fontSize: 15,
    fontWeight: "300",
    textTransform: "uppercase",
    // color: "white",
  },
  bodyHeadingText2: {
    fontSize: 24,
    fontWeight: "600",
    paddingHorizontal: 7,
    color: "white",
  },
  discriptionHeading: {
    marginTop: 20,
    color: "white",
  },
  discriptionHeadingText1: {
    fontSize: 24,
    fontWeight: "700",
    // color: "white",
  },
  discriptionHeadingText2: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "justify",
    color: "white",
  },
  moral: {
    marginTop: 50,
    color: "white",
  },
  moralHeadingText1: {
    fontSize: 24,
    fontWeight: "700",
    // color: "white",
  },
  moralHeadingText2: {
    marginTop: 5,
    fontSize: 19,
    fontWeight: "500",
    textAlign: "justify",
    color: "white",
  },
  footer: {},
});

export default Story;
