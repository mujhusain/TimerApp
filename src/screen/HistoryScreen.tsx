import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useTimerContext } from "../context/TimerContext";

const HistoryScreen = () => {
  const { state } = useTimerContext();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Completed Timers</Text>
      <FlatList
        data={state.history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{`Completed At: ${item.completionTime}`}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No timers completed yet.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HistoryScreen;