import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../constants/styles";
import { deleteEmergency, fetchEmergencies } from "../../utils/http";

const ContactsListScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emergencies, setEmergencies] = useState([]);

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const emergenciesData = await fetchEmergencies();
      console.log("Fetched Emergencies:", emergenciesData);
      if (emergenciesData) {
        setEmergencies(emergenciesData);
      } else {
        setEmergencies([]);
      }
    } catch (err) {
      console.error("Error fetching emergencies:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEmergency(id);
      setEmergencies((prevEmergencies) =>
        prevEmergencies.filter((emergency) => emergency.id !== id)
      );
      Alert.alert("Success", "Emergency contact deleted successfully", [
        { text: "OK" },
      ]);
    } catch (error) {
      console.error("Error deleting emergency:", error);
      Alert.alert("Error", "Failed to delete emergency contact", [
        { text: "OK" },
      ]);
    }
  };

  // const renderItem = ({ item }) => {
  //   console.log("Rendering item:", item);
  //   return (
  //     <View style={styles.contactItem}>
  //       <Text style={styles.contactName}>{item.name}</Text>
  //       <Text style={styles.contactInfo}>{item.email}</Text>
  //       {/* <Text style={styles.contactInfo}>{item.phone}</Text> */}
  //     </View>
  //   );
  // };
  const renderItem = ({ item }) => {
    console.log("Rendering item:", item);
    return (
      <View style={styles.contactItem}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactInfo}>{item.email}</Text>
        {/* <Text style={styles.contactInfo}>{item.phone}</Text> */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Loading Contacts...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            onPress={() => {
              setError(null);
              fetchContacts();
            }}
            style={styles.retryButton}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (emergencies.length === 0) {
      return (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>No Contacts Found</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={emergencies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    );
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
        <Text style={styles.title}>Contacts List</Text>
      </View>
      {renderContent()}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 20,
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
  listContainer: {
    paddingHorizontal: 16,
  },
  contactItem: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  contactInfo: {
    fontSize: 14,
    color: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#fff",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  retryButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  retryButtonText: {
    color: "#3b5998",
    fontWeight: "bold",
  },
  emptyImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#fff",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ContactsListScreen;
