import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Timer } from '../context/TimerContext';

interface TimerCardProps {
  timer: Timer;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

const TimerCard: React.FC<TimerCardProps> = ({ timer, onStart, onPause, onReset }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{timer.name}</Text>
      <Text>{`Remaining Time: ${timer.remainingTime}s`}</Text>
      <Text>{`Status: ${timer.status}`}</Text>
      <Button title="Start" onPress={onStart} />
      <Button title="Pause" onPress={onPause} />
      <Button title="Reset" onPress={onReset} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TimerCard;