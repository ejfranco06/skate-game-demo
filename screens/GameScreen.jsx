import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { PlayerHud } from '../components/PlayerHud';
import { useApp } from '../context/app-context';
import axios from 'axios';
import { Opponent } from '../components/Opponent';
import { ScrollView } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import pic from '../assets/images/random-user-image.png';
import Colors from '../constants/Colors';

const defaultPlayer = {
  picUrl: '../assets/images/random-user-image.png',
  name: 'Player 1',
  skill: 50,
};

const skateTricks = [
  'Kickflip',
  'Heelflip',
  'FS Shove it',
  'BS Shove it',
  'FS 180',
  'BS 180',
];

export const GameScreen = ({ navigation }) => {
  const [round, setRound] = useState(1);
  const [currentTrick, setCurrentTrick] = useState(0);
  const [playerBails, setPlayerBails] = useState(0);
  const [opponentBails, setOpponentBails] = useState(0);
  const { currentOpponent } = useApp();
  useEffect(() => {
    getRandomTrick();
  }, [getRandomTrick]);

  const getRandomTrick = () => {
    const randomTrick = getRndInteger(0, skateTricks.length - 1);
    setCurrentTrick(randomTrick);
  };

  const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  return (
    <View style={styles.container}>
      <MonoText style={styles.headerText}> Game Screen </MonoText>
      <PlayerHud player={currentOpponent} bails={opponentBails} round={round} />
      <PlayerHud player={defaultPlayer} bails={playerBails} round={round} />
      <MonoText> trick : {skateTricks[currentTrick]}</MonoText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  opponentList: {
    height: '40%',
  },
  headerText: {
    fontSize: 30,
    margin: 20,
  },
});
