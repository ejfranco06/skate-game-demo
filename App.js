import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import useCachedResources from './hooks/useCachedResources';
import { OpponentSelectionScreen } from './screens/OpponentSelectionScreen';
import { AppProvider } from './context/app-context';

const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppProvider>
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Opponent Selection"
                component={OpponentSelectionScreen}
              />
              <Stack.Screen name="Root2" component={OpponentSelectionScreen} />
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar style="auto" />
        </View>
      </AppProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
