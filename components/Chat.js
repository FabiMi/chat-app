import React, { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform  } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const Chat = ({ route, navigation }) => {
  const { name, color, bubbleColor } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerStyle: { backgroundColor: color },
      headerTintColor: bubbleColor,
      justifyContent: 'center'
    });
    setMessages([
      {
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
        _id: 2,
        text: 'This is a system message',
        createdAt: new Date(),
        system: true,

        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
          createdAt: new Date(),
          system: true,
      
        },
      },
    ]);
  }, []);

  const onSend = (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  };

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
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    border: "none"
  },
});

export default Chat;
