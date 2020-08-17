import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';

export const Opponent = ({ picUrl, name = 'Felipe Santos', skill = '82%' }) => {
  const [randomMenPicNum, setRandomMenPicNum] = useState(1);

  useEffect(() => {
    randomizeOpponent();
  }, []);

  const randomizeOpponent = () => {
    setRandomMenPicNum(getRndInteger(1, 100));
  };
  return (
    <View style={styles.opponentContainer}>
      <Image
      style={styles.profilePic}
      source={{
        uri: picUrl,
      }}
    />

      <View style={styles.infoContainer}>
        <MonoText style={styles.infoText}> {name} </MonoText>
        <MonoText style={styles.infoText}> Skills: {skill} </MonoText>
      </View>

      <Button
        style={styles.btn}
        color={Colors.spanishGray}
        onPress={randomizeOpponent}
        title="challenge me"
      ></Button>
    </View>
  );
};

const CARD_WIDTH = 228;
const CARD_HEIGHT = CARD_WIDTH * 1.6;
const styles = StyleSheet.create({
  opponentContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'space-between',
    backgroundColor: Colors.fireOpal,
    borderRadius: 10,
    overflow: 'hidden',
    paddingBottom: 15,
    elevation: 20,
  },

  profilePic: {
    resizeMode: 'contain',
    width: CARD_WIDTH,
    height: CARD_WIDTH,
  },

  infoText: {
    color: Colors.white
  },
  btn: {
    backgroundColor: Colors.spanishGray,
  },
});

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
