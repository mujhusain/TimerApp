import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Timer } from '../context/TimerContext';

interface TimerCardProps {
  timer: Timer;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onDelete: () => void;
}

const TimerCard: React.FC<TimerCardProps> = ({ timer, onStart, onPause, onReset, onDelete }) => {
  // Calculate progress percentage
  const progress = (timer.remainingTime / timer.duration) * 100;

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.deleteIcon} onPress={onDelete}>
        <Icon name="trash-outline" size={20} />
      </TouchableOpacity>

      <Text style={styles.name}>{timer.name}</Text>
      <Text style={styles.remainingTime}>{`Remaining Time: ${timer.remainingTime}s`}</Text>
      <Text style={styles.status}>{`Status: ${timer.status}`}</Text>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Start" onPress={onStart} color="#4caf50" />
        <Button title="Pause" onPress={onPause} color="#ff9800" />
        <Button title="Reset" onPress={onReset} color="#f44336" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  deleteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
  },
  name: {
    fontSize: 20,
    color: '#3C75BE',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  remainingTime: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  progressBarContainer: {
    height: 10,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TimerCard;