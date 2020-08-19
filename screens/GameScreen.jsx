import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { PlayerHud } from '../components/PlayerHud';
import { useApp } from '../context/app-context';
import { TrickPanel } from '../components/TrickPanel';

import { MonoText } from '../components/StyledText';

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
  'Varial Kickflip',
  'Varial Heelflip',
  'Tre flip',
  'FS Kickflip',
  'FS Heelflip',
  'BS Kickflip',
  'BS Heelflip',
];

export const GameScreen = ({ navigation }) => {
  const [round, setRound] = useState(1);
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
  const [currentTrick, setCurrentTrick] = useState(0);
  const [playerBails, setPlayerBails] = useState(0);
  const [opponentBails, setOpponentBails] = useState(0);
  const { currentOpponent } = useApp();
  useEffect(() => {
    getRandomTrick();
  }, [getRandomTrick]);

  const updateTurn = () => {
    if (!isPlayer1Turn) {
      getRandomTrick();
      setRound((prev) => prev + 1);
    }
    setIsPlayer1Turn((prev) => !prev);
  };

  const handleLand = () => {
    updateTurn();
  };

  const handleBail = () => {
    if (isPlayer1Turn) setPlayerBails((prev) => prev + 1);
    else setOpponentBails((prev) => prev + 1);
    updateTurn();
  };

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
      <TrickPanel currentTrick={skateTricks[currentTrick]} />
      <PlayerHud player={defaultPlayer} bails={playerBails} round={round} />
      <PlayerHud player={currentOpponent} bails={opponentBails} round={round} />
      <View style={styles.btnContainer}>
        <Button onPress={handleLand} title="Land" />
        <Button onPress={handleBail} title="Bail" />
      </View>
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

  btnContainer: {
    width: '50%',
    height: 85,
    justifyContent: 'space-between',
  },

  headerText: {
    fontSize: 30,
    margin: 10,
  },
});
