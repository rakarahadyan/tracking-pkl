import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TrackScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Track Screen</Text>
  </View>
);

const UserScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>User Screen</Text>
  </View>
);


const ChatScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Chat Screen</Text>
  </View>
);

const Dashboard = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
  
            if (route.name === 'Chat') {
              iconName = focused ? 'comments' : 'comments-o';
            } else if (route.name === 'Track') {
              iconName = focused ? 'map-marker' : 'map-marker';
            } else if (route.name === 'User') {
              iconName = focused ? 'user-circle' : 'user-circle-o';
            }
  

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato', 
          tabBarInactiveTintColor: 'gray', 
        })}
      >
        <Tab.Screen name="Chat" component={ChatScreen} options={{ title: 'Messaging' }} />
        <Tab.Screen name="Track" component={TrackScreen} options={{ title: 'Tracking Pedagang Kaki Lima' }} />
        <Tab.Screen name="User" component={UserScreen} options={{ title: 'My Profile' }} />
      </Tab.Navigator>
    );
  };

export default Dashboard;
