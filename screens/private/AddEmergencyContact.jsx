import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../constants/styles";
// import { EmergencyContext } from "../../store/emergency-context";
import { storeEmergency } from "../../utils/http";

const AddContactScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  // const { addEmergency } = useContext(EmergencyContext);

  const handleAddContact = async () => {
    const emergencyData = { name, email, phone };
    setLoading(true);
    try {
      const id = await storeEmergency(emergencyData);
      // addEmergency({ ...emergencyData, id });
      navigation.goBack();
    } catch (err) {
      console.log("Error saving contact:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleListContact = () => {
    navigation.navigate("ListOfContact");
  };

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.secondary]}
      style={styles.gradient}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Emergency</Text>
      </View>
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
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        {/* <TextInput
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
        /> */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAddContact}>
            <Text style={styles.buttonText}>
              {" "}
              {loading ? "Adding..." : "Add Contact"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleListContact}>
            <Text style={styles.buttonText}>List of Contacts</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 16,
    marginBottom: 12,
    width: "100%",
    color: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  button: {
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4c669f",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: "50%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 15,
  },
  backButton: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  backButtonText: {
    color: "#3b5998",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 20,
    // margin: 20,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
});

export default AddContactScreen;
