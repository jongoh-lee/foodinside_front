import * as React from "react";
import { StyleSheet, View, Image, Text,  } from "react-native";
import constants from "../../constants";

const WIDTH = constants.width - 20;
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between",
        marginVertical:10
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    titleAlign: {
        flexDirection: "row",
        alignItems: "baseline",
    },
    mainImage: {
        width: WIDTH * 0.2,
        height: WIDTH * 0.11,
        marginRight: 8,
    },
    headerTitle:{
        maxWidth: WIDTH * 0.55,
        fontWeight:"500",
        fontSize:18,
    },
    headerSubtitle:{
        color:'#666',
        fontSize:12,
    },
    headerRight:{
        alignItems:"flex-end",
        marginRight:5
    },
    state:{
        fontSize:16,
    }
})

export default ({mainImage, name, sort}) => {
    return (
        <View style={styles.header}>

            <View style={styles.headerLeft}>
                <Image style={styles.mainImage} source={{ uri: mainImage }} />
                <View>
                    <View style={styles.titleAlign}>
                        <Text style={styles.headerTitle} numberOfLines={1}>{name}2</Text>
                        <Text style={styles.headerSubtitle}>  {sort}</Text>
                    </View>
                    <Text style={styles.headerSubtitle}>7/15 - 7/21</Text>
                </View>
            </View>

            <View style={styles.headerRight}>
                <Text style={styles.state}>입금 완료</Text>
                <Text style={styles.headerSubtitle}>679,000</Text>
            </View>
        </View>
    )
}
