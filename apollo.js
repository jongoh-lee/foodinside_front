import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { AsyncStorage } from "react-native";

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
  uri: "http://b0d390bfcd7a.ngrok.io"
});

const options = {
  link: authLink.concat(link)
};

export default options;