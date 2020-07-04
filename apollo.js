import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import AsyncStorage from "@react-native-community/async-storage";

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("jwt");
  console.log("--> request update -->", token);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const link = new HttpLink({
  uri: "http://cda6a8a3494b.ngrok.io"
});

const options = {
  link: authLink.concat(link)
};

export default options;