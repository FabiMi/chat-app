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
} from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [bubbleColor, setBubbleColor] = useState('#FFFFFF'); // Default text color

  const handleColorSelection = (color) => {
    setSelectedColor(color);

    if (color === '#090C08') {
      setBubbleColor('#8A95A5');
    } else if (color === '#B9C6AE') {
      setBubbleColor('#474056');
    }
    else if (color === '#474056') {
      setBubbleColor('#090C08');
    }

    navigation.setOptions({
      headerStyle: { backgroundColor: color },
      headerTintColor: bubbleColor,
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/BackgroundImage.png')} style={styles.backgroundimage} />

      <View style={styles.box1}>
        <Text style={styles.title}>Fabis Chat App</Text>
      </View>

      <View style={styles.interactionbox}>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder='Type your username here'
        />

        <View style={styles.colorchoosewrapper}>
          <Text style={styles.text2}>Choose Background Color:</Text>

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

        <View style={styles.confirmationbutton}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Chat', { name: name, color: selectedColor, bubbleColor: bubbleColor })
            }
            disabled={!name || !selectedColor}
          >
            <Text style={styles.text1}>Start Chatting</Text>
          </TouchableOpacity>
        </View>

        {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior='padding' /> : null}
      </View>
    </View>
  );
};

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
    flex: 50,
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
  },
  colorchoose1: {
    flex: 1,
    backgroundColor: '#090C08',
    borderRadius: 50 / 2,
    height: 50,
    width: '25%',
    margin: '2%',
  },
  colorchoose2: {
    flex: 1,
    backgroundColor: '#474056',
    borderRadius: 50 / 2,
    height: 50,
    width: '25%',
    margin: '2%',
  },
  colorchoose3: {
    flex: 1,
    backgroundColor: '#8A95A5',
    borderRadius: 50 / 2,
    height: 50,
    width: '25%',
    margin: '2%',
  },
  colorchoose4: {
    flex: 1,
    backgroundColor: '#B9C6AE',
    borderRadius: 50 / 2,
    height: 50,
    width: '25%',
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
