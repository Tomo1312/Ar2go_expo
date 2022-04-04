import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import { colors, statusBarHeight } from "../../globalStyles";

const MaterialTopTabs = createMaterialTopTabNavigator();
const ContainerNavigatorLogin = ({ navigation, route }) => {
  const { screen } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <MaterialTopTabs.Navigator
      initialRouteName={screen}
      screenOptions={{
        headerTitle: false,
        tabBarLabelStyle: { fontSize: 12, },
        tabBarItemStyle: { width: 100 },
        tabBarActiveTintColor: colors.main,
        tabBarInactiveTintColor: colors.second,
        tabBarStyle: {
          elevation: 0,
          shadowOffset: {
            width: 0,
            height: 0, // for iOS
          },
        },
        tabBarIndicatorStyle: {
          backgroundColor: null,
        },
      }}
      style={{ marginTop: statusBarHeight }}
    >
      <MaterialTopTabs.Screen name="Register" component={RegisterScreen} on />
      <MaterialTopTabs.Screen name="Login" component={LoginScreen} />
    </MaterialTopTabs.Navigator>
  );
};

export default ContainerNavigatorLogin;

const styles = StyleSheet.create({});
