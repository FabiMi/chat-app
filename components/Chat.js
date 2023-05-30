import React, { useEffect, useState } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { StyleSheet, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert, Platform } from 'react-native';
import { collection, addDoc, onSnapshot, query, orderBy, where,  } from 'firebase/firestore';



// Define the Chat component which will be the screen where the user will be able to send and receive messages.
const Chat = ({ route, navigation, db }) => {


  
  const { userID, name, color, bubbleColor } = route.params;   // Destructure the route.params object to get the uid, name, color and bubbleColor values passed from the Start component.  
  const [messages, setMessages] = useState([]);// Define the messages state variable using the useState hook. It will hold the messages sent and received by the user.


// Define the addMessage function which will be used to add a new message to the messages collection in Cloud Firestore.  
  const addMessage = async (newMessages) => {
    try {
      for (const message of newMessages) {
        const newMessageRef = await addDoc(collection(db, "messages"), message);
        if (!newMessageRef.id) {
          Alert.alert("Unable to send message. Please try again later.");
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
// Define the useEffect hook to update the navigation options with the selected name, color and bubbleColor values.
  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerStyle: { backgroundColor: color },
      headerTintColor: bubbleColor,
    });
   
  }, []);


// Define the useEffect hook to get the messages from Cloud Firestore.  
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach((doc) => {
        const data = doc.data();
        newMessages.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt ? new Date(data.createdAt.toMillis()) : new Date(),
        });
      });
      setMessages(newMessages);
    });
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);






// Define the renderBubble function which will be used to customize the appearance of the messages sent and received by the user.
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


  // Define the renderInputToolbar function which will be used to hide the input toolbar when the user is offline.  
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => addMessage(messages)}
        user={{ _id: userID, name }}
        renderBubble={renderBubble}
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
