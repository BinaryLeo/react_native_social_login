import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { styles } from './styles';

export function SignInContent() {
  let image = require('../../assets/rocket.gif');
  const SCREEN_WIDTH = Dimensions.get('window').width
  const { width, height } = Image.resolveAssetSource(image);
  const ratio = height / width;
  return (
    <View style={styles.container}>
     <Image 
        source={image}  
        style={{width: SCREEN_WIDTH, height: SCREEN_WIDTH*ratio}}
    />

      <View style={styles.content}>
        <Text style={styles.title}>
          Let's Go!
        </Text>

        <Text style={styles.subtitle}>
        Log in with your Google account to {'\n'}
        be faster and let's take off.
        </Text>

        <Text style={styles.description}>
        Understanding the concepts and implementing them with a
         social login strategy using the OAuth standard.
        </Text>
      </View>
    </View>
  );
}