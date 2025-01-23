import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  Button,
  Alert,
} from "react-native";
import { useTimerContext } from "../context/TimerContext";
import TimerCard from "../components/TimerCard";
import { Timer } from "../context/types";
import { navigate } from "../utills/NavigationUtil";

const HomeScreen = () => {
  const { state, dispatch } = useTimerContext();
  const [groupedTimers, setGroupedTimers] = useState<{ title: string; data: Timer[] }[]>([]);
  
  useEffect(() => {
    const grouped = state.timers.reduce((acc: any, timer: Timer) => {
      acc[timer.category] = acc[timer.category] || [];
      acc[timer.category].push(timer);
      return acc;
    }, {});

    const sections = Object.keys(grouped).map((category) => ({
      title: category,
      data: grouped[category],
    }));

    setGroupedTimers(sections);
  }, [state.timers]);

  const handleBulkAction = (action: "start" | "pause" | "reset", category: string) => {
    state.timers
      .filter((timer) => timer.category === category)
      .forEach((timer) => {
        if (action === "start") {
          dispatch({ type: "UPDATE_TIMER", payload: { ...timer, status: "Running" } });
        } else if (action === "pause") {
          dispatch({ type: "UPDATE_TIMER", payload: { ...timer, status: "Paused" } });
        } else if (action === "reset") {
          dispatch({ type: "UPDATE_TIMER", payload: { ...timer, status: "Paused", remainingTime: timer.duration } });
        }
      });
  };

  return (
    <View style={styles.container}>
      <Button title="Add Timer" onPress={() => navigate("Add Timer")} />
      <SectionList
        sections={groupedTimers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TimerCard
          timer={item}
          onStart={() => dispatch({ type: "UPDATE_TIMER", payload: { ...item, status: "Running" } })}
          onPause={() => dispatch({ type: "UPDATE_TIMER", payload: { ...item, status: "Paused" } })}
          onReset={() =>
            dispatch({
              type: "UPDATE_TIMER",
              payload: { ...item, status: "Paused", remainingTime: item.duration },
            })
          }
          onDelete={() => dispatch({ type: "DELETE_TIMER", payload: item.id })}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.bulkActions}>
              <Button title="Start All" onPress={() => handleBulkAction("start", title)} />
              <Button title="Pause All" onPress={() => handleBulkAction("pause", title)} />
              <Button title="Reset All" onPress={() => handleBulkAction("reset", title)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  sectionHeader: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bulkActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
});

export default HomeScreen;