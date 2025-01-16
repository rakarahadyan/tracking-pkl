import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ListItem, Avatar } from '@rneui/themed';

const listChat = [
    {
        id: 1,
        name: 'Bakso Solo',
        avatar_url: require('../../../../assets/bakso.png'),
        last_message: 'Oke a saya otewei',
    },
    {
        id: 2,
        name: 'Bakso Ikan',
        avatar_url: require('../../../../assets/bakso2.png'),
        last_message: 'maaf a baksonya abis',
    },
];

const ChatScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={listChat}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ListItem
            containerStyle={{
              marginHorizontal: 16,
              marginVertical: 8,
              borderRadius: 8,
            }}
            onPress={()=>navigation.navigate('DetailChat', { id: item.id, name: item.name, avatar_url: item.avatar_url })}
          >
            <Avatar rounded source={item.avatar_url} size={64} /> 
            <ListItem.Content>
              <ListItem.Title style={{ color: 'black', fontWeight: 'bold' }}>
                {item.name}
              </ListItem.Title>
              <ListItem.Subtitle style={{ color: 'black' }}>
                {item.last_message}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron color="black" />
          </ListItem>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default ChatScreen;
