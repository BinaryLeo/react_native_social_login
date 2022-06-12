import React from "react";
import { View } from "react-native";
import * as AuthSession from "expo-auth-session";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../components/Button";
import { SignInContent } from "../../components/SignInContent";

import { styles } from "./styles";

/* type AuthResponse = {
  type: string;
  params: {
    access_token: string;
  }D
} */

export function SignIn() {
  const navigation = useNavigation();
  const credentialsConfig = {
    CLIENT_ID:
      "941596417298-cssccqat0b4gchh532eo8e7b64prnmjf.apps.googleusercontent.com",
    REDIRECT_URI: "https://auth.expo.io/@binaryleo/oauth2app",
    RESPONSE_TYPE: "token",
    SCOPE: encodeURI("profile email"),
  };
  async function handleSignIn() {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${credentialsConfig.CLIENT_ID}&redirect_uri=${credentialsConfig.REDIRECT_URI}&response_type=${credentialsConfig.RESPONSE_TYPE}&scope=${credentialsConfig.SCOPE}`;
    const response = await AuthSession.startAsync({ authUrl });
    console.log(response);
    navigation.navigate("Profile");
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
