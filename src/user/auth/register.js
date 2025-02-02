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
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { auth, db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState();

  const handleRegister = async () => {
    if (!email) {
      Alert.alert("Error", "Email harus diisi.");
      return;
    }
    if (!fullName) {
      Alert.alert("Error", "Nama harus diisi.");
      return;
    }
    if (!role) {
      Alert.alert("Error", "Role harus dipilih.");
      return;
    }

    if (!password) {
      Alert.alert("Error", "Password harus diisi.");
      return;
    }

    if (!confirmPassword) {
      Alert.alert("Error", "Konfirmasi password harus diisi.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Password dan konfirmasi password tidak cocok.");
      return;
    }

    // Simpan data ke AsyncStorage (opsional, bisa diganti dengan API)
    // await AsyncStorage.setItem('email', email);
    // await AsyncStorage.setItem('password', password);

    handleSignIn();
  };

  const handleSignIn = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: email,
        fullName: fullName,
        role: role,
      });
      Alert.alert("Success", "Registrasi berhasil!");
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("error", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SafeAreaView style={styles.container}>
          <Image
            source={require("../../../assets/LOGOPKL.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title}>Register</Text>
          <View style={styles.inputView}>
            <Text style={{ fontWeight: "bold" }}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan Email Anda"
              value={email}
              onChangeText={setEmail}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Text style={{ fontWeight: "bold" }}>Nama</Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan Nama Anda"
              value={fullName}
              onChangeText={setFullName}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <Text style={{ fontWeight: "bold" }}>Role</Text>
            <Picker
              selectedValue={role}
              onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
              style={styles.input}
            >
              <Picker.Item label="Pilih Role" value={null} />
              <Picker.Item label="Pedagang" value="pedagang" />
              <Picker.Item label="Petugas" value="petugas" />
              <Picker.Item label="Customer" value="customer" />
            </Picker>
            <Text style={{ fontWeight: "bold" }}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Masukkan Password Anda"
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
                  color="#000"
                />
              </TouchableOpacity>
            </View>
            <Text style={{ fontWeight: "bold" }}>Konfirmasi Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan Konfirmasi Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.footerText}>Sudah punya akun? Login</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // Gunakan style yang sama dari kode sebelumnya
  // Tambahkan atau ubah jika diperlukan
  container: {
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 75,
  },
  backgroundImage: {
    width: "100%",
    height: "34%",
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
    backgroundColor: "#FFA135",
    height: 45,
    width: 145,
    borderColor: "#FFA135",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
