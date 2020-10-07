import * as React from "react";
import { Text } from "react-native";

export default ( {style, onPress, children } ) => {
      return (
        <Text style={[{color:"#666", fontSize:12}, style]} onPress={onPress}>
          {children}
        </Text>
    )
}
  