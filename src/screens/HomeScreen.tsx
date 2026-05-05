import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../constants/colors';   
import { TYPOGRAPHY } from '../constants/typography';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
        <Text>Home Screen</Text>
    </View>
    );      
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'COLORS.white',
  },
}); 