import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TrackScreen = () => {
  const [foodValue, setFoodValue] = useState('');
  const navigation = useNavigation(); // Akses navigation

  const handleSearch = (query) => {
    navigation.navigate('Map', { searchValue: query }); // Pindah ke halaman Map dengan parameter
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View>
        <Text style={styles.trackTitle}>Hallo Pelanggan</Text>
        <Text style={styles.trackSubTitle}>Mau makan apa hari ini?</Text>

        <TextInput
          style={styles.input}
          placeholder="Cari Makanan"
          value={foodValue}
          onChangeText={setFoodValue}
          onSubmitEditing={() => handleSearch(foodValue)} // Arahkan ke map saat selesai mengetik
          autoCorrect={false}
          autoCapitalize="none"
        />

        <Text style={styles.mostSearch}>Paling Banyak Dicari</Text>

        <View style={styles.mostSearchContainer}>
          {['Ayam Goreng', 'Nasi Goreng', 'Bakso', 'Mie Ayam', 'Soto', 'Mie Goreng', 'Nasi Uduk'].map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleSearch(item)}>
              <View style={styles.mostSearchItem}>
                <Text style={styles.mostSearchText}>{item}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </KeyboardAvoidingView>
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
    height: 35,
    width: 300,
    borderRadius: 50,
    backgroundColor: '#EDEDED',
    padding: 20,
    alignSelf: 'center',
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
});

export default TrackScreen;
