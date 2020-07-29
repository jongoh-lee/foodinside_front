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
  uri: "http://d986cdc4bd7f.ngrok.io"
});

const options = {
  link: authLink.concat(link)
};

export default options;