import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Ensure you have react-native-vector-icons installed
import { Timer } from "../context/TimerContext";
import Button from "./globale/Button";

interface TimerCardProps {
  timer: Timer;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onDelete: () => void; // Function for delete button
}

const TimerCard: React.FC<TimerCardProps> = ({
  timer,
  onStart,
  onPause,
  onReset,
  onDelete,
}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.deleteIcon} onPress={onDelete}>
        <Icon name="trash-outline" size={20} />
      </TouchableOpacity>
      <Text style={styles.name}>{timer.name}</Text>
      <Text
        style={styles.remainingTime}
      >{`Remaining Time: ${timer.remainingTime}s`}</Text>
      <Text style={styles.status}>{`Status: ${timer.status}`}</Text>
      <View style={styles.buttonContainer}>
        <Button disabled={timer.status=='Running'} title="Start" onPress={onStart} />
        <Button disabled={timer.status=='Paused'} title="Pause" onPress={onPause} />
        <Button title="Reset" onPress={onReset} />
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
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  deleteIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  remainingTime: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: "#888",
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default TimerCard;
