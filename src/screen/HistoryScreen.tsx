import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useTimerContext } from "../context/TimerContext";
import HistoryCard from "../components/TimerHistoryCard";

const HistoryScreen = () => {
  const { state } = useTimerContext();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Completed Timers</Text>
      <FlatList
        data={state.history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HistoryCard name={item.name} completionTime={item.completionTime} />
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
});

export default HistoryScreen;