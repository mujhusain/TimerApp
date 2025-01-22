import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTimerContext } from "../context/TimerContext";

const AddTimerScreen = ({ navigation }: { navigation: any }) => {
  const { dispatch } = useTimerContext();
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("Workout");

  // Alternative for generating unique IDs
  const generateUniqueId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };

  const handleSave = () => {
    if (!name || !duration) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    const newTimer = {
      id: generateUniqueId(),
      name,
      duration: parseInt(duration),
      remainingTime: parseInt(duration),
      status: "Paused" as "Paused" | "Running" | "Completed",
      category,
    };

    dispatch({ type: "ADD_TIMER", payload: newTimer });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Timer Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter timer name"
      />

      <Text style={styles.label}>Duration (in seconds)</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        placeholder="Enter duration"
      />

      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue: string) => setCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Workout" value="Workout" />
        <Picker.Item label="Study" value="Study" />
        <Picker.Item label="Break" value="Break" />
      </Picker>

      <Button title="Save Timer" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  picker: {
    marginVertical: 16,
  },
});

export default AddTimerScreen;