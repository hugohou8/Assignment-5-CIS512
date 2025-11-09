import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { colors, type } from "../styles/tokens";
import tenants from "../data/tenants.json";
import { swapSameBuilding } from "../utils/swap";

export default function Schedule({ timeWin, onBack, onNext }) {
  const [log, setLog] = useState("");
  const A = { unit:"B-3F", window: timeWin || "PM", flex:false };

  function trySwap(){
    const res = swapSameBuilding(A, tenants);
    setLog(res.swapped ? res.log : "No compatible swap found");
  }

  return (
    <View>
      <Text style={type.h1}>Scheduling</Text>
      <Text style={{marginTop:8}}>Chosen window: {A.window}</Text>
      <Text style={{marginTop:8, color:colors.subtext}}>Earliest available: 1:30–3:00 PM</Text>

      <Pressable onPress={trySwap} style={{marginTop:16,padding:12,borderRadius:12,backgroundColor:colors.secondary}}>
        <Text style={{color:"#fff", textAlign:"center"}}>Simulate flexible time-swap</Text>
      </Pressable>
      {log ? <Text style={{marginTop:12}}>{log}</Text> : null}

      <View style={{flexDirection:"row", gap:8, marginTop:24}}>
        <Pressable onPress={onBack} style={{flex:1, padding:12, borderRadius:12, borderWidth:1, borderColor:colors.border, alignItems:"center"}}>
          <Text>Back</Text>
        </Pressable>
        <Pressable onPress={onNext} style={{flex:1, backgroundColor:colors.primary, padding:12, borderRadius:12, alignItems:"center"}}>
          <Text style={{color:"#fff"}}>Confirm</Text>
        </Pressable>
      </View>
    </View>
  );
}
