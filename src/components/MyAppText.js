import React from "react";
import {
  Text
} from "react-native";

import constants from "../utils/constants";

const MyAppText = (props)=>{
  return (
      <Text style={[props.style,{fontSize: 32, color:constants.mainTextColor }]}>
        {props.children}
      </Text>
  );
}

export default MyAppText;