import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { account } from '../utils/appwrite/service';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setUser } from '../utils/redux/userSlice';

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
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await account.deleteSession('current');
    
    const user = { username: '', isAuthenticated: false };
    dispatch(setUser(user))
    navigation.navigate('Home' as never);
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Welcome, {username}!</Text>
      <Text>You can update your profile details here.</Text>
      <View style={{ backgroundColor: '#f8f8f8', padding: 16, alignItems: 'center', justifyContent: 'center', bottom: 0 }}>
        <Pressable onPress={handleLogout}>
          <Text style={{ color: '#007BFF', fontWeight: 'bold' }}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Profile;
