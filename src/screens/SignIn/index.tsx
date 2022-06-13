import React from "react";
import { View } from "react-native";
import * as AuthSession from "expo-auth-session";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../components/Button";
import { SignInContent } from "../../components/SignInContent";

import { styles } from "./styles";

type AuthResponse = {
  type: string;
  params: {
    access_token: string;
  };
};

export function SignIn() {
  const navigation = useNavigation();
  const credentialsConfig = {
    CLIENT_ID: process.env.CLIENT_ID, //Sensitive information .env file - data from GCP Credentials
    REDIRECT_URI: process.env.REDIRECT_URI,// https://auth.expo.io/@your-expo-username/your-project-slug
    RESPONSE_TYPE: "token",
    SCOPE: encodeURI("profile email"), // %20 is space
  };
  async function handleSignIn() {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${credentialsConfig.CLIENT_ID}&redirect_uri=${credentialsConfig.REDIRECT_URI}&response_type=${credentialsConfig.RESPONSE_TYPE}&scope=${credentialsConfig.SCOPE}`;
    //https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow for more info
    const { type, params } = (await AuthSession.startAsync({ // start the appication session flow
      authUrl,
    })) as AuthResponse;
    if (type === "success") {
      navigation.navigate("Profile", { token: params.access_token }); //route /token
    }
  }
  return (
    <View style={styles.container}>
      <SignInContent />

      <Button
        title="Start with a Google Account"
        icon="social-google"
        onPress={handleSignIn}
      />
    </View>
  );
}
