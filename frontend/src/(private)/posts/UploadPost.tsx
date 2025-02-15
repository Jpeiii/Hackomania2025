import React from "react";
import { Block, Text } from "../../components";
import { Platform } from "react-native";
import WebPost from "./isWebPost";
import AppPost from "./isAppPost";
export default function UploadPost() {
  const isWeb = Platform.OS === "web";
  return <Block>{isWeb ? <WebPost /> : <AppPost />}</Block>;
}
