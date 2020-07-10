import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { Feather, MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import BasicInput from '../../components/Custom/BasicInput';
import DismissKeyboard from '../../components/Custom/DismissKeyboard';
import BasicButton from '../../components/Custom/BasicButton';
import { ScrollView } from 'react-native-gesture-handler';
import strickInput from '../../hooks/strickInput';
import useInput from '../../hooks/useInput';
import { useQuery, useMutation } from "@apollo/react-hooks";
import { EDIT_USER, ME } from './VisitorQueries';
import constants from '../../constants';

export default ({ navigation, route }) => {
    const [avatar, setAvatar] = React.useState(route.params.avatar? route.params.avatar : require('../../assets/Icons/avatarBasic.png'));
    const [loading, setLoading] = React.useState(false)
    const usernameInput = strickInput(route.params.username);
    const { value: username } = usernameInput;    
    const onSelect = (image) => {
      setAvatar(image.photo.uri)
    };
    const [editUserMutation, {error}] = useMutation(EDIT_USER)

    const handleEdit = async () => {
      try {
        setLoading(true);
        const {
          data: { editUser }
        } = await editUserMutation({
          variables: {
            username: username,
            avatar: avatar,
            email: route.params.email
          }
        });
      if( editUser ){
        navigation.goBack();
        }
      } catch(e){
      console.log(error);
      } finally {
        setLoading(false)
      }
    }
    return (
    <View style={styles.container}>
      <DismissKeyboard>
      <ScrollView contentContainerStyle={{ alignItems:"center", padding:15}}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => (
            navigation.navigate('SelectPhoto', {
              onSelect : onSelect
            })
            )}>
            <View style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={avatar === require('../../assets/Icons/avatarBasic.png')? require('../../assets/Icons/avatarBasic.png') : {uri:avatar}}
                style={{height: 100, width: 100}}
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

          <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
            {username}
          </Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} />
          <View>
          <BasicInput {...usernameInput} placeholder={'아이디'} keyboardType="default"/>
          {error ? <Text style={{fontSize:10, color:"red", paddingLeft:10, marginTop:-15}}>사용할 수 없는 아이디 입니다</Text>: null}
          </View>
        </View>
        

        <View style={styles.action}>
          <Feather name="phone" size={20} />
          <BasicInput placeholder={'연락처'} keyboardType="default"/>
        </View>

        <View style={styles.action}>
          <FontAwesome name="envelope-o" size={20} />
          <BasicInput style={{
                fontSize:14,
                width:constants.width * 0.9,
                color:'#666',
                backgroundColor:'white',
                borderRadius:20,
                padding:15,
                justifyContent:'flex-start',
                }} 
              placeholder={route.params.email} editable={false}/>
        </View>

        <BasicButton text={'수정하기'} disabled={(avatar === route.params.avatar || avatar === require('../../assets/Icons/avatarBasic.png')) && route.params.username === username} onPress={handleEdit} loading={loading}/>

        </ScrollView>
      </DismissKeyboard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    alignItems:"center"
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
});