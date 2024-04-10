import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

const EmergencyContactsScreen = ({ contacts, onAddPress, onEditPress, onDeletePress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <Text style={styles.contactName}>{item.name}</Text>
            <Text>{item.phone}</Text>
            <Button title="Edit" onPress={() => onEditPress(item.id)} />
            <Button title="Delete" onPress={() => onDeletePress(item.id)} color="red" />
          </View>
        )}
      />
      <Button title="Add New Contact" onPress={onAddPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contactItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  contactName: {
    fontWeight: 'bold',
  },
});

export default EmergencyContactsScreen;
