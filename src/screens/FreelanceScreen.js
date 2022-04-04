import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { colors, statusBarHeight } from "../globalStyles";
import MapMenu from "../components/mapMenu";
import Map from "../components/Map";
import ArtInfo from "../components/ArtInfo";
// import { architectures, monuments, sculptures } from "../data";
import { useDispatch } from "react-redux";
import {
  setArchitectures,
  setMonumets,
  setSculptures,
} from "../redux/artSlice";
import {
  getArchitecturesFromStorage,
  getMonumentsFromStorage,
  getSculpturesFromStorage,
} from "../helpers/firebaseStorage";

const FreelanceScreen = () => {
  const [downloadNeed, setDownloadNeed] = useState(true);

  //const mapRef = useRef(null);
  const [showSculpture, setShowSculpture] = useState(true);
  const [showArchitecture, setShowArchitecture] = useState(false);
  const [showMonuments, setShoMonuments] = useState(false);
  const [showArtInfo, setShowArtInfo] = useState(false);
  const animFadeOut = useRef(new Animated.Value(1)).current;

  const [artName, setArtName] = useState("");
  const [artDescription, setArtDescription] = useState("");
  const [artImage, setArtImage] = useState("");
  const [artAuthor, setArtAuthor] = useState("");

  const fadeout = () => {
    Animated.timing(animFadeOut, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
      delay: 1500,
    }).start();
  };
  const showArtInfoFunction = () => {
    setShowArtInfo(!showArtInfo);
  };
  if (downloadNeed) {
    getSculpturesFromStorage();
    getArchitecturesFromStorage();
    getMonumentsFromStorage();
    setDownloadNeed(false);
  }
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Animated.View
        style={[
          styles.waitingForLocation,
          {
            opacity: animFadeOut,
            elevation: animFadeOut,
          },
        ]}
      >
        <Image
          style={[styles.alingCenter, {}]}
          source={require("../../img/pin.png")}
        />
        <Text style={[styles.alingCenter, styles.text]}>
          Waiting on your location...
        </Text>
        <Image
          style={[
            styles.alingCenter,
            { width: 101, height: 22, marginTop: 15 },
          ]}
          source={require("../../img/dots.gif")}
        />
      </Animated.View>
      <View style={{}}>
        <Map
          showSculpture={showSculpture}
          showArchitecture={showArchitecture}
          showMonuments={showMonuments}
          firstShowArtInfo={showArtInfoFunction}
          fadeout={fadeout}
          setArtName={setArtName}
          setArtDescription={setArtDescription}
          setArtAuthor={setArtAuthor}
          setArtImage={setArtImage}
        />
      </View>
      <MapMenu
        firstShowArchitecture={setShowArchitecture}
        firstShowSculpture={setShowSculpture}
        firstShowMonuments={setShoMonuments}
      />
      {showArtInfo && (
        <ArtInfo
          showArtInfo={setShowArtInfo}
          artName={artName}
          artAuthor={artAuthor}
          artDescription={artDescription}
          artImage={artImage}
        />
      )}
    </SafeAreaView>
  );
};

export default FreelanceScreen;

const styles = StyleSheet.create({
  waitingForLocation: {
    alignContent: "center",
    justifyContent: "center",
    position: "absolute",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "white",
  },
  alingCenter: {
    alignItems: "center",
    alignSelf: "center",
  },
  text: {
    color: colors.second,
    fontSize: 26,
    marginTop: 10,
  },
});
