import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text } from 'react-native';

const AccidentReportScreen = ({ onSubmit }) => {
  const [description, setDescription] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report an Accident</Text>
      <TextInput
        style={styles.input}
        placeholder="Accident Description"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Submit Report" onPress={() => onSubmit({ description })} />
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
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlignVertical: 'top',
  },
});
