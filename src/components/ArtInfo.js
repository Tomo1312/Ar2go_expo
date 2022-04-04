import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { storage } from "./firebase";
import { colors } from "../globalStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ArtInfo = ({
  showArtInfo,
  artAuthor,
  artName,
  artImage,
  artDescription,
}) => {
  // const edges = useSafeAreaInsets();
  const [imageUrl, setImageUrl] = useState(undefined);
  const [showAllInfo, setShowAllInfo] = useState(false);
  const [showAllInfo2, setShowAllInfo2] = useState(false);

  // const startAnimation = useRef(new Animated.ValueXY({x:0, y:0})).current;
  const startAnimationY = useRef(new Animated.Value(0)).current;
  const startAnimationX = useRef(new Animated.Value(0)).current;

  const startAnimationImageFull = useRef(new Animated.Value(200)).current;
  const animImage = useRef(new Animated.Value(0)).current;

  // Animated.timing(startAnimation, {
  //   // For same Height for non safe Area Devices...
  //   toValue: {
  //     x: Dimensions.get("window").width / 2,
  //     y: -Dimensions.get("window").height + (edges.top + 65) + 500,
  //   },
  //   useNativeDriver: true,
  // });
  const openModal = () => {
    Animated.timing(animImage, {
      duration: 1000,
      toValue: 1,
      useNativeDriver: false,
    }).start();
    Animated.timing(startAnimationImageFull, {
      duration: 500,
      toValue: Dimensions.get("window").height,
      useNativeDriver: false,
    }).start();
    // Animated.parallel([
    //   Animated.timing(startAnimationY, {
    //     // For same Height for non safe Area Devices...
    //     toValue: -Dimensions.get("window").height + (edges.top + 65) + 500,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(startAnimationX, {
    //     // For same Height for non safe Area Devices...
    //     toValue: Dimensions.get("window").width / 4,
    //     useNativeDriver: true,
    //   }),

    //   Animated.timing(startAnimationImageFull, {
    //     // For same Height for non safe Area Devices...
    //     toValue: Dimensions.get("window").width,
    //     useNativeDriver: false,
    //   }),
    // ]).start();

    setShowAllInfo2(!showAllInfo);
    setShowAllInfo(!showAllInfo);
    setTimeout(() => {}, 300);
  };
  storage
    .ref("/img/")
    .child(artImage + ".jpg")
    .getDownloadURL()
    .then((url) => {
      setImageUrl(url);
    })
    .catch((error) => console.log(error));

  return (
    // <View style={styles.containerFull}>
    <Animated.View
      style={[
        styles.container,
        showAllInfo2
          ? { height: startAnimationImageFull, flex: 1 }
          : { paddingBottom: 80 },
      ]}
    >
      <Animated.View
        style={
          !showAllInfo
            ? [
                styles.imagecontainer,

                {
                  //   transform: [
                  //     // {
                  //     //   rotateY: animImage.interpolate({
                  //     //     inputRange: [0, 0.5, 1],
                  //     //     outputRange: ["0deg", "-90deg", "0deg"],
                  //     //   }),
                  //     // },
                  //     {
                  //       scale: animImage.interpolate({
                  //         inputRange: [0, 1],
                  //         outputRange: [1, 6],
                  //       }),
                  //     },
                  //     {
                  //       translateX: animImage.interpolate({
                  //         inputRange: [0, 1],
                  //         outputRange: [
                  //           0,
                  //           Dimensions.get("window").width / 5 - 10,
                  //         ],
                  //       }),
                  //     },
                  //     {
                  //       translateY: animImage.interpolate({
                  //         inputRange: [0, 1],
                  //         outputRange: [
                  //           0,
                  //           -Dimensions.get("window").height +
                  //             (edges.top + 65) +
                  //             500,
                  //         ],
                  //       }),
                  //     },
                  //   ],
                },
              ]
            : {
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").width,
                flex: 1,
              }
        }
      >
        <Image
          style={[
            !showAllInfo
              ? styles.imageRounded
              : {
                  width: Dimensions.get("window").width,
                  height: Dimensions.get("window").width,
                  // flex: 1,
                  // alignContent: "flex-start",
                  // alignItems: "flex-start",
                },
          ]}
          source={imageUrl ? { uri: imageUrl }:require("../../img/white.png")}
        />
        <TouchableOpacity
          style={showAllInfo2 ? styles.iconBack : { display: "none" }}
          onPress={() => {
            showArtInfo();
          }}
        >
          <Ionicons name="arrow-back" size={24} color={colors.second} />
        </TouchableOpacity>
      </Animated.View>
      {/* Drugi dio ispod slike! */}
      <Animated.View
        style={
          !showAllInfo
            ? styles.borderBottom
            : {
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                backgroundColor: colors.white,
                flex: 1,
                marginTop: 0,
              }
        }
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <View style={showAllInfo ? { display: "none" } : { flex: 1 }}>
            <Text style={styles.textStyle}>{artName}</Text>
          </View>
          <View style={showAllInfo ? { display: "none" } : { flex: 1 }}>
            <Text style={styles.sculptureStyle}>{artAuthor}</Text>
          </View>
        </View>
        <View
          style={
            showAllInfo
              ? { display: "none" }
              : {
                  flexDirection: "row",
                  alignContent: "center",
                  alignSelf: "center",
                  marginTop: 50,
                }
          }
        >
          <TouchableOpacity style={styles.containerButton} onPress={openModal}>
            <FontAwesome5 name="book-open" style={styles.fontAwesomeStyle} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.containerButton}
            onPress={() => {
              showArtInfo();
            }}
          >
            <FontAwesome name="close" style={styles.fontAwesomeStyle} />
          </TouchableOpacity>
        </View>
        <View style={showAllInfo ? styles.textContainer : { display: "none" }}>
          <Text style={styles.textHeading}>{artName}</Text>
          <ScrollView style={{ flexGrow: 0.75, marginTop: 20 }}>
            <Text style={styles.textDescrition}>{artDescription}</Text>
          </ScrollView>
        </View>
      </Animated.View>
      {/* </View> */}
      {/* <Image
        style={styles.imageFull}
        source={imageUrl ? { uri: imageUrl } : require("../../img/ban.jpg")}
      />
      onPress={showArtInfo(false)} 
      <TouchableOpacity style={styles.iconBack}  >
      <Ionicons name="arrow-back" size={24} color={colors.second} />
      </TouchableOpacity> */}
    </Animated.View>
  );
};

export default ArtInfo;

const styles = StyleSheet.create({
  imageRounded: {
    width: 100,
    height: 100,
    padding: 10,
    borderColor: "#FFFFFF",
    borderRadius: 50,
    borderWidth: 1,
  },
  imagecontainer: {
    width: 100,
    height: 100,
    shadowColor: "#7F5Df0",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    backgroundColor:colors.black,

    color:colors.white,
    shadowOpacity: 0.27,
    shadowRadius: 4,
    borderRadius: 50,
    marginLeft: 30,
    marginTop: -50,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3E4958",
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
  },

  container: {
    // paddingBottom: 80,
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderBottomRightRadius: 0,
    backgroundColor: colors.white,
    borderBottomLeftRadius: 0,
    // shadowColor: "#D1D1D1",
    //   shadowOffset: {
    //     width: -2,
    //     height: 4,
    //   },
    // shadowOpacity: 0.2,
    //   shadowRadius: 1.41,
    //   elevation: 20,
    // shadowRadius: 1.41,
    elevation: 1,
  },
  sculptureStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3E4958",
    borderRadius: 10,
    marginHorizontal: 20,
    backgroundColor: "#ECECEC",
    padding: 2,
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
  },
  containerButton: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 60,
    alignContent: "center",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  fontAwesomeStyle: {
    fontSize: 24,
    color: "#3E4958",
    alignItems: "center",
    alignContent: "center",
  },
  // Full screen

  borderBottom: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: 15,
  },
  textHeading: {
    fontSize: 24,
    color: colors.second,
  },
  textDescrition: {
    color: colors.second,
  },
  textContainer: {
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    padding: 10,
    borderColor: colors.main,
    borderWidth: 1,
    margin: 20,
    borderRadius: 10,
    shadowColor: "#7F5Df0",
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.27,
    shadowRadius: 4,
    elevation: 2,
    flex: 1,
    marginBottom: 40,
  },
  containerFull: {
    elevation: 1,
    position: "absolute",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    width: "100%",
    backgroundColor: "white",
  },
  imageFull: {
    maxWidth: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
  },
  iconBack: {
    position: "absolute",
    top: 40,
    left: 20,
    elevation: 2,
    backgroundColor: colors.white,
    borderRadius: 25,
    width: 30,
    height: 30,
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
});
