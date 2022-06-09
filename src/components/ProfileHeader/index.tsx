import React from 'react';
import { View, Text, Image } from 'react-native';

import { styles } from './styles';
import headerImg from '../../assets/header.png';

export function ProfileHeader() {
  return (
    <View style={styles.container}>
      <Image source={headerImg} style={styles.imageHeader} />

      <View style={styles.header}>
        <View style={styles.welcome}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>Google account data</Text>
        </View>
      </View>
    </View>
  );
}