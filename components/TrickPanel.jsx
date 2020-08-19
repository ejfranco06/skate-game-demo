import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';

export const TrickPanel = ( {currentTrick }) => {
  return (
    <View style={styles.container}>
      <MonoText style={styles.infoText}> Trick : {currentTrick}</MonoText>
    </View>
  );
};

const CARD_WIDTH = 350;
const CARD_HEIGHT = 100;
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "white",
    overflow: 'hidden',
    elevation: 20,
    margin: 10,
    padding: 20
  },

  infoText: {
    // color: Colors.white,
    alignSelf: 'center',
    fontSize: 18,
  },
});
