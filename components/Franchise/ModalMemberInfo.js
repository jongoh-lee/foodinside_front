import * as React from "react";
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import ShadowInput from "../Custom/ShadowInput";
import useInput from "../../hooks/useInput";
import numInput from "../../hooks/numInput";
import constants from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import BasicButton from "../Custom/BasicButton";
import DismissKeyboard from "../Custom/DismissKeyboard";

export default ({ chosenMember, members, setMembers, newMembers, editMembers, setNewMembers, setEditMembers, setEditMemberModal, }) => {
    const { id, image, name, position, career, index } = chosenMember
    const [memberImage, setMemberImage] = React.useState( image? image : null );
    const nameInput = useInput(name? name : "");
    const positionInput = useInput(position? position : "");
    const careerInput = useInput(career? career : "");
    const { value : _name } = nameInput;
    const { value : _position } = positionInput;
    const { value : _career } = careerInput;
    const navigation = useNavigation();
    
    const handleMemberInfoSubmit = () => {
      if(id){
        let _index = members.findIndex(member => member.id === id);
        if(_index > -1){
          members[_index] = { id: id, name: _name, position:_position, career:_career, image:memberImage.uri };
          setEditMembers(editMembers.concat({ id: id, name: _name, position:_position, career:_career, image:memberImage }))
        } else {
          setNewMembers(newMembers.concat({ name: _name, position:_position, career:_career, image:memberImage }));
        }
      } else {
        newMembers[index] = { name: _name, position:_position, career:_career, image:memberImage }
      }
    };

    const onSelect = (image) => {
      setMemberImage(image.photo)
    };

    return(
      <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex:1, justifyContent:"center"}}
      keyboardVerticalOffset={50}
      enabled >
          <View style={styles.content}>
            <TouchableOpacity onPress={() => (
              navigation.navigate('SelectPhoto', {
                onSelect : onSelect
              })
              )}>
              <View style={{
                  height: 150,
                  width: 120,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ImageBackground
                  source={memberImage?.uri? {uri:memberImage.uri} : {uri:memberImage}}
                  style={{height: 150, width: 120, backgroundColor:'#E0E0E0', borderRadius:15}}
                  imageStyle={{borderRadius: 15}}>
                  <View style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name="camera"
                      size={35}
                      color="#fff"
                      style={{
                        opacity: 0.7,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: '#fff',
                        borderRadius: 10,
                      }}
                      />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          <DismissKeyboard>
            <View style={{flexDirection:"row", marginVertical:10}}>  
                <ShadowInput {...nameInput} placeholder={'성함'} width={'50%'} padding={5} fontSize={12} returnKeyType={'done'}/>
                <ShadowInput {...positionInput} placeholder={'직위'} width={'50%'} padding={5} fontSize={12} returnKeyType={'done'}/>
            </View>
            <ShadowInput {...careerInput} placeholder={'경력'} width={'100%'} multiline={true} returnKeyType={'none'} blurOnSubmit={false} maxHeight={80} padding={5} fontSize={12}/>

            <View style={{width: '100%'}}>
              <BasicButton onPress={() => (setEditMemberModal(false), handleMemberInfoSubmit())} padding={10} text={'확인'} marginVertical={5} disabled={_name && _position && _career && memberImage? false : true}/>
            </View>
          </DismissKeyboard>
        </View>
    </KeyboardAvoidingView>
    )
}

const WIDTH = constants.width - 30;
const styles = StyleSheet.create({
    content: {
        width:WIDTH / 2,
        backgroundColor: '#ffffff',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    modalList:{
        width:'100%',
        paddingVertical:10,
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"center"
    },
    modalText:{
        fontSize:14,
        marginLeft:10
    },
})