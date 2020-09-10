import * as React from "react";
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, KeyboardAvoidingView} from "react-native";
import ShadowInput from "../Custom/ShadowInput";
import useInput from "../../hooks/useInput";
import numInput from "../../hooks/numInput";
import constants from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import BasicButton from "../Custom/BasicButton";

export default ({ chosenMenu, submenus, setSubmenus, setCompleteMenuModal, newMenus, setNewMenus, editMenus, setEditMenus }) => {
    const { id, menuName, menuImage, fullPrice, salePrice, index } = chosenMenu
    const menuNameInput = useInput(menuName? menuName : "");
    const fullPriceInput = numInput(fullPrice? String(fullPrice) : "");
    const salePriceInput = numInput(salePrice? String(salePrice) : "");
    const [image, setImage] = React.useState(menuImage? menuImage: null);
    const { value : _menuName } = menuNameInput;
    const { value : _fullPrice } = fullPriceInput;
    const { value : _salePrice } = salePriceInput;
    const navigation = useNavigation();
    
    const handleMenuSubmit = () => {
      if(id){
        let _index = submenus.findIndex(menu => menu.id === id);
        if(_index > -1){
          submenus[_index] = { id: id, menuName: _menuName, fullPrice: Number(_fullPrice), salePrice: Number(_salePrice), menuImage:image.uri };
          setEditMenus(editMenus.concat({ id: id, menuName: _menuName, fullPrice: Number(_fullPrice), salePrice:Number(_salePrice), menuImage:image }))
        } else {
          setNewMenus(newMenus.concat({ menuName: _menuName, fullPrice:Number(_fullPrice), salePrice:Number(_salePrice), menuImage:image }));
        }
      } else {
          newMenus[index] = { menuName: _menuName, fullPrice:Number(_fullPrice), salePrice:Number(_salePrice), menuImage:image }
      }
    };
    const onSelect = (menuImage) => {
      setImage(menuImage.photo)
    };

    return(
      <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex:1, justifyContent:"center"}}
      keyboardVerticalOffset={50}
      enabled >
        <View style={styles.content}>
          <ShadowInput {...menuNameInput} placeholder={'메뉴 이름'} width={'80%'} padding={5} fontSize={12}/>

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
                  marginVertical:10
                }}>
                <ImageBackground
                  source={image?.uri? {uri:image.uri} : {uri:image}}
                  style={{height: 100, width: 100, backgroundColor:'#E0E0E0', borderRadius:15}}
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
                    
            <ShadowInput {...fullPriceInput} placeholder={'정상가'} width={'80%'}  padding={5} fontSize={12} keyboardType={'numeric'}/>
            <ShadowInput {...salePriceInput} placeholder={'할인가'} width={'80%'} padding={5} fontSize={12} keyboardType={'numeric'}/>

            <View style={{width: '80%'}}>
              <BasicButton onPress={() => (setCompleteMenuModal(false), handleMenuSubmit())} padding={10} text={'확인'} marginVertical={5} width={'100%'} disabled={image && _menuName && _fullPrice && _salePrice? false : true}/>
            </View>
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