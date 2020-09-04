import * as React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {StyleSheet, Text, Image, View} from "react-native";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import { TOGGLE_DANGOL, } from "../../screens/Visitor/VisitorQueries";

const DangolBar = ({ id, isDangol : isDangolProps, dangolCount : dangolCountProps, myPosts, isSelf, postsCount }) => {
    const [ isDangol, setIsDangol ] = React.useState(isDangolProps);
    const [dangolCount, setDangolCount] = React.useState(dangolCountProps);
    const [ toggleDangolMutation ] = useMutation(TOGGLE_DANGOL,{
        refetchQueries:[`me`,`myDangol`, `seeFullProfile`]
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
    }
    return(
            <View style={styles.cardGrid}>
                <View style={styles.cardInfo}>
                    <Text style={styles.cardInfoText}>단골</Text>
                    <Text style={styles.cardInfoNum} numberOfLines={1}>{dangolCount}</Text>
                </View>
            
                <View style={styles.cardInfo}>
                    <Text style={styles.cardInfoText}>포스트</Text>
                    <Text style={styles.cardInfoNum} numberOfLines={1}>{postsCount}</Text>
                </View>
            
                {isSelf ? (
                <View style={styles.cardInfo}>
                    <Text style={styles.cardInfoText}>발행량</Text>
                    <Text style={styles.cardInfoNum} numberOfLines={1}>0</Text>
                </View>
                ) : (
                <View style={styles.cardInfo}>
                    <Text style={styles.cardInfoText}>내 리뷰</Text>
                    <Text style={styles.cardInfoNum} numberOfLines={1}>{myPosts}</Text>
                </View>
                )}
            
                {isSelf ? (
                <View style={styles.cardInfo}>
                    <Text style={styles.cardInfoText}>회수량</Text>
                    <Text style={styles.cardInfoNum} numberOfLines={1}>0</Text>
                </View>
                ) : (
                <View style={styles.cardInfo}>
                    <Text style={styles.cardInfoText}>암호화폐</Text>
                    <Text style={styles.cardInfoNum} numberOfLines={1}>0</Text>
                </View>
                )}
            
                <View style={styles.cardInfo}>
                    <TouchableOpacity style={styles.logoRow} onPress={handleDangol}>
                        {isDangol? (
                        <>
                            <Image style={styles.dangolLogo_checked} source={require('../../assets/Icons/cloche.png')} />
                            <Text style={styles.logoText_checked}>단골 중</Text>
                        </> 
                        ): (
                        <>
                            <Image style={styles.dangolLogo} source={require('../../assets/Icons/cloche.png')} />
                            <Text style={styles.logoText}>단골</Text>
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
          opacity: .4,
      },
      logoText:{
          color:"rgba(0, 0, 0, .9)",
          fontSize:14
      },
      logoText_checked:{
          color:"rgba(0, 0, 0, .4)",
          fontSize:14
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