import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../utils/appwrite/service';

import Footer from './Footer';

const StoriesList = () => {
    const navigation = useNavigation();
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await db.listDocuments('657ef4698093d40c3e86', '657ef47a34784a4383d1');
                setStories(response.documents as never);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching stories:', error);
                setLoading(false);
            }
        };

        fetchStories();
    }, []);

    if (loading) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const handleStoryPress = (storyId: string) => {
        navigation.navigate('Story', { storyId });
    };

    return (
        <>
            <View style={styles.container}>
                {
                    stories.length === 0 ? (
                        <Text>No story available</Text>
                    ) : (
                        <FlatList
                            data={stories}
                            keyExtractor={(item) => item.$id}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleStoryPress(item.$id)}>
                                    <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                                        <Text style={{
                                            fontSize: 18
                                        }}>{item.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    )
                }

                {/* Updating Footer style beause (View Profile) tab is not visible in StoryList Page (Now it's easy to navigate)*/}
                <View style={{flex:1, justifyContent: 'center'}}>
                    <Footer />
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex", alignItems: 'center', height: 750, justifyContent: 'space-between'
    }

});

export default StoriesList;
