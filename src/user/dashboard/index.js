import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ChatScreen from './chat/index';
import { Button } from '@rneui/themed';

const Tab = createBottomTabNavigator();

const TrackScreen = ({ navigation }) => {
  const [foodValue, setFoodValue] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
        <View>
        <Text style={styles.trackTitle}>Hallo Pelanggan</Text>
        <Text style={styles.trackSubTitle}>Mau makan apa hari ini?</Text>
        
        <View style={styles.searchContainer} > 
          <TextInput
              style={styles.input}
              placeholder="Cari Makanan"
              value={foodValue}
              onChangeText={setFoodValue}
              autoCorrect={false}
              autoCapitalize="none"
          />

          <FontAwesome name="search" size={24} color="black" onPress={() => { navigation.navigate('Map', { food: foodValue }); }} />

        </View>


        <Text style={styles.mostSearch} > Paling Banyak Dicari</Text>

        <View style={styles.mostSearchContainer}>

            <View style={styles.mostSearchItem}>
            <Text style={styles.mostSearchText}>Ayam Goreng</Text>
            </View>

            <View style={styles.mostSearchItem}>
            <Text style={styles.mostSearchText}>Nasi Goreng</Text>
            </View>

            <View style={styles.mostSearchItem}>
            <Text style={styles.mostSearchText}>Bakso</Text>
            </View>

            <View style={styles.mostSearchItem}>
            <Text style={styles.mostSearchText}>Mie Ayam</Text>
            </View>

            <View style={styles.mostSearchItem}>
            <Text style={styles.mostSearchText}>Soto</Text>
            </View>

            <View style={styles.mostSearchItem}>
            <Text style={styles.mostSearchText}>Mie Goreng</Text>
            </View>

            <View style={styles.mostSearchItem}>
            <Text style={styles.mostSearchText}>Nasi Uduk</Text>
            </View>

        </View>

        </View>
    </KeyboardAvoidingView>
  );
};


const UserScreen = ({ navigation}) => (
  <View style={styles.container}>
    <Button title="Logout" onPress={() => { navigation.navigate('Login'); }} />
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
              iconName = focused ? 'map' : 'map';
            } else if (route.name === 'User') {
              iconName = focused ? 'user-circle' : 'user-circle-o';
            }
  
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            title: 'Chat',
            headerTitle: 'Chat Pedagang',
          }}
        />
        <Tab.Screen
          name="Track"
          component={TrackScreen}
          options={{
            title: 'Cari Pedagang',
            headerTitle: 'Tracking Pedagang kaki Lima',
          }}
        />
        <Tab.Screen
          name="User"
          component={UserScreen}
          options={{
            title: 'User',
            headerTitle: 'My Profile',
          }}
        />
      </Tab.Navigator>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  trackTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  trackSubTitle: {
    fontSize: 18,
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    height: 60,
    width: 300,
    borderRadius: 50,
    backgroundColor: '#EDEDED',
    padding: 20,
    alignSelf: 'center',
    color: '#000'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10
  },
  mostSearch: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  mostSearchContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  mostSearchItem: {
    backgroundColor: '#FFA135',
    borderRadius: 25,
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  mostSearchText: {
    fontSize: 13,
    color: '#fff',
  },
  messageContainer: {
    marginBottom: 10,
    flexDirection: 'row', // Align the avatar and text in a row
  },
  messageBox: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,  // For Android shadow
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10, // Space between avatar and message text
  },
  textContainer: {
    flex: 1,
  },
  sender: {
    fontWeight: 'bold',
    color: '#333',
  },
  message: {
    color: '#555',
  },
});

export default Dashboard;
