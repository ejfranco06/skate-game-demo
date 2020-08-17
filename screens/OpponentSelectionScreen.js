import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import axios from 'axios';

import { Opponent } from '../components/Opponent';

export const OpponentSelectionScreen = () => {
  const [opponents, setOpponents] = useState([]);

  useEffect(() => {
    axios
      .get('https://randomuser.me/api/?results=4&inc=id,name,picture')
      .then((response) => {
        
        setOpponents(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const randomizeOpponentSkill = () => {
    return getRndInteger(45, 89);
  };
  const listOfOpponents = () =>
    opponents.map((opp) => {
      const name = `${opp.name.first} ${opp.name.last}`;
      return (
        <Opponent
          key={name}
          name={name}
          skill={randomizeOpponentSkill()}
          picUrl={opp.picture.large}
        />
      );
    });

 const  list = listOfOpponents();
  return (
    <View style={styles.container}>
      <Text> Choose an Opponent</Text>
      {list}
    </View>
  );
};

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
