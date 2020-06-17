import * as React from "react";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      { children }
    </TouchableWithoutFeedback>
  )
}
