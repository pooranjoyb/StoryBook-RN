import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { persistor, store } from './utils/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from './ThemeContext';
import HeaderWithTheme from './Components/HeaderWithTheme';

import Signup from './Components/Signup';
import Home from './Components/Home';
import Login from './Components/Login';
import Profile from './Components/Profile';
import StoriesList from './Components/StoriesList';
import Story from './Components/Stories';

const Stack = createStackNavigator();


const App = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ThemeProvider>
                    <NavigationContainer>
                        <Stack.Navigator
                            initialRouteName="Home"
                            screenOptions={{
                                headerRight: () => <HeaderWithTheme />,
                            }}
                        >
                            <Stack.Screen name="Home" component={Home} />
                            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                            <Stack.Screen name="Profile" component={Profile} />
                            <Stack.Screen name="Story" component={Story} />
                            <Stack.Screen name="StoriesList" component={StoriesList} />
                        </Stack.Navigator>
                        {/* <StatusBar style="auto" /> */}
                    </NavigationContainer>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
};

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
              {<Stack.Screen name="Story" component={Story} options={{headerShown: false}} />}
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
        </PersistGate>
    </Provider>
  );
}


export default App;
