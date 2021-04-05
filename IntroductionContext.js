import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

export const IntroductionContext = createContext();

export const IntroductionProvider = ({ isFirst: isFirstProp, children }) => {
  const [isFirst, setIsFirst] = useState(isFirstProp);

  const secondHandUser = async () => {
    try {
      await AsyncStorage.setItem("isFirst", "false");
      setIsFirst(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <IntroductionContext.Provider value={{ isFirst, secondHandUser }}>
      {children}
    </IntroductionContext.Provider>
  );
};

export const useIsFirst = () => {
  const { isFirst } = useContext(IntroductionContext);
  return isFirst
}

export const makeUserSecondHand = () => {
  const { secondHandUser } = useContext(IntroductionContext);
  return secondHandUser;
};