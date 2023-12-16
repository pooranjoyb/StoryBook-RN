import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type WelcomeRouteProps = {
  Welcome: { username: string };
};

type WelcomeNavigationProps = StackNavigationProp<WelcomeRouteProps, 'Welcome'>;

type Props = {
  route: RouteProp<WelcomeRouteProps, 'Welcome'>;
  navigation: WelcomeNavigationProps;
};

const Profile: React.FC<Props> = ({ route }) => {
  const { username } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Welcome, {username}!</Text>
      <Text>You can update your profile details here.</Text>
      
    </View>
  );
};

export default Profile;
