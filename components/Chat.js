//Import necessary dependencies from the react, react-native, and react-native-gifted-chat libraries.
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform  } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

//Define the Chat component which accepts route and navigation as props.
const Chat = ({ route, navigation }) => {

  //Destructure the name, color, and bubbleColor from route.params. These values are passed from the Start component.
  const { name, color, bubbleColor } = route.params;

  //Initialize the messages state variable using the useState hook to an empty array.
  const [messages, setMessages] = useState([]);


//Use the useEffect hook to set options for the navigation header and initialize the messages state with some initial chat messages when the component mounts. 
  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerStyle: { backgroundColor: color },
      headerTintColor: bubbleColor,
    });
    setMessages([
      {

        // Define the initial chat messageusing the setMessages function.
        _id: 1,
        text: `Hello ${name}! Welcome to my chat app!`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        // Define the initial sytem message using the setMessages function.
        _id: 2,
        text: 'This is a system message',
        createdAt: new Date(),
        system: true,

        // Any additional custom parameters (The User) are passed through
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
          createdAt: new Date(),
          system: true,
      
        },
      },
    ]);
  }, []);

  //Define the onSend function which will be used to update the messages state with the latest chat messages.
  const onSend = (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  };
 // Define a renderBubble function to customize the appearance of chat bubbles based on the sender (left or right).
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            // Customize the chat bubble wrapper style for received messages  
            backgroundColor:bubbleColor,
            borderRadius: 20,
          
          },
          right: {
            // Customize the chat bubble wrapper style for sent messages
            backgroundColor:  'maroon',
            borderRadius: 20,
          }
        }}
        textStyle={{
          // Customize the text style inside the chat bubble
          color: 'white',
        }}
      />
    );
  };

  return (
    // Pass the color prop to the container style using the color variable.
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
    // Pass the messages state variable to the gifted chat component  
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1
        }}
        renderBubble={renderBubble} // Pass the custom renderBubble function
      />
       { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      

    </View>
    
  );
};
// Define the styles for the Chat component.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    border: "none"
  },
});

export default Chat;
