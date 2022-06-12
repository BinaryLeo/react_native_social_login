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
    CLIENT_ID: process.env.CLIENT_ID,
    REDIRECT_URI: process.env.REDIRECT_URI,
    RESPONSE_TYPE: "token",
    SCOPE: encodeURI("profile email"),
  };
  async function handleSignIn() {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${credentialsConfig.CLIENT_ID}&redirect_uri=${credentialsConfig.REDIRECT_URI}&response_type=${credentialsConfig.RESPONSE_TYPE}&scope=${credentialsConfig.SCOPE}`;
    const { type, params } = (await AuthSession.startAsync({
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
