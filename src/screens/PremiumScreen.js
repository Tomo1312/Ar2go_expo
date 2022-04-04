import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { colors } from "../globalStyles";
import { storage } from "../components/firebase";
import * as FileSystem from "expo-file-system";

const PremiumScreen = () => {
  const [authorDisplayed, setAuthorDisplay] = useState(false);
  const [yearsDisplayed, setYearsDisplay] = useState(false);
  let options = { encoding: FileSystem.EncodingType.Base64 };

  const downloadUrl =
    "https://firebasestorage.googleapis.com/v0/b/ar2go-bdf06.appspot.com/o/spomenici.json?alt=media&token=24fb034f-9a74-43e4-99f1-a09c28c433a2";


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={authorDisplayed ? styles.cardClicked : styles.card}
          onPress={() => {
            setYearsDisplay(false);
            setAuthorDisplay(true);
          }}
        >
          <Text
            style={
              authorDisplayed ? { color: colors.white } : { color: colors.main }
            }
          >
            Authors
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={yearsDisplayed ? styles.cardClicked : styles.card}
          onPress={() => {
            setYearsDisplay(true);
            setAuthorDisplay(false);
          }}
        >
          <Text
            style={
              yearsDisplayed ? { color: colors.white } : { color: colors.main }
            }
          >
            Years
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.infoCard}
        contentContainerStyle={{
          paddingTop: 15,
        }}
      >
        <Text>Map</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PremiumScreen;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 70,
    margin: 20,
    borderRadius: 10,
    elevation: 2,
  },
  cardClicked: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.main,
    paddingHorizontal: 20,
    paddingVertical: 70,
    margin: 20,
    borderRadius: 10,
    elevation: 2,
  },
  infoCard: {
    backgroundColor: colors.white,
    flex: 0.6,
    marginHorizontal: 30,
    marginVertical: 20,
    borderRadius: 10,
    elevation: 1,
  },
});
