import { getAuth, signInAnonymously } from "firebase/auth";

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

 

const Start = ({ navigation }) => {

  //Define the name state variable using the useState hook. It will hold the username entered by the user.
  const [name, setName] = useState('');

  //State variable selectedColor using the useState hook. It will hold the selected background color
  const [selectedColor, setSelectedColor] = useState('');

  //State variable bubbleColor using the useState hook. It will hold the selected text color
  const [bubbleColor, setBubbleColor] = useState('#FFFFFF'); // Default text color

  // Initialize Firebase Authentication
  const auth = getAuth();


//Define the signInUser function which will be used to sign in the user anonymously.
  const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate("Chat", {
          userID: result.user.uid,
          name: name,
          backgroundColor: color,
       
         });
         Alert.alert("Signed in Successfully!");
          })
          .catch((error) => {
            Alert.alert("Unable to sign in, try later again.");
          })
      
     
  }

  

   

  //Define a handleColorSelection function which will be used to update the selectedColor state variable when a color is selected.
  const handleColorSelection = (color) => {
    setSelectedColor(color);
    let newBubbleColor

    //Update the bubbleColor state variable based on the selected color.
    if (color === '#090C08') {
      newBubbleColor = '#B9C6AE';
      setBubbleColor('#B9C6AE');

    } else if (color === '#474056') {
      newBubbleColor = '#B9C6AE'
      setBubbleColor('#B9C6AE');

    }
    else if (color === '#8A95A5') {
      newBubbleColor = '#B9C6AE'
      setBubbleColor('#B9C6AE');
    }
    else if (color === '#B9C6AE') {
      newBubbleColor = '#8A95A5'
      setBubbleColor('#8A95A5');
    }
//Update the navigation header style and text color based on the selected color.
    navigation.setOptions({
      headerStyle: { backgroundColor: color },
      headerTintColor: newBubbleColor,
    });
  };

  return (
    //Define the Start component which accepts navigation as a prop.
    <View style={styles.container}>
      <ImageBackground source={require('../assets/BackgroundImage.png')} style={styles.backgroundimage} />

      <View style={styles.box1}>
        <Text style={styles.title}>Fabis Chat App</Text>
      </View>

     {/*Define the interactionbox which will contain the TextInput, color selection options, and the Start Chatting button.*/}
      <View style={styles.interactionbox}>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder='Type your username here'
        />

        <View style={styles.colorchoosewrapper}>
          <Text style={styles.text2}>Choose Background Color:</Text>

          {/*Define the colorchoosebox which will contain the color selection options.*/}

          <View style={styles.colorchoosebox}>
            <TouchableOpacity
              style={[styles.colorchoose1, { backgroundColor: '#090C08' }]}
              onPress={() => handleColorSelection('#090C08')}
            />
            <TouchableOpacity
              style={[styles.colorchoose2, { backgroundColor: '#474056' }]}
              onPress={() => handleColorSelection('#474056')}
            />
            <TouchableOpacity
              style={[styles.colorchoose3, { backgroundColor: '#8A95A5' }]}
              onPress={() => handleColorSelection('#8A95A5')}
            />
            <TouchableOpacity
              style={[styles.colorchoose4, { backgroundColor: '#B9C6AE' }]}
              onPress={() => handleColorSelection('#B9C6AE')}
            />
          </View>
        </View>


        {/*Define the Start Chatting button which will navigate to the Chat screen when pressed and pass name, color and bubbleColor as props*/}
        <View style={styles.confirmationbutton}>
          <TouchableOpacity
            onPress=  {()  =>{
               signInUser()
            }}
         
            disabled={!name || !selectedColor}
          >
            <Text style={styles.text1}>Start Chatting</Text>
          </TouchableOpacity>
        </View>

       
      </View>
      {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior='padding' /> : null}
    </View>
  );
};

{/*Define the styles for the Start component.*/ }
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundimage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  box1: {
    flex: 44,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  interactionbox: {
    minHeight: 340,
    backgroundColor: 'white',
    marginLeft: '11%',
    marginRight: '11%',
    marginBottom: '11%',
    position: 'relative',
  },
  colorchoosewrapper: {
    flex: 1,
    marginTop: '5%',
    textAlign: 'center',
  },
  colorchoosebox: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: '11%',
    marginRight: '11%',
    justifyContent: 'center',
  },
  colorchoose1: {

    backgroundColor: '#090C08',
    borderRadius: 50 / 2,
    height: 50,
    width: 50,
    margin: '2%',
  },
  colorchoose2: {
    
    backgroundColor: '#474056',
    borderRadius: 50 / 2,
    height: 50,
    width: 50,
    margin: '2%',
  },
  colorchoose3: {
   
    backgroundColor: '#8A95A5',
    borderRadius: 50 / 2,
    height: 50,
    width: 50,
    margin: '2%',
  },
  colorchoose4: {
    
    backgroundColor: '#B9C6AE',
    borderRadius: 50 / 2,
    height: 50,
    width: 50,
    margin: '2%',
  },
  textInput: {
    borderWidth: 2,
    marginTop: '11%',
    marginLeft: '11%',
    marginRight: '11%',
    borderColor: '#757083',
    height: '15%',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.5,
  },
  confirmationbutton: {
    backgroundColor: '#757083',
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
    margin: '11%',
    height: '15%',
    fontColor: '#FFFFFF',
    justifyContent: 'center',
  },
  text1: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  text2: {
    fontSize: 16,
    textAlign: 'center',
    color: '#757083',
    fontWeight: '300',
    opacity: 1,
  },
  title: {
    fontSize: 45,
    textAlign: 'center',
    color: '#FFFFFF',
    paddingTop: '11%',
    fontWeight: '600',
  },
});

export default Start;
