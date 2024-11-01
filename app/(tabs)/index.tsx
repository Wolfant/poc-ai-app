import { Image, StyleSheet, Platform, View, Text, Button } from 'react-native';
import {useAuth0} from 'react-native-auth0';
import { useEffect } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function HomeScreen() {
  const {authorize, clearSession, user, error, isLoading} = useAuth0();


  const onLogin = async () => {
    try {
      console.log('before authorize');
      await authorize();
      console.log(isLoading);
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  };

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log('Log out cancelled');
    }
  };

  useEffect(() => {
    if (isLoading) {
      console.log('Loading...');
    }
  }, [isLoading]);


 
  const loggedIn = user !== undefined && user !== null;


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bienvenid a Just4Fun</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Paso 1: Inicia Sesion</ThemedText>
        <ThemedText>
          Inicia sesion con tu cuenta de <ThemedText type="defaultSemiBold">Gmail </ThemedText> para acceder al sistema.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Paso 2: Usa el APP Just4Fun</ThemedText>
        <ThemedText>
          Recibe tu mensaje de motivación
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
      <Image source={{ uri: user?.picture }} />
      {loggedIn && <ThemedText>Has iniciado sesión como {user.name}</ThemedText>}
      {!loggedIn && <ThemedText>No has iniciado sesión.</ThemedText>}
      {error && <ThemedText>{error.message}</ThemedText>}
      
      <Button
        onPress={loggedIn ? onLogout : onLogin}
        title={loggedIn ? 'Log Out' : 'Log In'}
      />
      </ThemedView>
    </ParallaxScrollView>
    
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
