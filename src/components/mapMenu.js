import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import React, { useState } from "react";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { colors, statusBarHeight } from "../globalStyles";
import { Icon } from "react-native-elements";

const MapMenu = ({firstShowSculpture, firstShowArchitecture, firstShowMonuments}) => {
  const [showSculpture, setShowSculpture] = useState(true);
  const [showArchitecture, setShowArchitecture] = useState(false);
  const [showMonuments, setShoMonuments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  return (
    <View
      style={{
        position: "absolute",
        alignSelf: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          setShowMenu(!showMenu);
        }}
      >
        <View
          style={
            !showMenu
              ? {
                  width: 100,
                  height: 50,
                  alignItems: "center",
                  alignContent: "center",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 100,
                  borderTopStartRadius: 0,
                  borderTopEndRadius: 0,
                }
              : {
                  width: 200,
                  height: 100,
                  alignItems: "center",
                  alignContent: "center",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 100,
                  borderTopStartRadius: 0,
                  borderTopEndRadius: 0,
                }
          }
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: 30,
            }}
          >
            <TouchableOpacity
              style={showMenu ? styles.showOptions : styles.hideOptions}
              onPress={() => {
                setShowSculpture(!showSculpture);
                firstShowSculpture(!showSculpture);
              }}
            >
              <FontAwesome
                name="bank"
                size={24}
                color={showSculpture ? colors.sculptures : "#000000"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={showMenu ? styles.alignCenter : styles.hideOptions}
              onPress={() => {
                setShowArchitecture(!showArchitecture);
                firstShowArchitecture(!showArchitecture);
              }}
            >
              <Icon
                type="ionicon"
                name="people"
                size={24}
                color={showArchitecture ? colors.architecture : "#000000"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={showMenu ? styles.alginRight : styles.hideOptions}
              onPress={() => {
                setShoMonuments(!showMonuments);
                firstShowMonuments(!showMonuments);
              }}
            >
              <FontAwesome
                name="picture-o"
                size={24}
                color={showMonuments ? colors.monuments : "#000000"}
              />
            </TouchableOpacity>
          </View>
          <Image
            style={{
              width: 25,
              height: 25,
              marginTop: 5,
              position: "absolute",
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
            source={require("../../img/art1.png")}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MapMenu;

const styles = StyleSheet.create({
  showOptions: {
    alignItems: "center",
    alignContent: "flex-start",
    flex: 1,
    width: 30,
    height: 25,
  },
  hideOptions: {
    display: "none",
  },
  alignCenter: {
    alignItems: "center",
    flex: 1,
    marginTop: 30,
    alignContent: "center",
    justifyContent: "space-between",
    width: 30,
    height: 25,
  },
  alginRight: {
    alignItems: "center",
    alignContent: "flex-end",
    flex: 1,
    width: 30,
    height: 25,
  },
});
