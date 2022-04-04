import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import React from "react";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { sculptures, architectures, monuments } from "../data";
import { getDistance } from "geolib";
import { colors } from "../globalStyles";
import { auth, db } from "../components/firebase";
import { useSelector } from "react-redux";
import {
  selectArchitectures,
  selectMonumets,
  selectSculptures,
} from "../redux/artSlice";

const Map = ({
  showSculpture,
  showArchitecture,
  showMonuments,
  firstShowArtInfo,
  fadeout,
  setArtName,
  setArtDescription,
  setArtImage,
  setArtAuthor,
}) => {
  let foregroundSubscription = null;
  //; useSelector(selectArchitectures); useSelector(selectMonumets);
  const architectures = useSelector(selectArchitectures);
  const monuments = useSelector(selectMonumets);
  const sculptures = useSelector(selectSculptures);
  let allArt = [];
  if (
    sculptures != null &&
    monuments != null &&
    architectures != null &&
    allArt[0] == null
  ) {
    allArt = sculptures.concat(architectures.concat(monuments));
  }
  // const [sculptures, setSculptures] = useState([]);
  const [latitudeTmp, setLatitude] = useState();
  const [longitudeTmp, setLongitude] = useState();
  const [showArtInfo, setShowwArtInfo] = useState(false);
  const [unlockedSculptures, setUnlockedSculptures] = useState("");

  const [newUnlockVisible, setNewUnlockVisible] = useState(false);

  // const db = getDatabase();
  useEffect(() => {
    allArt[0] != null &&
      (async () => {
        await Location.requestForegroundPermissionsAsync();
        // Check if foreground permission is granted
        const { granted } = await Location.getForegroundPermissionsAsync();
        if (!granted) {
          console.log("location tracking denied");
          return;
        }

        console.log("Unlocked Sculptures:" + unlockedSculptures);
        // Make sure that foreground location tracking is not running
        foregroundSubscription?.remove();

        // Start watching position in real-time
        foregroundSubscription = await Location.watchPositionAsync(
          {
            // For better logs, we set the accuracy to the most sensitive option
            accuracy: Location.Accuracy.BestForNavigation,
            distanceInterval: 10,
          },
          (location) => {
            var finalSculptures;
            const { latitude, longitude } = location.coords;
            setLatitude(latitude);
            setLongitude(longitude);
            fadeout();

            // console.log("longitude:", longitude);

            allArt[0] != null &&
              allArt.forEach((sculpture) => {
                // console.log("SKULPTURE:", sculpture.name);
                const distnce = getDistance(
                  { latitude: latitude, longitude: longitude },
                  {
                    latitude: sculpture.latitude,
                    longitude: sculpture.longitude,
                  }
                );

                if (distnce < 10) {
                  console.log("Distance: ", distnce, " Name: ", sculpture.name);

                  db.ref("/Users/" + auth.currentUser.uid)
                    .once("value")
                    .then((snapshot) => {
                      finalSculptures = snapshot.val().unlockedSculptures;
                      console.log("finalSculptures:" + finalSculptures);
                      if (!finalSculptures.includes(sculpture.imagePath)) {
                        setNewUnlockVisible(!newUnlockVisible);
                        finalSculptures =
                          snapshot.val().unlockedSculptures +
                          "," +
                          sculpture.imagePath;
                        setUnlockedSculptures(finalSculptures);
                        // console.log("Unlocked sculuptures:" + snapshot.val().unlockedSculptures);
                        db.ref(
                          "/Users/" +
                            auth.currentUser.uid +
                            "/unlockedSculptures"
                        )
                          .set(finalSculptures)
                          .then(() => {
                            db.ref("/Users/" + auth.currentUser.uid)
                              .once("value")
                              .then((snapshot) => {
                                db.ref(
                                  "/Users/" + auth.currentUser.uid + "/points"
                                ).set(snapshot.val().points + sculpture.points);
                              });
                          });
                      }
                    });
                }
              });
            // const sculptures = useSelector(selectSculptures);
            // setAllArt(sculptures);
            // setSculptures(sculptures);
            // setMarkersSculptures(sculpturesMarkers);
          }
        );
      })();
  }, [allArt]);
  useEffect(() => {
    db.ref("/Users/" + auth.currentUser.uid)
      .once("value")
      .then((snapshot) => {
        setUnlockedSculptures(snapshot.val().unlockedSculptures);
      });
  }, [unlockedSculptures]);
  useEffect(() => {
    stopForegroundUpdate();
  }, []);
  // Stop location tracking in foreground
  const stopForegroundUpdate = () => {
    foregroundSubscription?.remove();
  };

  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={
          latitudeTmp &&
          longitudeTmp && {
            latitude: latitudeTmp,
            longitude: longitudeTmp,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        }
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
        // region={{
        //   latitude: latitudeTmp,
        //   longitude: longitudeTmp,
        //   longitudeDelta: 0.1,
        //   latitudeDelta: 0.1,
        // }}
        showsUserLocation={true}
        onPress={() => {
          if (showArtInfo) {
            setShowwArtInfo(!showArtInfo);
            firstShowArtInfo();
          }
        }}
        g
      >
        {showSculpture &&
          sculptures != null &&
          sculptures[0] != null &&
          sculptures.map((sculpture) => (
            <Marker
              key={`${sculpture.imagePath}${Date.now()}`}
              coordinate={{
                latitude: sculpture.latitude,
                longitude: sculpture.longitude,
              }}
              pinColor={
                unlockedSculptures.includes(sculpture.imagePath)
                  ? // if (unlockedSculptures.includes(sculpture.name)) {
                    colors.sculptures
                  : colors.undefined
              }
              title={
                unlockedSculptures.includes(sculpture.imagePath)
                  ? sculpture.name
                  : "undefined"
              }
              onPress={() => {
                if (unlockedSculptures.includes(sculpture.imagePath)) {
                  setArtName(sculpture.name);
                  setArtAuthor(sculpture.author);
                  setArtImage(sculpture.imagePath);
                  setArtDescription(sculpture.description);
                  setShowwArtInfo(!showArtInfo);
                  firstShowArtInfo();
                } else if (showArtInfo) {
                  setShowwArtInfo(!showArtInfo);
                  firstShowArtInfo();
                }
              }}
            />
          ))}
        {/* ARHITEKTURE MARKERI */}
        {showArchitecture &&
          architectures[0] != null &&
          architectures.map((art) => (
            <Marker
              key={`${art.imagePath}${Date.now()}`}
              coordinate={{
                latitude: art.latitude,
                longitude: art.longitude,
              }}
              pinColor={
                unlockedSculptures.includes(art.imagePath)
                  ? // if (unlockedSculptures.includes(sculpture.name)) {
                    colors.architecture
                  : colors.undefined
              }
              title={
                unlockedSculptures.includes(art.imagePath)
                  ? art.name
                  : "undefined"
              }
              onPress={() => {
                if (unlockedSculptures.includes(art.imagePath)) {
                  setArtName(art.name);
                  setArtAuthor(art.author);
                  setArtDescription(art.description);
                  setArtImage(art.imagePath);
                  setShowwArtInfo(!showArtInfo);
                  firstShowArtInfo();
                } else if (showArtInfo) {
                  setShowwArtInfo(!showArtInfo);
                  firstShowArtInfo();
                }
              }}
            />
          ))}
        {/* MONUMENTS MARKERI */}
        {showMonuments &&
          monuments[0] != null &&
          monuments.map((art) => (
            <Marker
              key={`${art.imagePath}${Date.now()}`}
              coordinate={{
                latitude: art.latitude,
                longitude: art.longitude,
              }}
              pinColor={
                unlockedSculptures.includes(art.imagePath)
                  ? // if (unlockedSculptures.includes(sculpture.name)) {
                    colors.monuments
                  : colors.undefined
              }
              title={
                unlockedSculptures.includes(art.imagePath)
                  ? art.name
                  : "undefined"
              }
              onPress={() => {
                if (unlockedSculptures.includes(art.imagePath)) {
                  setArtName(art.name);
                  setArtAuthor(art.author);
                  setArtDescription(art.description);
                  setArtImage(art.imagePath);
                  setShowwArtInfo(!showArtInfo);
                  firstShowArtInfo();
                } else if (showArtInfo) {
                  setShowwArtInfo(!showArtInfo);
                  firstShowArtInfo();
                }
              }}
            />
          ))}
        {/* {sculptures[0] != null &&
        sculptures.map((sculpture) => (
          <MapView.Marker
            key={sculpture.id}
            coordinate={{
              latitude: sculpture.latitude,
              longitude: sculpture.longitude,
            }}
            title={sculpture.name}
          />
        ))} */}
      </MapView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={newUnlockVisible}
        // onRequestClose={() => {
        // }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Naišli ste na umjetnost!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setNewUnlockVisible(!newUnlockVisible)}
            >
              <Text style={styles.textStyle}>Otključaj</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 75,
    paddingVertical: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: colors.main,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
