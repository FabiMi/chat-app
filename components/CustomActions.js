// import the necessary lybraries and components
import { TouchableOpacity, Text, View, StyleSheet,  } from "react-native";
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { ref,getDownloadURL, uploadBytes } from 'firebase/storage';


// Define the CustomActions component which will be used to add the action button to the message input field.


const CustomActions = ({wrapperStyle, iconTextStyle, onSend, storage, userID}) => {

  // Define the onActionPress function which will be used to display the action sheet when the action button is pressed.
    const actionSheet = useActionSheet();
    const onActionPress = () => {
        const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        actionSheet.showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex,
          },
          // Define the buttonIndex function which will be used to determine which option the user has selected.
          async (buttonIndex) => {
            switch (buttonIndex) {
              case 0:
                pickImage();
                return;
              case 1:
                takePhoto();
                return;
              case 2:
                getLocation();  
              default:
            }
          },
        );
      };
      // Define the generateReference function which will be used to generate a unique name for the image.
      const generateReference = (uri) => {
        const timeStamp = (new Date()).getTime();
        const imageName = uri.split("/")[uri.split("/").length - 1];
        return `${userID}-${timeStamp}-${imageName}`;
      }
        // Define the pickImage function which will be used to pick an image from the device's library.
        const pickImage = async () => {
          let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();

          // Check if the user has granted permission to access the device's library
          if (permissions?.granted) {
            let result = await ImagePicker.launchImageLibraryAsync();

            // Check if the user has picked an image

            // Upload the image to the database
            if (!result.canceled) {

              // Get the image URI
              const imageURI = result.assets[0].uri;
              const uniqueRefString = generateReference(imageURI);
              const response = await fetch(imageURI);

              // Convert the image to a blob
              const blob = await response.blob();
              const newUploadRef = ref(storage, uniqueRefString);
              // Upload the image to the firebase storage
              uploadBytes(newUploadRef, blob).then(async (snapshot) => {
                console.log('file has been uploaded');
                // Get the image URL for the image that was just uploaded
                const imageURL = await getDownloadURL(snapshot.ref)
                // Send the image URL to the onSend function
                onSend({ image: imageURL });
              })
            }
            // Alert the user didnt consent to the permissions
            else Alert.alert("Permissions haven't been granted.");
          }
        }
      

     
        // Define the takePhoto function which will be used to take a photo using the device's camera.
      const takePhoto = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();

    // Check if the user has granted permission to access the device's camera
        if (permissions?.granted) {
          let result = await ImagePicker.launchCameraAsync();
          // Check if the user has taken a photo
          if (!result.canceled) {

            // Get the image URI
            const imageURI = result.assets[0].uri;
            const uniqueRefString = generateReference(imageURI);
            const response = await fetch(imageURI);

            // Convert the image to a blob
            const blob = await response.blob();
            const newUploadRef = ref(storage, uniqueRefString);
            // Upload the image to firebase
            uploadBytes(newUploadRef, blob).then(async (snapshot) => {
              console.log('file has been uploaded');
              // Get the image URL for the image that was just uploaded
              const imageURL = await getDownloadURL(snapshot.ref)
              // Send the image URL to the onSend function
              onSend({ image: imageURL });
            })
          }
          // Alert the user didnt consent to the permissions
          else Alert.alert("Permissions haven't been granted.");
        }
      }
      // Define the getLocation function which will be used to get the user's location.
      const getLocation = async () => {
        let permissions = await Location.requestForegroundPermissionsAsync();
        if (permissions?.granted) {
          // Get the user's location
          const location = await Location.getCurrentPositionAsync({});
          if (location) {
            // Send the location to the onSend function
            onSend({
              location: {
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
              },
            });
          } else Alert.alert("Error occurred while fetching location");
        } else Alert.alert("Permissions haven't been granted.");
      }
      


    

// Return the CustomActions component
  return (
    // Define the TouchableOpacity component which will be used to wrap the action button.
    <TouchableOpacity style={styles.container} onPress={onActionPress}> 
    <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
        </View>
    </TouchableOpacity>
  );
}


// Define the styles for the CustomActions component.
const styles = StyleSheet.create({
    container: {
      width: 26,
      height: 26,
      marginLeft: 10,
      marginBottom: 10,
    },
    wrapper: {
      borderRadius: 13,
      borderColor: '#b2b2b2',
      borderWidth: 2,
      flex: 1,
    },
    iconText: {
      color: '#b2b2b2',
      fontWeight: 'bold',
      fontSize: 10,
      backgroundColor: 'transparent',
      textAlign: 'center',
    },
  });

export default CustomActions;
