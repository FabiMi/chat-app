// Importing the necessary libraries and components
import React, { useEffect, useState } from 'react';
import { GiftedChat, Bubble, Send, Composer } from 'react-native-gifted-chat';
import { StyleSheet, View, KeyboardAvoidingView, Platform, Text} from 'react-native';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';


// Define the Chat component which will be the main component of the app.
const Chat = ({ route, navigation, db, isConnected, storage }) => {

  const { userID, name, color, bubbleColor } = route.params;
  const [messages, setMessages] = useState([]);

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem('messages');
    setMessages(JSON.parse(cachedMessages));
  };

  // Define the addMessage function whzich will be used to add messages to the database.
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


  // Define the useEffect hook to load the messages from the database.
  useEffect(() => {
    if (isConnected === true) {

      // Define the unsubscribe function to stop listening to changes in the database.
      let unsubMessages;

      // Create a query to get the last 20 messages from the database.
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));

      // Subscribe to the query using the onSnapshot method.
      unsubMessages = onSnapshot(q, (docs) => {
        // Loop through the snapshot of the documents returned by the query.
        let newMessages = [];
        docs.forEach((doc) => {
          const data = doc.data();
          newMessages.push({
            _id: doc.id,
            ...data,
            createdAt: data.createdAt ? new Date(data.createdAt.toMillis()) : new Date(),
          });
        });
        // Cache the messages in AsyncStorage
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
      // Return the unsubscribe function to stop listening to changes in the database.
      return () => {
        if (unsubMessages) unsubMessages();
      };
    } else {
      loadCachedMessages();
    }
  }, [isConnected]);

  // Define the cacheMessages function which will be used to cache the messages in AsyncStorage.
  const cacheMessages = async (messageToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messageToCache));
    } catch (error) {
      console.log(error.message);
    }
  };
 // renderBubble function to customize the chat bubble
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
 // renderSend function to customize the send button and disable it when the user is offline 
 const renderSend = (props) => {
  return (
    <Send {...props} disabled={!isConnected}>
      {!isConnected ?
        <Text style={styles.disabledSendButton} >X</Text>
        : null}
    </Send>
  );
}

  const renderComposer = (props) => {
    return (
      <Composer
        {...props}
        disableComposer={!isConnected}
        placeholder={isConnected ? "Type a message" : "App is currently in offline mode"}
      />
    );
  }

  // renderCustomActions function to customize the action button
  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} />;
  };
// renderCustomView function to customize the map view
  const renderCustomView = (props) => {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
        // Display the map view with the location data passed to it.
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }

// Return the GiftedChat component with the required props.
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
        renderComposer={renderComposer}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  );
};
// Define the styles for the Chat component.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    border: 'none',
    marginbuttom: 3,
  },

  
  

  disabledSendButton: {
    color: 'gray',
    lineHeight: 43,
    paddingRight: 10,

   
  },
});

export default Chat;
