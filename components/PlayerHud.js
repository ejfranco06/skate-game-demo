import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';

export const PlayerHud = ({ player, bails, round = 1, isActive = false }) => {
  const { picUrl = '', name = 'Felipe Santos', skill = '82%' } = player;
  if (round === 0) round = 1;

  const styleArr = isActive
    ? [styles.container, styles.active]
    : styles.container;

  const generateSkate = () => {
    if (bails === 0) return `     `;
    const skate = 'Skate';
    return skate.substring(0, bails);
  };

  const generateRate = () => {
    return Math.floor(((round - bails) / round) * 100);
  };

  const rate = generateRate();
  const skateLetters = generateSkate();

  return (
    <View style={styleArr}>
      <Image
        style={styles.profilePic}
        source={
          name !== 'Player 1'
            ? {
                uri: picUrl,
              }
            : require('../assets/images/random-user-image.png')
        }
      />
      <MonoText style={[styles.infoText, styles.skateText]}>
        {skateLetters}
      </MonoText>
      <MonoText style={styles.infoText}> Rate: {rate}% </MonoText>
    </View>
  );
};

const CARD_WIDTH = 350;
const CARD_HEIGHT = 100;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'space-between',
    backgroundColor: Colors.fireOpal,
    borderRadius: 10,
    overflow: 'hidden',
    paddingBottom: 15,
    elevation: 20,
    margin: 10,
  },

  profilePic: {
    resizeMode: 'contain',
    width: 100,
    height: 100,
  },
  active: {
    borderWidth: 3,
    borderColor: Colors.juneBud,
  },

  infoText: {
    color: Colors.white,
    alignSelf: 'center',
    fontSize: 18,
  },

  skateText: {
    fontSize: 30,
  },
  btn: {
    backgroundColor: Colors.spanishGray,
  },
});
