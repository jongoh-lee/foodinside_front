import * as React from 'react';
import {View, Text, TouchableOpacity, ImageBackground, StyleSheet,} from 'react-native';
import axios from "axios";
import { Feather, MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import BasicInput from '../../components/Custom/BasicInput';
import DismissKeyboard from '../../components/Custom/DismissKeyboard';
import BasicButton from '../../components/Custom/BasicButton';
import { ScrollView } from 'react-native-gesture-handler';
import strickInput from '../../hooks/strickInput';
import { useQuery, useMutation } from "@apollo/react-hooks";
import { EDIT_ME, ME, EDIT_USERNAME } from './VisitorQueries';
import constants from '../../constants';

export default ({ navigation, route }) => {
    const [avatar, setAvatar] = React.useState(route.params.avatar? route.params.avatar : null);
    const [loading, setLoading] = React.useState(false)
    const usernameInput = strickInput(route.params.username);
    const { value: username } = usernameInput;
    const [alert, setAlert] = React.useState();
    
    const onSelect = (image) => {
      setAvatar(image.photo)
    };
    
    const { data, error } = useQuery(EDIT_USERNAME,{
      variables:{
        username: username
      },
      fetchPolicy:"network-only"
    });
    
    const [editMeMutation] = useMutation(EDIT_ME)

    const handleEdit = async () => {
      try {
        setLoading(true);
        let _avatar = [];
        if(avatar.uri){
          const formData = new FormData();
          formData.append('file',{
            name: avatar.filename,
            type: "image/jpeg",
            uri: avatar.uri
          });
        const {
          data: { location }
        } = await axios.post("http://172.30.1.21:4000/api/upload", formData, {
          headers: {
            "content-type": "multipart/form-data"
          }
        });
        _avatar.push(location[0])
        }
        
        const {
          data: { editMe }
        } = await editMeMutation({
          variables: {
            username: username,
            avatar: avatar.uri? _avatar[0].url : avatar,
            email: route.params.email
          }
        });
      if( editMe ){
        navigation.goBack();
        }
      } catch(e){
      console.log("내정보 수정 에러",error);
      } finally {
        setLoading(false)
      }
    }
    React.useEffect(() => {
      if(username.length < 3){
        setAlert(true)
      }else{
        setAlert(false)
      }
    },[usernameInput.value])

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
                source={avatar? avatar.uri? {uri: avatar.uri} : {uri: avatar} : require('../../assets/Icons/avatarBasic.png') }
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
          </View>
            {data?.editUsername || alert? <Text style={{fontSize:10, color:"red", position:"absolute", bottom:5 }}>사용할 수 없는 아이디 입니다</Text>: null}
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
        <View style={{width:'100%'}}>
          <BasicButton text={'수정하기'} disabled={alert? true : loading} onPress={handleEdit} loading={loading}/>
        </View>

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
    alignItems:"center",
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
});