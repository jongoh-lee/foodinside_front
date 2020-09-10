import * as React from "react";
import { View } from "react-native";
import ShadowInput from "../Custom/ShadowInput";
import priceInput from "../../hooks/priceInput";
import constants from "../../constants";
import BasicButton from "../Custom/BasicButton";

export default ({ onPressPrice, loading }) => {
    const price = priceInput('');
    return(
        <View style={{width:constants.width, alignItems:"center"}}>
            <ShadowInput value={price.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} onChange={price.onChange} keyboardType={'number-pad'} autoFocus={true} width={'70%'} placeholder={'가격'} editable={!loading}/>
            <View style={{width:'70%'}}>
                <BasicButton onPress={() => onPressPrice(price.value)} disabled={price.value.length > 0 ? loading : true} padding={10} text={'확인'} marginVertical={10}/>
            </View>
        </View>
    )
};