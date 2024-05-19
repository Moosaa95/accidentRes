import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/styles';

const AlertSettingsScreen = ({ navigation }) => {
  const [isEmailAlertEnabled, setIsEmailAlertEnabled] = useState(false);
  const [isSmsAlertEnabled, setIsSmsAlertEnabled] = useState(false);
  const [isPushNotificationEnabled, setIsPushNotificationEnabled] = useState(false);

  const toggleEmailAlert = () => setIsEmailAlertEnabled(previousState => !previousState);
  const toggleSmsAlert = () => setIsSmsAlertEnabled(previousState => !previousState);
  const togglePushNotification = () => setIsPushNotificationEnabled(previousState => !previousState);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={[Colors.primary, Colors.secondary]} style={styles.background}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Alert Settings</Text>
        </View>
        <View style={styles.settingsContainer}>
          <View style={styles.setting}>
            <Text style={styles.settingText}>Email Alerts</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEmailAlertEnabled ? '#f5dd4b' : '#f4f3f4'}
              onValueChange={toggleEmailAlert}
              value={isEmailAlertEnabled}
            />
          </View>
          {/* <View style={styles.setting}>
            <Text style={styles.settingText}>SMS Alerts</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isSmsAlertEnabled ? '#f5dd4b' : '#f4f3f4'}
              onValueChange={toggleSmsAlert}
              value={isSmsAlertEnabled}
            />
          </View> */}
          <View style={styles.setting}>
            <Text style={styles.settingText}>Push Notifications</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isPushNotificationEnabled ? '#f5dd4b' : '#f4f3f4'}
              onValueChange={togglePushNotification}
              value={isPushNotificationEnabled}
            />
          </View>
        </View>
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
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#3b5998',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  settingsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingText: {
    fontSize: 18,
  },
});

export default AlertSettingsScreen;
