import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TrackScreen = () => {
  const [foodValue, setFoodValue] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.trackTitle}>Hallo Pelanggan</Text>
      <Text style={styles.trackSubTitle}>Mau makan apa hari ini?</Text>

      <TextInput
        style={styles.input}
        placeholder="Cari Makanan"
        value={foodValue}
        onChangeText={setFoodValue}
        autoCorrect={false}
        autoCapitalize="none"
      />

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
  );
};


const UserScreen = () => (
  <View style={styles.container}>
    <Text>User Screen</Text>
  </View>
);


const ChatScreen = () => (
  <View style={styles.container}>
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
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            title: 'Chat',
            headerTitle: 'Chat',
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
  },
  trackSubTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    height: 35,
    width: '100%',
    borderRadius: 50,
    backgroundColor: '#EDEDED',
    padding: 20,
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
  }
});

export default Dashboard;
