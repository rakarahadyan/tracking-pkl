import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  ImageBackground,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, db } from "../../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email) {
      Alert.alert("Error", "email harus diisi.");
      return;
    }

    if (!password) {
      Alert.alert("Error", "Password harus diisi.");
      return;
    }

    if (email && password) {
      // await AsyncStorage.setItem('email', email);
      // await AsyncStorage.setItem('password', password);
      handleSignIn();
    } else {
      Alert.alert("Error", "Email atau password salah.");
    }
  };

  const handleSignIn = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      navigation.replace("Dashboard");
    } catch (error) {
      Alert.alert("error", error.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../../../assets/LOGOPKL.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Tracking Pedagang Kaki Lima</Text>
        <Text
          style={{
            alignSelf: "start",
            paddingHorizontal: 40,
            paddingBottom: 20,
            fontSize: 15,
          }}
        >
          Login dulu nanti keburu laper
        </Text>
        <View style={styles.inputView}>
          <Text style={{ fontWeight: "bold" }}> Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukan Email Anda"
            value={email}
            onChangeText={setEmail}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <Text style={{ fontWeight: "bold" }}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Masukan Password Anda"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.showPasswordButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color={"#000"}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={[styles.buttonText, { color: "#FFA135" }]}>
              Daftar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#FFA135" }]}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Masuk</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ alignSelf: "start", paddingHorizontal: 40 }}>
          Lupa Password ?{" "}
        </Text>
      </SafeAreaView>
      <ImageBackground
        source={require("../../../assets/gerobak.png")}
        style={[styles.backgroundImage]}
      ></ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 75,
  },
  backgroundImage: {
    width: "100%",
    height: "64%",
    marginLeft: 40,
  },
  image: {
    height: 100,
    width: 250,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: 40,
    paddingVertical: 30,
    color: "black",
  },
  inputView: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 7,
    backgroundColor: "#EDEDED",
  },
  inputPassword: {
    flex: 1,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 7,
    backgroundColor: "#EDEDED",
    padding: 10,
    marginBottom: 10,
  },
  showPasswordButton: {
    marginLeft: 10,
  },
  buttonView: {
    paddingVertical: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  button: {
    backgroundColor: "white",
    height: 45,
    width: 145,
    borderColor: "#FFA135",
    borderWidth: 1,
    // borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    color: "white",
  },
});
