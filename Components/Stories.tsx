import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { db } from '../utils/appwrite/service';

interface RouteParams {
    storyId?: string;
}

const Story = () => {
    const route = useRoute();
    const params = route.params as RouteParams;
    const [story, setStory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStory = async () => {
            try {
                if (params.storyId) {
                    const response = await db.getDocument('657ef4698093d40c3e86', '657ef47a34784a4383d1', params.storyId);
                    setStory(response as never);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching story:', error);
                setLoading(false);
            }
        };

        fetchStory();
    }, [params.storyId]);

    if (loading) {
        return (
          <View style={{flex: 1,
            justifyContent: 'center',
            alignItems: 'center',}}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
      }

    return (
        <View style={{ padding: 16 }}>
            {
                story.length === 0 ? (
                    <Text>No story available</Text>
                ) : (
                    <>
                     <ScrollView style={{height: '100%', width: '100%'}}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{story.title}</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', paddingTop: 20 }}>Author : {story.author}</Text>

                        <Text style={{ paddingTop: 15, fontSize:17 }}>{story.data}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize:20, paddingTop: 20 }}>MORAL : {story.moral}</Text>
                        </ScrollView>
                    </>
                )
            }
        </View>
    );
};

export default Story;
