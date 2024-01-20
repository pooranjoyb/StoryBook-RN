import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { persistor, store } from './utils/redux/store';

import Signup from './Components/Signup';
import Home from './Components/Home';
import Login from './Components/Login';
import Profile from './Components/Profile';
import StoriesList from './Components/StoriesList';
import Story from './Components/Stories';
import { PersistGate } from 'redux-persist/integration/react';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
            <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}} />
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
            {<Stack.Screen name="Profile" component={Profile} options={{headerShown: false}} />}
            {<Stack.Screen name="StoriesList" component={StoriesList} options={{headerShown: false}} />}
            {<Stack.Screen name="Story" component={Story} />}
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
        </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
