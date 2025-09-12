import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import Logo from '../assets/svg/Logo';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Logo width={150} height={150} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
