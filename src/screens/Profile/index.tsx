import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { ProfileHeader } from '../../components/ProfileHeader';
import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';

import { styles } from './styles';
import { theme } from '../../styles/theme';

type Params = {
  token: string;
}
type UserProfile={
  email: string;
  family_name: string;
  given_name: string;
  name: string;
  locale:string;
  picture: string;
}
export function Profile() {
  const [profile,setProfile] = useState({} as UserProfile);
  const navigation = useNavigation();
  const  route = useRoute();
  const {token} = route.params as Params;
  console.log(token);
  async function handleLogout() {
    navigation.navigate('SignIn'); 
  }
async function loadProfile() {
  const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${token}`);
 // the same url from Step 3  - Readme:  Request URL https://www.googleapis.com/oauth2/v2/userinfo
  const userInfo = await response.json();
  setProfile(userInfo);
}
  useEffect(() => {
  loadProfile();
  },[])
  return (
    <View style={styles.container}>
      <ProfileHeader />

      <View style={styles.content}>
        <View style={styles.profile}>
          <Avatar
            source={{ uri: profile.picture }}
          />

          <Text style={styles.name}>
            {profile.name}
          </Text>

          <View style={styles.email}>
            <Feather name="mail" color={theme.colors.secondary} size={18} />
            <Text style={styles.emailText}>
             {profile.email}
            </Text>
          </View>
        </View>

        <View style={styles.about}>
          <View style={styles.info}>
            <Feather
              name="user"
              size={34}
              color={theme.colors.note}
            />
            <Text style={styles.label}>
              Name
            </Text>
            <Text style={styles.text}>
             {profile.given_name}
            </Text>
          </View>

          <View style={styles.info}>
            <Feather
              name="info"
              size={34}
              color={theme.colors.note}
            />
            <Text style={styles.label}>
              Surname
            </Text>
            <Text style={styles.text}>
              {profile.family_name}
            </Text>
          </View>
        </View>

        <View style={styles.locale}>
          <Feather
            name="map-pin"
            size={18}
            color={theme.colors.note}
          />

          <Text style={styles.localeText}>
            User location: {profile.locale}
          </Text>
        </View>

        <Button
          title="Sign out"
          icon="power"
          onPress={handleLogout}
        />
      </View>
    </View>
  );
}