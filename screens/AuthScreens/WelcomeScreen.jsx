import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../constants/styles";
import Button from "../../components/Button";

const WelcomeScreen = ({ navigation }) => {
  console.log('ehyy', 'kdfkdfj');
  return (
    <LinearGradient
      style={styles.container}
      colors={[Colors.secondary, Colors.primary]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/splash.png")}
          style={[styles.image, styles.image1]}
        />
        <Image
          source={require("../../assets/splash.png")}
          style={[styles.image, styles.image2]}
        />
        <Image
          source={require("../../assets/splash.png")}
          style={[styles.image, styles.image3]}
        />
        <Image
          source={require("../../assets/splash.png")}
          style={[styles.image, styles.image4]}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Let's Get</Text>
        <Text style={styles.subtitle}>Started</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Accident Detection & Alert Report
          </Text>
          <Text style={styles.descriptionSmall}>
            Feel safe, stay informed.
          </Text>
        </View>
        <Button
          title="Join Now"
          style={styles.button}
          onPress={() => navigation.navigate("Signup")}
        />
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginButton}>Login</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 20,
    position: "absolute",
  },
  image1: {
    top: 10,
    left: 20,
    transform: [{ rotate: "-15deg" }],
  },
  image2: {
    top: 30,
    left: 150,
    transform: [{ rotate: "-5deg" }],
  },
  image3: {
    top: 130,
    left: -50,
    transform: [{ rotate: "15deg" }],
  },
  image4: {
    top: 110,
    left: 100,
    height: 200,
    width: 200,
    transform: [{ rotate: "-15deg" }],
  },
  textContainer: {
    paddingHorizontal: 22,
    position: "absolute",
    top: 400,
    width: "100%",
  },
  title: {
    fontSize: 50,
    fontWeight: "800",
    color: Colors.white,
  },
  subtitle: {
    fontSize: 40,
    fontWeight: "800",
    color: Colors.white,
  },
  descriptionContainer: {
    marginVertical: 22,
  },
  description: {
    fontSize: 16,
    color: Colors.white,
    marginVertical: 4,
  },
  descriptionSmall: {
    fontSize: 16,
    color: Colors.white,
  },
  button: {
    marginTop: 22,
    width: "100%",
  },
  loginContainer: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 12,
    gap: 10,
  },
  loginText: {
    fontSize: 16,
    color: Colors.white,
  },
  loginButton: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
