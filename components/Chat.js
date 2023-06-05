// Importing the necessary libraries and components
import React, { useEffect, useState } from 'react';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { StyleSheet, View, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the Chat component which will be the main component of the app.
const Chat = ({ route, navigation, db, isConnected }) => {
  const { userID, name, color, bubbleColor } = route.params;
  const [messages, setMessages] = useState([]);

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem('messages');
    setMessages(JSON.parse(cachedMessages));
  };

  // Define the addMessage function which will be used to add messages to the database.
  const addMessage = async (newMessages) => {
    try {
      // Loop through the new messages and add them to the database
      for (const message of newMessages) {
        const { user } = message;

        // Create the system log message
        const systemLogMessage = {
          _id: Math.random().toString(),
          text: `Message sent by ${user.name} at ${new Date().toLocaleTimeString()}`,
          createdAt: new Date(),
          system: true,
        };

        // Add the user message and system log message to the database
        await Promise.all([
          addDoc(collection(db, 'messages'), message),
          addDoc(collection(db, 'messages'), systemLogMessage),
        ]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Define the useEffect hook to set the title of the screen and the header styles.
  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerStyle: { backgroundColor: color },
      headerTintColor: bubbleColor,
    });
  }, []);

  useEffect(() => {
    if (isConnected === true) {
      let unsubMessages;
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach((doc) => {
          const data = doc.data();
          newMessages.push({
            _id: doc.id,
            ...data,
            createdAt: data.createdAt ? new Date(data.createdAt.toMillis()) : new Date(),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });

      return () => {
        if (unsubMessages) unsubMessages();
      };
    } else {
      loadCachedMessages();
    }
  }, [isConnected]);

  const cacheMessages = async (messageToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messageToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: bubbleColor,
            borderRadius: 20,
          },
          right: {
            backgroundColor: 'maroon',
            borderRadius: 20,
          },
        }}
        textStyle={{
          color: 'white',
        }}
      />
    );
  };

  const renderSend = (props) => {
    if (!isConnected) {
      return (
        <Send {...props} disabled={true}>
          <Text style = {styles.disabledSendButton} >Unable to send now</Text>
        </Send>
      );
    }

   
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        onSend={addMessage}
        user={{ _id: userID, name: name }}
        renderBubble={renderBubble}
        renderUsernameOnMessage={true}
        renderSend={renderSend}
        alwaysShowSend={true}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    border: 'none',
  },

  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
    backgroundColor: 'blue',
  },

  disabledSendButton: {
    color: 'gray',
    justifyContent: 'center',
    alignItems: 'center',

   
  },
});

export default Chat;
