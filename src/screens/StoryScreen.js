import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "react-native-elements";

let intervalId;
let currentImageId = 0;
let currentImageId2 = 0;
const StoryScreen = () => {
  const [currentImage, setCurrentImage] = useState(currentImageId);
  const [currentImage2, setCurrentImage2] = useState(currentImageId2);
  const images = [
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzEwNC84MzAvb3JpZ2luYWwvc2h1dHRlcnN0b2NrXzExMTA1NzIxNTkuanBn",
    "https://d17fnq9dkz9hgj.cloudfront.net/uploads/2012/11/152964589-welcome-home-new-cat-632x475.jpg",
    "https://i.ytimg.com/vi/jpsGLsaZKS0/maxresdefault.jpg",
  ];

  const switchImage = () => {};
  // const switchImage2 = () => {
  //   if (currentImage2 < images.length - 1) {
  //     setCurrentImage2(currentImage2 + 1);
  //   } else {
  //     setCurrentImage2(0);
  //   }
  // };
  const startImageRotation = () => {
    console.log("startIMAGE");
    intervalId = setInterval(() => {
      console.log("currentImageId:", currentImageId);
      if (currentImageId < images.length - 1) {
        console.log("images.length:", images.length);
        currentImageId++;
        setCurrentImage(currentImageId);
      } else {
        currentImageId = 0;
        setCurrentImage(0);
      }
    }, 1000);
  };
  const stopImageRotation = () => {
    console.log("STOPIMAGE");
    clearInterval(intervalId);
    intervalId = null;
  };

  const startImageRotation2 = () => {
    console.log("startIMAGE");
    intervalId = setInterval(() => {
      console.log("currentImageId:", currentImageId2);
      if (currentImageId2 < images.length - 1) {
        console.log("images.length:", images.length);
        currentImageId2++;
        setCurrentImage2(currentImageId2);
      } else {
        currentImageId2 = 0;
        setCurrentImage2(0);
      }
    }, 1000);
  };
  const stopImageRotation2 = () => {
    console.log("STOPIMAGE");
    clearInterval(intervalId);
    intervalId = null;
  };
  return (
    <SafeAreaView style={styles.card}>
      <TouchableOpacity
        style={styles.results}
        onPressIn={startImageRotation}
        onPressOut={stopImageRotation}
      >
        <ImageBackground
          imageStyle={{ opacity: 0.5 }}
          resizeMode="cover"
          style={[
            {
              width: 300,
              height: 300,
              borderColor: colors.black,
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
            },
          ]}
          source={{
            uri: images[currentImage],
          }}
        >
          <Text>Authors</Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.calculations}
        onPressIn={startImageRotation2}
        onPressOut={stopImageRotation2}
      >
        <ImageBackground
          imageStyle={{ opacity: 0.5 }}
          resizeMode="cover"
          style={[
            {
              width: 300,
              height: 300,
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
            },
          ]}
          source={{
            uri: images[currentImage2],
          }}
        >
          <Text>Years</Text>
        </ImageBackground>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default StoryScreen;

const styles = StyleSheet.create({
  card: { flex: 1 },
  results: {
    flex: 0.5,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  calculations: {
    flex: 0.5,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
});
