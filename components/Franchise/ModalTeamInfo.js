import * as React from "react";
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from "react-native";
import SquareInput from "../Custom/SquareInput";
import useInput from "../../hooks/useInput";
import numInput from "../../hooks/numInput";
import constants from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default ({ id, name, image, position, career, team, setTeam, newTeam, setNewTeam, setEditTeamModal }) => {
    const navigation = useNavigation();
    const [memberImage, setMemberImage] = React.useState(image);
    const nameInput = useInput(name? name : "");
    const positionInput = useInput(position? position : "");
    const careerInput = useInput(career? career : "");
    const { value : _name } = nameInput;
    const { value : _position } = positionInput;
    const { value : _career } = careerInput;
    
    const handleTeamInfoSubmit = () => {
      let _team = team;
      let index = _team.findIndex(member => member.id === id);
      let _newTeam = newTeam;
      if(index > -1){
        _team[index] = { id: id, name: _name, position:_position, career:_career, image:memberImage };
        setTeam(_team);
      } else {
        setNewTeam(_newTeam.concat({ id: id, name: _name, position:_position, career:_career, image:memberImage }));
      }
    };

    const onSelect = (image) => {
      setMemberImage(image.photo.uri)
    };

    return(
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
                source={memberImage? {uri:memberImage} : null}
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
        <View style={{flexDirection:"row", marginVertical:10}}>  
            <SquareInput {...nameInput} placeholder={'성함'} width={'50%'}/>
            <SquareInput {...positionInput} placeholder={'직위'} width={'50%'}/>
        </View>
        <SquareInput {...careerInput} placeholder={'경력'} width={'100%'} multiline={true} returnKeyType={'none'} maxHeight={80}/>

        <TouchableOpacity onPress={() => (
          setEditTeamModal(false),
          handleTeamInfoSubmit()
          )}>
          <Text>확인</Text>
        </TouchableOpacity>
      </View>
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