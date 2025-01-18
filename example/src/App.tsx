import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-forge-ui';

export default function App() {
  return <View style={styles.container}>

    <Button>
      Click Me
    </Button>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  buttonSpacing: {
    marginTop: 12,
  },
});
