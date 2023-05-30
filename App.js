import Start from './components/Start';
import Chat from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

// Import the functions for Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


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

//Create the App component which will be the root component of the app.

// Import the LogBox module to ignore the warning we will get when we use AsyncStorage
import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);



const App = () => {
  // Initialize Cloud Firestore and get a reference to the service
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
         
        >{props => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;