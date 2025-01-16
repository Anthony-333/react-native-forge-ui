import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-forge-ui';

export default function App() {
  return (
    <View style={styles.container}>
      <Button onPress={() => console.log('Default button pressed')}>
        Default Button
      </Button>
      
      <Button 
        variant="destructive" 
        onPress={() => console.log('Destructive button pressed')}
        style={styles.buttonSpacing}
      >
        Destructive Button
      </Button>
      
      <Button 
        variant="outline"
        onPress={() => console.log('Outline button pressed')}
        style={styles.buttonSpacing}
      >
        Outline Button
      </Button>
      
      <Button 
        variant="secondary"
        onPress={() => console.log('Secondary button pressed')}
        style={styles.buttonSpacing}
      >
        Secondary Button
      </Button>
      
      <Button 
        size="sm"
        onPress={() => console.log('Small button pressed')}
        style={styles.buttonSpacing}
      >
        Small Button
      </Button>
      
      <Button 
        size="lg"
        onPress={() => console.log('Large button pressed')}
        style={styles.buttonSpacing}
      >
        Large Button
      </Button>
    </View>
  );
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
