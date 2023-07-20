import Start from './components/Start';
import Chat from './components/Chat';
import { getStorage } from "firebase/storage";

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import the neccessary libraries for  NetInfo for Detecting a Network Connection
import { useEffect } from "react";
import { LogBox, Alert } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

// Import the functions for Firebase to use when the user loses connection in Android
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

// Create the navigator
const Stack = createNativeStackNavigator();

// Import the functions for Firebase
import { initializeApp } from "firebase/app";



// Initialize Firebase remmebr to use your own configuration.

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJQUecmTozvmvfQYALN_FtvvJ0CP8RHV4",
  authDomain: "chat-app-97fed.firebaseapp.com",
  projectId: "chat-app-97fed",
  storageBucket: "chat-app-97fed.appspot.com",
  messagingSenderId: "701233938721",
  appId: "1:701233938721:web:2c48272a7e14deef943e60",
  measurementId: "G-5BWK5898BP"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const connectionStatus = useNetInfo();

//Initialize Firebase Storage for images
const storage = getStorage(app);

//Create the App component which will be the root component of the app.

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);



const App = () => {
  // Initialize Cloud Firestore and get a reference to the service

// Detecting a Network Connection
const connectionStatus = useNetInfo();

// Display an alert if the user loses connection
useEffect(() => {
  if (connectionStatus.isConnected === false) 
  {Alert.alert("Connection lost!");
  disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
}, [connectionStatus.isConnected]);


const db = getFirestore(app);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
         
        >{props => <Chat isConnected={connectionStatus.isConnected}  db={db}  storage={storage} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;