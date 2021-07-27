import React from "react";
import { View } from "react-native";

import constants from "../utils/constants";

const GreyBorder = (props) => {
  return (
    <View
      style={[
        props.style,
        {
          backgroundColor:props.setDone ? constants.green : constants.mainGrey,
          height: 70,
          justifyContent: "flex-start",
          alignItems: "center",
          marginLeft: 10,
          marginRight:10,
          marginBottom:10,
          borderRadius: 10,
        },
      ]}
    >
      <View
        style={[
          { backgroundColor: props.accentColor },
          {
            height: "100%",
            width: 7,
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
          },
        ]}
      ></View>
      <View style={[{marginLeft: 8 }, (props.column == true ? {flexDirection:'column'}: {flexDirection:'row'})]}>
        {props.children}
      </View>
    </View>
  );
};

export default GreyBorder;
