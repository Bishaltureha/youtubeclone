import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Logo from '../assets/svg/Logo';

const Header = () => {
  return (
    <View style={styles.container}>
      <Logo height={30} width={30} />
      <Text style={styles.title}>YouTube</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 4,
    color: '#000',
  },
});
