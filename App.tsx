import 'react-native-gesture-handler';
import React, {useState,useEffect,useCallback} from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import {Inter_400Regular, Inter_500Medium, Inter_700Bold, } from '@expo-google-fonts/inter'
import { Routes } from './src/routes';
import { View } from 'react-native';
import { theme } from './src/styles/theme';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({Inter_400Regular, Inter_500Medium, Inter_700Bold});
      }
      catch {
      console.log("error loading fonts");
      }
      finally {
        setAppIsReady(true);
      }
    })();
  }, []);

  const onLayout = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  
  return (
    <View onLayout={onLayout}
      style={{
        flex: 1,
        backgroundColor: theme.colors.background
      }}>

      <StatusBar
        style="light"
        backgroundColor="transparent"
        translucent
      />

      <Routes />
    </View>
  );
}