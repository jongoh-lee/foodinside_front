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
import { useQuery } from "@apollo/react-hooks";
import { CHECK_EMAIL, CHECK_USERNAME } from '../Auth/AuthQueries';

export default ({ navigation, route }) => {
    const [avatar, setAvatar] = React.useState(route.params.avatar? route.params.avatar : require('../../assets/Icons/avatarBasic.png'));
    const [alert, setAlert] = React.useState("");
    const [color, setColor] = React.useState('warn');
    const [edit, setEdit] = React.useState(true)
    const usernameInput = strickInput(route.params.username);
    const email = useInput(route.params.email);
    const { value: username } = usernameInput;
    const { value: editEmail } = email;
    
    const onSelect = (image) => {
      setAvatar(image.photo.uri)
    };
    const { data, error } = useQuery(CHECK_USERNAME, {
      variables:{
        username: username
      }
    });

    React.useEffect(()=>{
      if(username.length > 1 && data && data.checkUsername){
        setColor('pass')
        setAlert("사용 가능한 아이디 입니다")
      } else {
        setColor('warn')
        setAlert("사용할 수 없는 아이디 입니다")
      }
      if(username === ""){
        setAlert("")
      }
    }, [route.params.username ==! username])
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
            {username.value}
          </Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} />
          <BasicInput {...username} placeholder={'아이디'} keyboardType="default"/>
          <Text style={color === 'warn'? {fontSize:10, color:"red", paddingLeft:5} : {fontSize:10, color:"green", paddingLeft:5}}>{alert}</Text>
        </View>
        
        <View style={styles.action}>
          <FontAwesome name="envelope-o" size={20} />
          <BasicInput {...email} placeholder={'이메일'} keyboardType="default"/>
        </View>

        <View style={styles.action}>
          <Feather name="phone" size={20} />
          <BasicInput placeholder={'연락처'} keyboardType="default"/>
        </View>

        <BasicButton text={'수정하기'}/>

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