import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/styles';

const AddContactScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddContact = async () => {
    // const userId = firebase.auth().currentUser.uid;
    // await firebase.firestore().collection('users').doc(userId).collection('contacts').add({
    //   name,
    //   phone,
    // });
    navigation.goBack();
  };

  return (
    <LinearGradient colors={[Colors.primary, Colors.secondary]} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Add Emergency Contact</Text>
        <TextInput 
          placeholder="Name" 
          value={name} 
          onChangeText={setName} 
          style={styles.input} 
          placeholderTextColor="#aaa"
        />
        <TextInput 
          placeholder="Phone" 
          value={phone} 
          onChangeText={setPhone} 
          style={styles.input} 
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.button} onPress={handleAddContact}>
          <Text style={styles.buttonText}>Add Contact</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 16,
    marginBottom: 12,
    width: '100%',
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  button: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4c669f',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddContactScreen;
