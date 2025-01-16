import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { ListItem, Avatar, Button } from '@rneui/themed';

const MapScreen = ({ route }) => {
  const { searchValue } = route.params || {}; // Ambil parameter yang dikirimkan
  const [region, setRegion] = useState({
    latitude: -6.9579562555987975,
    longitude: 107.72605057871179,
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

  const MenuList = [
    {
        id: 1,
        name: 'Bakso Solo',
        avatar_url: require('../../../assets/bakso.png'),
        price: 'Rp 10000',
        id_seller: 1,
        name: 'Bakso Ikan',
        avatar_url: require('../../../assets/bakso2.png'),
        last_message: 'maaf a baksonya abis',
    },
    {
        id: 2,
        name: 'Bakso Ikan',
        avatar_url: require('../../../assets/bakso2.png'),
        price: 'Rp 12000',
        id_seller: 2,
        name: 'Bakso Ikan',
        avatar_url: require('../../../assets/bakso2.png'),
        last_message: 'maaf a baksonya abis',
    },
];

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        <Marker
          coordinate={{ latitude: region.latitude, longitude: region.longitude }}
          title={searchQuery?.replace(/_/g, ' ')} // Tampilkan nilai pencarian
          description="Current location"
        />
      </MapView>

      {/* <TouchableOpacity style={[styles.buttonContainer, styles.zoomInButton]} onPress={handleZoomIn}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonContainer, styles.zoomOutButton]} onPress={handleZoomOut}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity> */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari Makanan"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => {}}>
          <Text style={styles.searchButtonText}>Cari</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
      <FlatList
        data={MenuList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ListItem
            containerStyle={styles.listItemContainer}
            onPress={() =>
              navigation.navigate('DetailChat', {
                id: item.id,
                name: item.name,
                avatar_url: item.avatar_url,
              })
            }
          >
            <Avatar rounded source={item.avatar_url} size={64} />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{item.name}</ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}>
                {item.price}
              </ListItem.Subtitle>
            </ListItem.Content>
            <View style={{ flexDirection: 'column', gap: 10, paddingHorizontal: 10 }} >
              <Button
                title="Order"
                buttonStyle={{ backgroundColor: 'red', borderRadius: 12.5 }}
                titleStyle={styles.buttonTitle}
                onPress={() => Alert.alert('Order', `Ordering ${item.name}`)}
              />
              <Button
                title="Chat"
                buttonStyle={{ backgroundColor: '#FFA135', borderRadius: 12.5 }}
                titleStyle={styles.buttonTitle}
                onPress={() =>
                  navigation.navigate('DetailChat', {
                    id: item.id,
                    name: item.name,
                    avatar_url: item.avatar_url,
                  })
                }
              />

            </View>
          </ListItem>
        )}
      />
      </View>

      <View style={styles.card2}>
        <Button
          buttonStyle={{ backgroundColor: '#FFA135', width: '100%', borderRadius: 12.5 }}
          title="Tampilkan Semua"
          onPress={() => {}}
        />
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
  searchContainer: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'transparent',
    top: 10,
    left: 20,
    right: 20,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#ccc',
    borderRadius: 25,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  card: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'transparent',
    bottom: 70,
    left: 20,
    right: 20,
    padding: 10,
    backgroundColor: '#ccc',
    // borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card2: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'transparent',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 5,
    backgroundColor: '#ccc',
    // borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
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
