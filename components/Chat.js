//Importing the necessary libraries and components
import React, { useEffect, useState } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { StyleSheet, View,  KeyboardAvoidingView,  Platform } from 'react-native';
import { collection, addDoc, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

//Define the Chat component which will be the main component of the app.
const Chat = ({ route, navigation, db, isConnected }) => {
  const { userID, name, color, bubbleColor } = route.params;
  const [messages, setMessages] = useState([]);

const loadCachedMessages = async () => {  
  const cachedMessages = await AsyncStorage.getItem('messages');
  SectionList(JSON.parse(cachedMessages));
}

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
// Define the useEffect hook to get the messages from the database.


let unsubMessages;

useEffect(() => {
  if (isConnected === true) {
    if (unsubMessages) unsubMessages();
    unsubMessages = null;
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach((doc) => {
        const data = doc.data();
        newMessages.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt ? new Date(data.createdAt.toMillis()) : new Date(),
        });
      });
      cacheMessages(newMessages);
      setMessages(newMessages);
    });
  } else {
    loadCachedMessages();
  }

  const cacheMessages = async (messageToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messageToCache));
    } catch (error) {
      console.log(error.message);
    }
  };


  return () => {
    if (unsubMessages) unsubMessages();
  };
}, [isConnected]);


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

  return (
    <View style={[styles.container, {backgroundColor: isConnected ? color : "#AAA"  }]}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => addMessage(messages)}
        user={{ _id: userID, name: name }}
        renderBubble={renderBubble}
        renderUsernameOnMessage={true}

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
});

export default Chat;