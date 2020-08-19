import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useApp } from '../context/app-context';
import axios from 'axios';
import { Opponent } from '../components/Opponent';
import { ScrollView } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';

export const OpponentSelectionScreen = ({ navigation }) => {
  const [opponents, setOpponents] = useState([]);
  const { setCurrentOpponent } = useApp();

  const handleOpponentSelection = (opponent) => {
    setCurrentOpponent(opponent);
    navigation.navigate('Game');
  };

  const getOpponents = () => {
    axios
      .get('https://randomuser.me/api/?results=5&inc=id,name,picture&nat=us')
      .then((response) => {
        setOpponents(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getOpponents();
  }, []);

  const listOfOpponents = () =>
    opponents.map((opp) => {
      const opponent = extractOpponent(opp);
      return (
        <Opponent
          key={opponent.name}
          opponent={opponent}
          handleOpponentSelection={handleOpponentSelection}
        />
      );
    });

  let list = listOfOpponents();
  return (
    <View style={styles.container}>
      <MonoText style={styles.headerText}> Opponents </MonoText>
      <ScrollView style={styles.opponentList} horizontal={true}>
        {list}
      </ScrollView>
      <View style={{ width: 200, marginBottom: 50 }}>
        <Button onPress={getOpponents} title="refresh" />
      </View>
    </View>
  );
};

function randomizeOpponentSkill() {
  return getRndInteger(45, 80);
}

function extractOpponent(data = {}) {
  const name = `${data.name.first} ${data.name.last}`;
  const skill = randomizeOpponentSkill();
  const picUrl = data.picture.large;
  return { name, skill, picUrl };
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
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
  btn: {
    width: 500,
    color: 'red',
  },
});
