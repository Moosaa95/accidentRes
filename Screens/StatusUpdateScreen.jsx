import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';

const StatusUpdateScreen = ({ updates }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accident Reports & Updates</Text>
      <FlatList
        data={updates}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.updateItem}>
            <Text style={styles.updateDate}>{item.date}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  updateItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  updateDate: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});