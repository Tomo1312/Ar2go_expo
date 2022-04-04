import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StoryScreen from "../src/screens/StoryScreen";
import PremiumScreen from "../src/screens/PremiumScreen";
import FreelanceScreen from "../src/screens/FreelanceScreen";
import TicketScreen from "../src/screens/TicketScreen";
import ProfileScreen from "../src/screens/ProfileScreen";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { color } from "react-native-elements/dist/helpers";
import { colors } from "../src/globalStyles";
import { useLayoutEffect } from "react";
import HomeScreen from "../src/screens/Login/HomeScreen";
import { store } from "../src/redux/store";
import { Provider } from "react-redux";

const Tab = createBottomTabNavigator();

const Tabs = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
      <Tab.Navigator
        initialRouteName="Freelance"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: [
            {
              display: "flex",
            },
            null,
          ],
        }}
      >
        <Tab.Screen
          name="Story"
          component={StoryScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <FontAwesome
                  name="map-o"
                  size={24}
                  color={focused ? colors.main : "#748c94"}
                />
                <Text style={{ color: focused ? colors.main : "#748c94" }}>
                  Story
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Premium"
          component={PremiumScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <FontAwesome5
                  name="city"
                  color={focused ? colors.main : "#748c94"}
                  size={24}
                />
                <Text style={{ color: focused ? colors.main : "#748c94" }}>
                  Premium
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Freelance"
          component={FreelanceScreen}
          focused={true}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 55,
                  height: 55,
                  borderRadius: 35,
                  backgroundColor: "white",
                  ...styles.shadow,
                  marginBottom: 30,
                }}
              >
                <FontAwesome
                  name="map-marker"
                  size={50}
                  color={focused ? colors.main : "#748c94"}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Ticket"
          component={TicketScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <FontAwesome
                  name="ticket"
                  color={focused ? colors.main : "#748c94"}
                  size={24}
                />
                <Text style={{ color: focused ? colors.main : "#748c94" }}>
                  Ticket
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialCommunityIcons
                  name="account"
                  size={24}
                  color={focused ? colors.main : "#748c94"}
                />
                <Text style={{ color: focused ? colors.main : "#748c94" }}>
                  Profile
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5Df0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
