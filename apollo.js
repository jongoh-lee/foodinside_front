import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import AsyncStorage from "@react-native-community/async-storage";

console.log(process.env.NODE_ENV)

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
  uri: process.env.NODE_ENV === "development" 
  ? "http://172.30.1.35:4000"
  : "https://foodinside-backend.herokuapp.com"

});

const options = {
  link: authLink.concat(link)
};

export default options;