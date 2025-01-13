import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route }) => {
  const { searchValue } = route.params || {}; // Ambil parameter yang dikirimkan
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [searchQuery, setSearchQuery] = useState(searchValue || ''); // Simpan nilai pencarian ke state

  const handleZoomIn = () => {
    setRegion(prevRegion => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta / 2,
      longitudeDelta: prevRegion.longitudeDelta / 2,
    }));
  };

  const handleZoomOut = () => {
    setRegion(prevRegion => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta * 2,
      longitudeDelta: prevRegion.longitudeDelta * 2,
    }));
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        <Marker
          coordinate={{ latitude: region.latitude, longitude: region.longitude }}
          title={searchQuery?.replace(/_/g, ' ')} // Tampilkan nilai pencarian
          description="Current location"
        />
      </MapView>

      <TouchableOpacity style={[styles.buttonContainer, styles.zoomInButton]} onPress={handleZoomIn}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonContainer, styles.zoomOutButton]} onPress={handleZoomOut}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <View>
          <Text style={styles.cardText}>Latitude: <Text style={styles.highlightText}>{region.latitude}</Text></Text>
          <Text style={styles.cardText}>Longitude: <Text style={styles.highlightText}>{region.longitude}</Text></Text>
          <Text style={styles.cardText}>Altitude: <Text style={styles.highlightText}>{'Altitude'}</Text> mdpl</Text>
          <Text style={styles.cardText}>Speed: <Text style={styles.highlightText}>{'Speed'}</Text> km/h</Text>
        </View>
        <View>
          <Text style={styles.cardText}>Direction: <Text style={styles.highlightText}>{'Direction'}°</Text></Text>
          <Text style={styles.cardText}>Time: <Text style={styles.highlightText}>{'Time'}</Text></Text>
          <Text style={styles.cardText}>Date: <Text style={styles.highlightText}>{'Date'}</Text></Text>
        </View>
      </View>

      <View style={styles.card2}>
        <Text style={styles.card2Text}>X: <Text style={styles.highlightText}>{'X'}</Text></Text>
        <Text style={styles.card2Text}>Y: <Text style={styles.highlightText}>{'Y'}</Text></Text>
        <Text style={styles.card2Text}>Z: <Text style={styles.highlightText}>{'Z'}</Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  loading: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  card: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#0774B8',
    bottom: 110,
    left: 20,
    right: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card2: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#0774B8',
    bottom: 65,
    left: 20,
    right: 20,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardText: {
    fontSize: 14,
    marginBottom: 5,
    marginHorizontal: 10,
  },
  card2Text: {
    fontSize: 14,
    marginBottom: 5,
    marginHorizontal: 45,
  },
  highlightText: {
    color: '#0774B8',
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    backgroundColor: '#0774B8',
    borderRadius: 25,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomInButton: {
    top: 20,
    right: 20,
  },
  zoomOutButton: {
    top: 60,
    right: 20,
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default MapScreen;
