import { TouchableOpacity } from "react-native-gesture-handler";
import * as React from "react";
import {StyleSheet, Text, Image, } from "react-native";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import { TOGGLE_DANGOL, ME } from "../../screens/Visitor/VisitorQueries";

const DangolButton = ({ id, isDangol, dangols, setDangols }) => {
    const [ dangol, setDangol ] = React.useState(isDangol);
    const [ toggleDangolMutation ] = useMutation(TOGGLE_DANGOL);
    const handleDangol = async () => {
        if ( dangol === true) {
            setDangols(dangols - 1);
        } else {
            setDangols(dangols + 1);
        }
        setDangol(!dangol);
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
        <TouchableOpacity style={styles.logoRow} onPress={handleDangol}>
            {dangol? <>
                <Image style={styles.dangolLogo_checked} source={require('../../assets/Icons/cloche.png')} />
                <Text style={styles.logoText_checked}>단골 중</Text>
            </> : <>
                <Image style={styles.dangolLogo} source={require('../../assets/Icons/cloche.png')} />
                <Text style={styles.logoText}>단골</Text>
            </>}
        </TouchableOpacity>
    )
};


const styles=StyleSheet.create({
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

DangolButton.propTypes = {
    id: PropTypes.string.isRequired,
    isDangol: PropTypes.bool.isRequired,
    dangols: PropTypes.number.isRequired,
    setDangols: PropTypes.func.isRequired,
};

export default DangolButton;