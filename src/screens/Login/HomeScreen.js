import {
  Animated,
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { colors, statusBarHeight } from "../../globalStyles";
import { StatusBar } from "expo-status-bar";
import { auth } from "../../components/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const animImage = useRef(new Animated.Value(0)).current;
  const anim = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0];
  // const animTmp = useEffect(new Animated.Value(0));
  const { height, width } = useWindowDimensions();
  const [startHome, setStartHome] = useState(false);

  AsyncStorage.getItem("user").then((value) => {
    if (value) {
      const { email, password } = JSON.parse(value);
      auth.signInWithEmailAndPassword(email, password).then(() => {
        if (auth.currentUser.emailVerified) {
          navigation.replace("Tab");
        }
      });
      // this.setState({myKey: valueParsed});
    }
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  setTimeout(() => {
    // setStartHome(true);
    fadeIn();
    // moveUp();
  }, 2000);

  const driver = useRef(new Animated.Value(0)).current; //1 if the button should be shown by default

  const fadeIn = () => {
    Animated.timing(driver, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // useEffect(() => {}, [anim]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.main} />
      {/* style={[animImage.getLayout()]} */}
      <Animated.View
        style={{
          transform: [
            {
              translateY: driver.interpolate({
                inputRange: [0, 1],
                outputRange: [200, 0],
              }),
            },
          ],
        }}
      >
        <Image
          style={{
            alignContent: "center",
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",

            width: 179,
            height: 283,
          }}
          source={require("../../../img/art222.png")}
        />
      </Animated.View>

      {/* {
            position: "absolute",
            left: width / 2 - 179 / 2,
            top: height / 2 - 320 / 2,
            flex: 1,
          }, */}
      {/* style={[anim.getLayout()]} */}
      <Animated.View
        style={{
          transform: [
            {
              translateY: driver.interpolate({
                inputRange: [0, 1],
                outputRange: [height, 0],
              }),
            },
          ],
          flex: 1,
        }}
      >
        <ImageBackground
          resizeMode="cover"
          style={[
            {
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            },
          ]}
          source={require("../../../img/HomeBackground.png")}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("LoginNavigator", { screen: "Login" });
            }}
          >
            <Text style={styles.text}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { marginTop: 30, backgroundColor: colors.second },
            ]}
            onPress={() => {
              navigation.navigate("LoginNavigator", {
                screen: "Register",
              });
            }}
          >
            <Text style={styles.text}>Register</Text>
          </TouchableOpacity>
        </ImageBackground>
      </Animated.View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
    marginTop: statusBarHeight,
    paddingTop: 10,
  },
  // imageTesla:
  imageTeslaHome: {
    width: 179,
    height: 270,
    marginTop: -300,
  },
  button: {
    backgroundColor: colors.main,
    width: 200,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    color: colors.white,
  },
});
