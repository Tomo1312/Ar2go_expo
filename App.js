import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { sculptures } from "./src/data";
import { getDistance } from "geolib";
import Tabs from "./navigation/tabs";
import { NavigationContainer } from "@react-navigation/native";
import MapMenu from "./src/components/mapMenu";
import RegisterScreen from "./src/screens/Login/RegisterScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/Login/LoginScreen";
import HomeScreen from "./src/screens/Login/HomeScreen";
import ContainerNavigatorLogin from "./src/screens/Login/ContainerNavigatorLogin";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "white" },
  headerTitleStyle: { color: "black" },
  headerTintColor: "white",
  headerTitleAlign: "center",
  alignItems: "center",
  justifyContent: "center",
};
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          //initialRouteName="Home"
          screenOptions={globalScreenOptions}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="LoginNavigator"
            component={ContainerNavigatorLogin}
          />

          <Stack.Screen name="Tab" component={Tabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
