import * as React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {StyleSheet, Text, Image, View} from "react-native";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import { TOGGLE_DANGOL, } from "../../screens/Visitor/VisitorQueries";

const DangolBar = ({ id, isDangol : isDangolProps, dangolCount : dangolCountProps, myPosts, isSelf, postsCount, mapCard = false, myWallet, wallets }) => {
    const [ isDangol, setIsDangol ] = React.useState();
    const [dangolCount, setDangolCount] = React.useState();
    const [ toggleDangolMutation, {loading} ] = useMutation(TOGGLE_DANGOL,{
        refetchQueries:[`me`,`myDangol`, `seeFullProfile`, `shopOnSale`]
    });
    const handleDangol = async () => {
        if ( isDangol === true) {
            setDangolCount(dangolCount - 1);
        } else {
            setDangolCount(dangolCount + 1);
        }
        setIsDangol(!isDangol);
        try {
            await toggleDangolMutation({
                variables:{
                    profileId: id
                }
            });
        } catch (e) {
            console.log("단골 에러:", e);
        }
    };

    React.useEffect(() => {
        setIsDangol(isDangolProps);
        setDangolCount(dangolCountProps);
    },[isDangolProps, dangolCountProps])

    return(
            <View style={styles.cardGrid}>
                <View style={styles.cardInfo}>
                    <Text style={[styles.cardInfoText, mapCard ? {color:"rgba(255, 255, 255, .8)"} : null]}>단골</Text>
                    <Text style={[styles.cardInfoNum, mapCard ? {color : "white"} : null]} numberOfLines={1}>{dangolCount}</Text>
                </View>
            
                <View style={styles.cardInfo}>
                    <Text style={[styles.cardInfoText, mapCard ? {color:"rgba(255, 255, 255, .8)"} : null]}>포스트</Text>
                    <Text style={[styles.cardInfoNum, mapCard ? {color : "white"} : null]} numberOfLines={1}>{postsCount}</Text>
                </View>
            
                {isSelf ? (
                <View style={styles.cardInfo}>
                    <Text style={[styles.cardInfoText, mapCard ? {color:"rgba(255, 255, 255, .8)"} : null]} numberOfLines={1}>발행량</Text>
                    <Text style={[styles.cardInfoNum, mapCard ? {color : "white"} : null]} numberOfLines={1}>{wallets.length > 0 ? wallets?.map(el => el.incoming).reduce((a, b) => a + b , 0) : 0}</Text>
                </View>
                ) : (
                <View style={styles.cardInfo}>
                    <Text style={[styles.cardInfoText, mapCard ? {color:"rgba(255, 255, 255, .8)"} : null]}>내 리뷰</Text>
                    <Text style={[styles.cardInfoNum, mapCard ? {color : "white"} : null]} numberOfLines={1}>{myPosts}</Text>
                </View>
                )}
            
                {isSelf ? (
                <View style={styles.cardInfo}>
                    <Text style={[styles.cardInfoText, mapCard ? {color:"rgba(255, 255, 255, .8)"} : null]} numberOfLines={1}>회수량</Text>
                    <Text style={[styles.cardInfoNum, mapCard ? {color : "white"} : null]} numberOfLines={1}>{wallets.length > 0 ? wallets?.map(el => el.outgoing).reduce((a, b) => a + b , 0) : 0}</Text>
                </View>
                ) : (
                <View style={styles.cardInfo}>
                    <Text style={[styles.cardInfoText, mapCard ? {color:"rgba(255, 255, 255, .8)"} : null]}>포인트</Text>
                    <Text style={[styles.cardInfoNum, mapCard ? {color : "white"} : null]} numberOfLines={1}>{myWallet ? (myWallet.incoming - myWallet.outgoing) : 0}</Text>
                </View>
                )}
            
                <View style={[styles.cardInfo, {justifyContent:"flex-end"}]}>
                    <TouchableOpacity style={styles.logoRow} onPress={() => handleDangol()} disabled={loading}>
                        {isDangol? (
                        <>
                            <Image style={styles.dangolLogo_checked} source={mapCard ? require('../../assets/Icons/clocheWhite.png') : require('../../assets/Icons/cloche.png')} />
                            <Text style={[styles.logoText_checked, mapCard? {color:"rgba(255, 255, 255, .8)"} : null]}>단골 중</Text>
                        </> 
                        ): (
                        <>
                            <Image style={styles.dangolLogo} source={mapCard ? require('../../assets/Icons/clocheWhite.png') : require('../../assets/Icons/cloche.png')} />
                            <Text style={[styles.logoText, mapCard? {color:"white"} : null]}>단골</Text>
                        </>)}
                    </TouchableOpacity>
                </View>
            </View>
       
    )
};


const styles=StyleSheet.create({
    cardGrid:{
        flexDirection:"row",
        flex:1,
        padding:5,
    },
    cardInfo:{
        flex:1,
        justifyContent:"center",
    },
    cardInfoText:{
        fontSize:12,
        color:"rgba(0, 0, 0, .9)",
        paddingLeft:5,
    },
    cardInfoNum:{
        color:"rgba(0, 0, 0, .4)",
        fontSize:13,
        paddingLeft:5,
        marginTop:5
    },

    //단골 버튼
    logoRow:{
      flexDirection:"row",
      alignItems:"center",
      marginLeft:"auto",
      marginRight:5,
      },
      dangolLogo:{
          width:10,
          resizeMode:"contain",
          marginRight:8,
          opacity: .9,
      },
      dangolLogo_checked:{
          width:10,
          resizeMode:"contain",
          marginRight:8,
          opacity: .6,
      },
      logoText:{
          color:"rgba(0, 0, 0, .9)",
          fontSize:12
      },
      logoText_checked:{
          color:"rgba(0, 0, 0, .6 )",
          fontSize:12
      },
  });

DangolBar.propTypes = {
    id: PropTypes.string.isRequired,
    isDangol: PropTypes.bool.isRequired,
    dangolCount: PropTypes.number.isRequired,
    isSelf: PropTypes.bool.isRequired,
    postsCount: PropTypes.number.isRequired,
};

export default DangolBar;