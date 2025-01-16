import React, { useState, useCallback } from 'react';
import { View, Image, StyleSheet, SafeAreaView } from 'react-native';
import { Text } from '@rneui/themed';
import { GiftedChat } from 'react-native-gifted-chat';

const DetailChat = ({ route }) => {
  const { id, name, avatar_url } = route.params;
  const [messages, setMessages] = useState([]);

  // Initial messages for the chat
  const initialMessages = [
    {
      _id: 1,
      text: 'Oke a saya otewei',
      createdAt: new Date(),
      user: {
        _id: 2, // sender id (recipient)
        name: name,
        avatar: avatar_url,
      },
    },
    {
      _id: 2,
      text: 'Kang saya mau bakso ',
      createdAt: new Date(),
      user: {
        _id: 1, // user id (sender)
        name: 'User',
      },
    },
  ];

  // Use initial messages when the component is first loaded
  useState(() => {
    setMessages(initialMessages);
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
  }, []);

  return (
    <>
      <View style={{ backgroundColor: 'white', marginTop: 25 }}>
        <View style={{ flexDirection: 'row', padding: 20 }}>
          <Image
            source={avatar_url}
            style={{ width: 50, height: 50, borderRadius: 50 }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.fonts} h4>
              {name}
            </Text>
            <Text style={styles.fonts} h5>
              10 menit yang lalu
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1, // user id (sender)
            name: 'User',
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  fonts: {
    fontSize: 16,
    color: '#333',
  },
});

export default DetailChat;
