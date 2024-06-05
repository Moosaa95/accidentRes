import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Accelerometer } from "expo-sensors";
import * as Battery from "expo-battery";
import { Colors } from "../../constants/styles";
import IconButton from "../../components/ui/IconButton";
import { AuthContext } from "../../store/auth-context";
import * as MailComposer from "expo-mail-composer";
import { fetchEmergencies } from "../../utils/http";

const DashboardScreen = ({ navigation }) => {
  const [batteryLevel, setBatteryLevel] = useState(0);
  const authCtx = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
  });

  const [accelerometerData, setAccelerometerData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const fetchBatteryLevel = async () => {
      const level = await Battery.getBatteryLevelAsync();
      setBatteryLevel(level);
    };

    fetchBatteryLevel();

    const batteryLevelListener = Battery.addBatteryLevelListener(
      ({ batteryLevel }) => {
        setBatteryLevel(batteryLevel);
      }
    );

    const accelerometerSubscription = Accelerometer.addListener((data) => {
      setAccelerometerData(data);
      detectAccident(data);
    });
    Accelerometer.setUpdateInterval(1000);

    return () => {
      accelerometerSubscription.remove();
      batteryLevelListener.remove();
    };
  }, []);

  const detectAccident = (data) => {
    const threshold = 10;
    if (
      Math.abs(data.x) > threshold ||
      Math.abs(data.y) > threshold ||
      Math.abs(data.z) > threshold
    ) {
      sendEmergencyMessage();
    }
  };

  const sendEmergencyMessage = async () => {
    const emergencies = await fetchEmergencies();
    const emergencyContactEmail = emergencies[0].email;
    const subject = "Emergency Alert";
    const body =
      "Emergency! Possible accident detected. Please check on the user immediately.";

    try {
      const { status } = await MailComposer.composeAsync({
        recipients: [emergencyContactEmail],
        subject: subject,
        body: body,
      });

      if (status === "sent") {
        Alert.alert(
          "Email Sent",
          "An alert email has been sent to your emergency contact.",
          [{ text: "OK" }]
        );
      } else {
        Alert.alert("Email Not Sent", "Failed to send alert email.", [
          { text: "OK" },
        ]);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      Alert.alert("Error", "Failed to send alert email.", [{ text: "OK" }]);
    }
  };

  const isSensorActive =
    accelerometerData.x ||
    accelerometerData.y ||
    accelerometerData.z ||
    gyroscopeData.x ||
    gyroscopeData.y ||
    gyroscopeData.z;

  const handleLogout = () => {
    authCtx.logout();
  };

  const handleEmergencyPress = () => {
    navigation.navigate("AddEmergencyScreen");
  };

  const handleSettingsPress = () => {
    navigation.navigate("AlertSettingScreen");
  };

  const handleTestAlertPress = () => {
    sendEmergencyMessage();
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        style={styles.background}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Welcome, {userInfo.name}</Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={handleLogout}
          >
            <IconButton icon="exit" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.statusCard}>
          <Text style={styles.statusText}>System Status:</Text>
          <Text
            style={isSensorActive ? styles.statusActive : styles.statusInactive}
          >
            {isSensorActive ? "Sensors Active" : "Sensors Inactive"}
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.emergencyButton}
            onPress={handleEmergencyPress}
          >
            <Text style={styles.emergencyButtonText}>Emergency Contacts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={handleSettingsPress}
          >
            <Text style={styles.settingsButtonText}>Alert Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.monitoringSection}>
          <Text style={styles.monitoringTitle}>System Monitoring</Text>
          <View style={styles.monitoringRow}>
            <Text style={styles.monitoringLabel}>Battery Level:</Text>
            <Text style={styles.monitoringValue}>
              {batteryLevel !== null
                ? `${(batteryLevel * 100).toFixed(0)}%`
                : "Fetching..."}
            </Text>
          </View>
          <View style={styles.monitoringRow}>
            <Text style={styles.monitoringLabel}>Connectivity:</Text>
            <Text style={styles.monitoringValue}>Online</Text>
          </View>
        </View>

        {/* Test Alert Button (for simulation purposes) */}
        <TouchableOpacity
          style={styles.testAlertButton}
          onPress={handleTestAlertPress}
        >
          <IconButton icon="alert" size={24} />
          <Text style={styles.testAlertText}>Test Alert</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  settingsButton: {
    padding: 10,
  },
  statusCard: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 20,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statusActive: {
    fontSize: 18,
    color: "#28a745",
  },
  statusInactive: {
    fontSize: 18,
    color: "#dc3545",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  emergencyButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  emergencyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  settingsButtonText: {
    color: Colors.lightGray,
    fontWeight: "bold",
  },
  monitoringSection: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 20,
    padding: 10,
  },
  monitoringTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  monitoringRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  monitoringLabel: {
    fontWeight: "bold",
  },
  testAlertButton: {
    backgroundColor: "#dc3545",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 20,
  },
  testAlertText: {
    color: Colors.black,
    marginLeft: 5,
    fontWeight: "bold",
  },
  monitoringValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default DashboardScreen;
