import * as React from "react";
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from "react-native";
import SquareInput from "../Custom/SquareInput";
import useInput from "../../hooks/useInput";
import numInput from "../../hooks/numInput";
import constants from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default ({ id, menuName, menuImage, fullPrice, salePrice, subMenus, setEditMenuModal, setSubmenus, newMenuList, setNewMenuList }) => {
    const navigation = useNavigation();
    const [image, setImage] = React.useState(menuImage);
    const menuNameInput = useInput(menuName? menuName : "");
    const fullPriceInput = useInput(fullPrice? fullPrice : "");
    const salePriceInput = useInput(salePrice? salePrice : "");
    const { value : _menuName } = menuNameInput;
    const { value : _fullPrice } = fullPriceInput;
    const { value : _salePrice } = salePriceInput;
    
    const handleMenuSubmit = () => {
      let newSubmenus = subMenus;
      let index = newSubmenus.findIndex(menu => menu.id === id);
      let _newMenuList = newMenuList;
      if(index > -1){
        newSubmenus[index] = { id: id, menuName: _menuName, fullPrice:_fullPrice, salePrice:_salePrice, menuImage:image };
        setSubmenus(newSubmenus);
      } else {
        setNewMenuList(_newMenuList.concat({ id: id, menuName: _menuName, fullPrice:_fullPrice, salePrice:_salePrice, menuImage:image }));
      }
    };

    const onSelect = (menuImage) => {
      setImage(menuImage.photo.uri)
    };

    return(
        <View style={styles.content}>
        <SquareInput {...menuNameInput} placeholder={'메뉴 이름'} width={'80%'}/>

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
                marginTop:10
              }}>
              <ImageBackground
                source={image? {uri:image} : null}
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
        
        <SquareInput {...fullPriceInput} placeholder={'정상가'} width={'80%'}/>
        <SquareInput {...salePriceInput} placeholder={'할인가'} width={'80%'}/>

        <TouchableOpacity onPress={() => (
          setEditMenuModal(false),
          handleMenuSubmit()
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