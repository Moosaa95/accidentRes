import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../../constants/styles';
import { useContext, useState } from 'react';
import Button from '../../components/Button';
import { login } from '../../utils/auth';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import { AuthContext } from '../../store/auth-context';





const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const authCtx = useContext(AuthContext)

  console.log('login');

  const handleLogin = async() => {

    if (!email || !password) {
      Alert.alert('Invalid input', 'Please enter a valid email and password.');
      return;
    }

    setIsAuthenticating(true)
    try {
      const token = await login(email, password)
      console.log('l;ogin ds', token);
      authCtx.authenticate(token)
      // navigation.navigate('Dashboard')
    }
    catch (err) {
      console.log('errr carch', err);
      Alert.alert("you can not log in ", "please check latter")
    }
    
      setIsAuthenticating(false)

    
  }

if (isAuthenticating){
  return <LoadingOverlay message="logging a user" />
}


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <Button onPress={handleLogin} title="Login" filled style={styles.button}  />

      {/* <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: Colors.background,
      },
      title: {
        fontSize: 28,
        marginBottom: 32,
        color: Colors.primary,
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
        backgroundColor: Colors.secondary,
        borderRadius: 8,
      },
      buttonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: 'bold',
      },
});

export default LoginScreen;
