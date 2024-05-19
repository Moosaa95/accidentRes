import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../../constants/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    // Perform signup logic, such as sending data to a server
    // For now, just navigate to the Dashboard screen
    navigation.navigate('Dashboard');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor:Colors.white }}>
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <Text style={styles.subTitle}>Register to detect</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      {/* <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity> */}
      <Button onPress={handleSignup} title="Signup" filled style={{marginTop: 18, marginBottom: 4}} />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 16,
    marginHorizontal: 22,
    backgroundColor: Colors.background,

  },
  title: {
    fontSize: 22,
    marginVertical: 12,
    color: Colors.black,
    fontWeight: 'bold',

  },
  input: {
    width: '100%',
    padding: 16,
    marginVertical: 10,
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  button: {
    marginTop: 24,
    padding: 16,
    width: '100%',
    alignItems: 'center',
    backgroundColor: Colors.alert,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    color: Colors.black
  }
});

export default SignupScreen;
