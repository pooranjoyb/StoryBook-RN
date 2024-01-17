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

    const handleStoryPress = (storyId: string) => {
        navigation.navigate('Story', { storyId });
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#3498db" />
                </View>
            ) : (
                stories.length === 0 ? (
                    <Text style={styles.noStoryText}>No stories available</Text>
                ) : (
                    <FlatList
                        data={stories}
                        keyExtractor={(item) => item.$id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleStoryPress(item.$id)}>
                                <View style={styles.storyCard}>
                                    <Text style={styles.storyTitle}>{item.title}</Text>
                                    <Text style={styles.storyDetails}>{item.details}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                )
            )}
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#3498db',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noStoryText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#fff',
    },
    storyCard: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 5,
        borderColor: 'rgba(255, 255, 255, 0.4)', // Semi-transparent white border
        elevation: 5,
    },
    storyTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25,
        color: '#fff',
        marginBottom: 8,
    },
    storyDetails: {
        textAlign: 'center',
        fontSize: 16,
        color: '#fff',
    },
});

export default StoriesList;
