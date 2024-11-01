import { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Platform } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {useAuth0} from 'react-native-auth0';
import { LoginFirs } from '@/components/LoginFirst';
import { AiQuoteUser } from '@/components/AiQuoteUser';
import { chatService } from '@/api/services/chatService';


export default function TabTwoScreen() {

  const {authorize, clearSession, user, error, isLoading} = useAuth0();
  const loggedIn = user !== undefined && user !== null;
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState({});

  useEffect(() => {
    if (loggedIn && loading) {
      chatService().then(response => {
        setQuote(response);
        setLoading(false);
      }).catch(error => {
        console.error(error);
      });

    }
  }, [loading, loggedIn]);
      
  if (!loggedIn) {
    return <LoginFirs />;
  }

  if (loading) {
    return (<ThemedText>Cargando datos...</ThemedText>)
  }
 
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={210} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
      <AiQuoteUser userData={user}
        quote={quote} 
      ></AiQuoteUser>
      </ThemedView>
      
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
