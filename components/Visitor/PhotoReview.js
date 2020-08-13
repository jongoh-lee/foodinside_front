import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import constants from "../../constants";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        flexWrap:"wrap"
    },
    grid:{
        width: constants.width / 3 - 2 ,
        height: constants.width / 3 - 2,
        margin:1,
        justifyContent:"center",
        alignItems:"center",
    },
    upload:{
        borderBottomColor:"#50caef",
        borderBottomWidth:2
    },
})

export default ( {photoReviews} ) => {
    return (
    <View style={styles.container}>
        <TouchableWithoutFeedback style={styles.grid}>
            <View style={styles.upload}>
                <Text>리뷰 작성하기</Text>
            </View>
        </TouchableWithoutFeedback>
        {photoReviews && photoReviews.map((photo) => <Image key={photo.id} style={styles.grid} source={{uri:photo.image}}/>)}
    </View>
)}