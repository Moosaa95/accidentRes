import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import {Accelerometer, Gyroscope} from "expo-sensors"
import * as Battery from 'expo-battery';
import { Colors } from '../../constants/styles';


const DashboardScreen = ({ navigation}) => {
  const [batteryLevel, setBatteryLevel] = useState(0)
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe', 
    email: 'johndoe@example.com', 
  });

  const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0 });
  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });
  const [connectivityStatus, setConnectivityStatus] = useState('Offline');
  const [systemStatus, setSystemStatus] = useState('Sensors Inactive');

// useEffect(() => {
//   const subscription = Accelerometer.addListener(accelerometerData => {
//     setSensorData(accelerometerData);
//     setSystemStatus('Sensors Active');
//   });

//   Accelerometer.setUpdateInterval(1000); 

//   return () => subscription.remove();
// }, [batteryLevel]);

useEffect(() => {
  const fetchBatteryLevel = async () => {
    const level = await Battery.getBatteryLevelAsync();
    setBatteryLevel(level);
  };

  fetchBatteryLevel();

  const batteryLevelListener = Battery.addBatteryLevelListener(({ batteryLevel }) => {
    setBatteryLevel(batteryLevel);
  });

  const accelerometerSubscription = Accelerometer.addListener(data => setAccelerometerData(data));
  const gyroscopeSubscription = Gyroscope.addListener(data => setGyroscopeData(data));

  Accelerometer.setUpdateInterval(5000);
  Gyroscope.setUpdateInterval(5000);

  return () => {
    accelerometerSubscription.remove();
    gyroscopeSubscription.remove();
    batteryLevelListener.remove();
  };

  // return () => batteryLevelListener.remove();
}, []);

const isSensorActive = (accelerometerData.x || accelerometerData.y || accelerometerData.z || gyroscopeData.x || gyroscopeData.y || gyroscopeData.z);
console.log('is sensor', isSensorActive);

// useEffect(() => {
//   const subscription = Accelerometer.subscribe(({ x, y, z }) => {
//     setSensorData({ x, y, z });
//     setIsSensorActive(true);
//   }, () => {
//     setIsSensorActive(false);
//   });

//   return () => subscription.unsubscribe();
// }, []);

// Add sensor data to your system status
// setSystemStatus(isSensorActive ? 'Sensors Active' : 'Sensors Inactive');

  // Simulate data fetching (replace with actual logic to retrieve data from Firebase or backend)
//   useEffect(() => {
//     const fetchData = async () => {
//       // Simulate data retrieval
//       const response = await fetch('https://your-api.com/get-status'); // Replace with your API endpoint
//       const data = await response.json();
//       setSystemStatus(data.status); // Update system status based on API response
//     };
//     fetchData();
//   }, []);

  console.log(batteryLevel);

  const handleEmergencyPress = () => {
    navigation.navigate("AddEmergencyScreen")
  };

  const handleSettingsPress = () => {
    navigation.navigate("AlertSettingScreen")
  };

  const handleTestAlertPress = () => {
    // Implement test alert functionality
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={[Colors.primary, Colors.secondary]} style={styles.background}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome, {userInfo.name}</Text>
          <TouchableOpacity style={styles.settingsButton} onPress={handleSettingsPress}>
            <Image source={require('../../assets/splash.png')} style={styles.settingsIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.statusCard}>
          <Text style={styles.statusText}>System Status:</Text>
          <Text style={isSensorActive ? styles.statusActive : styles.statusInactive}>
          {isSensorActive ? 'Sensors Active' : 'Sensors Inactive'}
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergencyPress}>
            <Text style={styles.emergencyButtonText}>Emergency Contacts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsButton} onPress={handleSettingsPress}>
            <Text style={styles.settingsButtonText}>Alert Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.monitoringSection}>
          <Text style={styles.monitoringTitle}>System Monitoring</Text>
          <View style={styles.monitoringRow}>
            <Text style={styles.monitoringLabel}>Battery Level:</Text>
            <Text style={styles.monitoringValue}>{batteryLevel !== null ? `${(batteryLevel * 100).toFixed(0)}%` : 'Fetching...'}</Text> 
          </View>
          <View style={styles.monitoringRow}>
            <Text style={styles.monitoringLabel}>Connectivity:</Text>
            <Text style={styles.monitoringValue}>Online</Text> 
          </View>
        </View>

        {/* Test Alert Button (for simulation purposes) */}
        <TouchableOpacity style={styles.testAlertButton} onPress={handleTestAlertPress}>
          <MaterialIcons name="test-tube" size={24} color="#fff" />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  settingsButton: {
    padding: 10,
  },
  settingsIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  statusCard: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 20,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusActive: {
    fontSize: 18,
    color: '#28a745',
  },
  statusInactive: {
    fontSize: 18,
    color: '#dc3545',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  emergencyButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  emergencyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  settingsButtonText: {
    color: Colors.lightGray,
    fontWeight: 'bold',
  },
  monitoringSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 20,
    padding: 10,
  },
  monitoringTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  monitoringRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  monitoringLabel: {
    fontWeight: 'bold',
  },
  testAlertButton: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 20,
  },
  testAlertText: {
    // color: '#fff',
    color: Colors.black,
    marginLeft: 5,
    fontWeight: 'bold'
  },
  monitoringValue: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color:  '#333'
  },
});

export default DashboardScreen;
