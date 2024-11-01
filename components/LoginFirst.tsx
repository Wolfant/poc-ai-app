import { useRef, useEffect } from 'react';
import {
    Button,
    StyleSheet, 
    View, 
    Text, 
    type TextProps
} from 'react-native';
import LottieView from 'lottie-react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/components/ThemedText';

export type LoginFirsProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
};


export function LoginFirs({
    style,
    lightColor,
    darkColor,
    ...rest
  }: LoginFirsProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    const animation = useRef<LottieView>(null);
    
    useEffect(() => {
    }, []);

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
          backgroundColor: '#eee',
        }}
        source={require('@/assets/images/Login.json')}
      />
      <View style={styles.buttonContainer}>
      <ThemedText style={styles.text}> Primero Inicia Sesion 👋</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});