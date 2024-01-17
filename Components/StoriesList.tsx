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

    const getRandomColor = () => {
        const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6']; // Add more colors if needed
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
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
                                <View style={[styles.storyContainer, { backgroundColor: getRandomColor() }]}>
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
        backgroundColor: 'pink',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    noStoryText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#555',
    },
    storyContainer: {
        padding: 30,
        borderRadius: 12,
        marginBottom: 12,
        backgroundColor: '#fff',
        elevation: 5, // Add elevation for a shadow effect on Android
    },
    storyTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25,
        color: 'green',
        marginBottom: 8,
    },
    storyDetails: {
        textAlign: 'center',
        fontSize: 16,
        color: '#555',
    },
    
});

export default StoriesList;
