import "react-native-gesture-handler";
import * as React from "react";
import {StyleSheet, Text, View, KeyboardAvoidingView} from "react-native"
import AuthInput from '../../components/Custom/AuthInput'
import AuthButton from '../../components/Custom/AuthButton';
import useInput from "../../hooks/useInput";
import DismissKeyboard from "../../components/Custom/DismissKeyboard";
import { useMutation } from "@apollo/react-hooks";
import { CONFIRM_SECRET } from "./AuthQueries";
import { useLogIn } from "../../AuthContext";

export default ({ route }) => {
  const [ loading, setLoading ] = React.useState(false);
  const [ alert, setAlert ] = React.useState("");
  const secretInput = useInput("");
  const logIn = useLogIn();
  const { value } = secretInput;
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: route.params.email,
      secret: value,
    }
  });
  const handleConfirm = async () => {
    try {
      setLoading(true);
      const {
        data: { confirmSecret }
      } = await confirmSecretMutation();
      if (confirmSecret !== "" || confirmSecret !== false) {
        logIn(confirmSecret);
      }
    } catch (e) {
      setAlert("인증키가 일치하지 않습니다");
      setLoading(false);
    }
  };
  React.useEffect(()=>{
    if(value === ""){
      setAlert("")
    }
  }, [value])

    return (
      <KeyboardAvoidingView 
      style={styles.container}
      keyboardVerticalOffset={'0'}
      enabled >
        <DismissKeyboard>
          <View style={styles.inner}>
            <View>
              <AuthInput {...secretInput} placeholder="인증키를 입력하세요" keyboardType="default" autoFocus={false}/>
              <Text style={{fontSize:10, color:"red", paddingLeft:5}}>{alert}</Text>
              <AuthButton text="로그인" onPress={handleConfirm} disabled={value ===""? true : false} loading={loading}/>
            </View>
          </View>
        </DismissKeyboard>
      </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"white",
  },
  inner:{
    height:"100%",
    alignItems:"center",
    justifyContent:"center",
  }
})
