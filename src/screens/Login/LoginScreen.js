import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../globalStyles";
import { Button } from "react-native-elements";
import { auth } from "../../components/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser && authUser.emailVerified) {
        navigation.replace("Tab");
      } else {
        console.log("Potvrdite mail");
        auth.signOut();
      }
    });

    return unsubscribe;
  }, []);
  const singIn = () => {
    savedata();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
  };

  const savedata = () => {
    let value = { email: email, password: password };
    AsyncStorage.setItem("user", JSON.stringify(value));
    //  this.setState({myKey: value});

    console.log("value: ", value);
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar backgroundColor={colors.white} />
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.input}
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.input}
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          titleStyle={{
            color: "white",
            fontSize: 16,
          }}
          buttonStyle={styles.button}
          title="Sign in"
          onPress={singIn}
        />
      </View>
      {/* <View style={styles.bottomContainer}>
        <Text>Already have an account?</Text>
        <TouchableOpacity
          style={{ paddingLeft: 10 }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text
            style={{ textDecorationLine: "underline", color: colors.textBlue }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View> */}
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
    marginVertical: 10,
  },
  input: {
    fontSize: 15,
    height: 50,
    paddingLeft: 20,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#7F5Df0",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
    elevation: 1,
    backgroundColor: "#F7F8F9",
  },
  text: {
    color: colors.main,
    fontSize: 20,
    fontFamily: "Roboto",
  },
  buttonContainer: {
    justifyContent: "space-between",
    marginTop: 10,
    width: 250,
  },
  button: {
    backgroundColor: colors.main,
    borderRadius: 10,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", //Here is the trick
    bottom: 10,
  },
});
