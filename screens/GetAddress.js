import * as React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
});

export default () => {
    return (
        <View style={styles.container}>
        <GooglePlacesAutocomplete
        placeholder='Enter Location'
        minLength={2}
        autoFocus={false}
        returnKeyType={'default'}
        fetchDetails={true}
       styles={{
          description: {
                        fontWeight: 'bold',
                       },
          predefinedPlacesDescription: {
                          color: '#1faadb',
                       },
          listView: { color: 'black', //To see where exactly the list is
                      zIndex: 16, //To popover the component outwards
                      position: 'absolute',   
       }
    }}
        />
        </View>
    )
}
