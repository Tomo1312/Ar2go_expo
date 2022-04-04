import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../globalStyles";
import { Button } from "react-native-elements";
import { auth, db } from "../../components/firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayLoading, setDisplayLoading] = useState(false);

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        setDisplayLoading(true);
        auth.currentUser.sendEmailVerification({
          handleCodeInApp: true,
          url: "https://ar2go-bdf06.firebaseapp.com",
        });
        // auth.sendSignInLinkToEmail(email,actionCodeSettings);
        // setDisplayLoading(true);
      })
      .catch((error) => alert(error.message));
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        db.ref("/Users/" + authUser.uid).set({
          email: email,
          name: name,
          unlockedSculptures: "",
          points: 0,
        });
        auth.signOut().then(() => {
          navigation.replace("Login");
          setDisplayLoading(false);
        });
      }
    });
    return unsubscribe;
  }, []);
  return (
    <KeyboardAvoidingView style={styles.container}>
    <StatusBar backgroundColor={colors.white} />
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Name</Text>
        <TextInput
          style={styles.input}
          autofocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
          underlineColorAndroid="transparent"
        />
      </View>
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
          title="Sign Up"
          onPress={register}
        />
      </View>
      {/* <View style={styles.bottomContainer}>
        <Text>Already have an account?</Text>
        <TouchableOpacity
          style={{ paddingLeft: 10 }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text
            style={{ textDecorationLine: "underline", color: colors.textBlue }}
          >
            Sign In
          </Text>
        </TouchableOpacity>
      </View> */}
      {displayLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

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
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    backgroundColor: "rgba(20, 20, 20, 0.8)",
    display: "none",
  },
});
