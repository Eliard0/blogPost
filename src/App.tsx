import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import { FavoritesProvider } from './views/ContextApi';

import LoginScreen from './views/Login';
import RegisterScreen from './views/Register';
import Home from './views/Home';
import Favorite from './views/Favorite';
import NewPost from './views/NewPost';
import Profile from './views/Profile';
import DetailPost from './views/DetailPost';

export type StackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  NewPost: undefined;
  Favorite: undefined;
  Profile: { userId: number, userName: String, profileImageUrl: String };
  DetailPost: { userId: number, userName: String, profileImageUrl: String, title: String, body: String }
};

const Stack = createStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator();

const HomeTabs = () => (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0F90D9',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={Favorite}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <Icon name="star" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
);

const App = () => {
  return (
  <FavoritesProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeTabs} />

        <Stack.Screen name="NewPost" component={NewPost} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="DetailPost" component={DetailPost} />
      </Stack.Navigator>
    </NavigationContainer>
  </FavoritesProvider>
  );
};

export default App;
