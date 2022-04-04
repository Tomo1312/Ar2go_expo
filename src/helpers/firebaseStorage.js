import React, { useLayoutEffect, useState } from "react";

import { storage } from "../components/firebase";
import * as FileSystem from "expo-file-system";
import {
  setArchitectures,
  setMonumets,
  setSculptures,
} from "../redux/artSlice";
import { useDispatch } from "react-redux";

export const getSculpturesFromStorage = () => {
  const dispatch = useDispatch();
  storage
    .ref("/sculptures.json")
    .getDownloadURL()
    .then((url) => {
      console.log("vari:", url);
      FileSystem.downloadAsync(
        url,
        FileSystem.documentDirectory + "sculptures.json"
      )
        .then(({ uri }) => {
          console.log("Finished downloading to ", uri);
          FileSystem.readAsStringAsync(uri).then((data) => {
            // const strArray = JSON.stringify(data);
            dispatch(setSculptures(JSON.parse(data)));
            // JSON.parse(data).map((item, i) => {
            //   console.log("item.name:", item.name);
            // });
            // console.log("data:", data);
          });
        })
        .catch((error) => {
          console.error(error);
        });
      // downloadUrl = url;
    })
    .catch((error) => console.log(error));
};
export const getArchitecturesFromStorage = () => {
  const dispatch = useDispatch();
  storage
    .ref("/architectures.json")
    .getDownloadURL()
    .then((url) => {
      console.log("vari:", url);
      FileSystem.downloadAsync(
        url,
        FileSystem.documentDirectory + "architectures.json"
      )
        .then(({ uri }) => {
          console.log("Finished downloading to ", uri);
          FileSystem.readAsStringAsync(uri).then((data) => {
            // const strArray = JSON.stringify(data);
            dispatch(setArchitectures(JSON.parse(data)));
            // JSON.parse(data).map((item, i) => {
            //   console.log("item.name:", item.name);
            // });
            // console.log("data:", data);
          });
        })
        .catch((error) => {
          console.error(error);
        });
      // downloadUrl = url;
    })
    .catch((error) => console.log(error));
};
export const getMonumentsFromStorage = () => {
  const dispatch = useDispatch();
  storage
    .ref("/monuments.json")
    .getDownloadURL()
    .then((url) => {
      console.log("vari:", url);
      FileSystem.downloadAsync(
        url,
        FileSystem.documentDirectory + "monuments.json"
      )
        .then(({ uri }) => {
          console.log("Finished downloading to ", uri);
          FileSystem.readAsStringAsync(uri).then((data) => {
            // const strArray = JSON.stringify(data);
            // console.log(" data.json():",  data.json());
            dispatch(setMonumets(JSON.parse(data)));
            // JSON.parse(data).map((item, i) => {
            //   console.log("item.name:", item.name);
            // });
            // console.log("data:", data);
          });
        })
        .catch((error) => {
          console.error(error);
        });
      // downloadUrl = url;
    })
    .catch((error) => console.log(error));
};
