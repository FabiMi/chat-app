import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';



const Start = ({ navigation }) => {
const [name, setName] = useState('');

  //State variable selectedColor using the useState hook. It will hold the selected background color
  const [selectedColor, setSelectedColor] = useState('');

  // Function to handle color selection
  const handleColorSelection = (color) => {
    setSelectedColor(color);
    navigation.setOptions({ headerStyle: { backgroundColor: color } }); // Change navigation bar color
  };

  return (
   
  
     // The background image is added as a component to the Start screen
    <View style={styles.container}>


     <ImageBackground source={require('../assets/BackgroundImage.png')} style={styles.backgroundimage }/>
    
      <View style={styles.box1}>
      <Text style={styles.title} >Fabis Chat App</Text>
      </View>


        {/* The interaction box is added as a component to the Start screen */}
      <View style={styles.interactionbox}>

        {/* The text input field is added as a component to the Start screen */}  
      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={setName}
        placeholder='Type your username here'
      />
      {/* The color selection box is added as a component to the Start screen */}
      <View style={styles.colorchoosewrapper}>
        <Text style={styles.text2}>Choose Background Color:</Text> 


        {/* The color selection buttons are added as a component and onPress function is added to select the chosen color*/}  
        <View style={styles.colorchoosebox}>
        <TouchableOpacity style={[styles.colorchoose1, { backgroundColor: '#090C08' }]}
              onPress={() => handleColorSelection('#090C08')}
              />
        <TouchableOpacity style={[styles.colorchoose2, { backgroundColor: '#474056' }]}
              onPress={() => handleColorSelection('#474056')}
              />  
        <TouchableOpacity style={[styles.colorchoose3, { backgroundColor: '#8A95A5' }]}
              onPress={() => handleColorSelection('#8A95A5')}
              />
        <TouchableOpacity  style={[styles.colorchoose4, { backgroundColor: '#B9C6AE' }]}
              onPress={() => handleColorSelection('#B9C6AE')}
        />  
          </View>
        </View>
      
        {/* The confirmation button is added as a component and has the functon to pass name and backgroundcolor to chat.js */}
        <View style={styles.confirmationbutton}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Chat', { name: name, color: selectedColor })}
          disabled={!name || !selectedColor}
        >
          <Text style={styles.text1}>Start Chatting</Text>
        </TouchableOpacity>
        </View>
        {Platform.OS === "ios"?<KeyboardAvoidingView behavior="padding" />: null}

      </View>

      
     
     
    </View>
   
  );
}
{/* The styles */}

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
    flex:44,  
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },

  interactionbox: {
    flex:50,
    backgroundColor: 'white',
    marginLeft: '11%',
    marginRight: '11%',
    marginBottom: '11%',  

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

  } ,

  colorchoose1: {
    flex: 1,
    backgroundColor: '#090C08', 
    borderRadius: 50/2,
    height: 50,
    width: '25%',
    margin: '2%',

  },

  colorchoose2: {
    flex: 1,
    backgroundColor: '#474056',
    borderRadius: 50/2,
    height: 50,
    width: '25%',
    margin: '2%',


  },


  colorchoose3: {
    flex: 1,
    backgroundColor: '#8A95A5',
    borderRadius: 50/2,
    height: 50,
    width: '25%',
    margin: '2%',
   
  },

  colorchoose4: {
    flex: 1,
    backgroundColor: '#B9C6AE', 
    borderRadius: 50/2,
    height: 50,
    width: 10,
   
    
  },


  textInput: {
    borderWidth: 2,
    marginTop: '11%',
    marginLeft: '11%',
    marginRight: '11%', 
    borderColor: '#757083',
    height: '15%',
    fontSize: 16 ,
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
    height: 10,
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
        

          }


      

    });

export default Start;
