import React, { useState } from "react";
import { View, Text, Pressable, Switch } from "react-native";
import { colors, type } from "../styles/tokens";

export default function StyleBoard({ onBack }) {
  const [on, setOn] = useState(true);
  return (
    <View>
      <Text style={[type.h1,{color:colors.secondary, marginBottom:8}]}>AptFix Style Board</Text>

      <View style={{flexDirection:"row",gap:8,marginBottom:12}}>
        {[colors.primary, colors.secondary, colors.accent].map((c) =>
          <View key={c} style={{width:48,height:48,borderRadius:10,backgroundColor:c,marginRight:8}} />
        )}
      </View>

      <Pressable style={{backgroundColor:colors.primary,padding:12,borderRadius:12,alignSelf:"flex-start"}}>
        <Text style={{color:"#fff"}}>Primary Button</Text>
      </Pressable>

      <Pressable style={{borderColor:colors.border,borderWidth:1,padding:8,borderRadius:999,marginTop:8,alignSelf:"flex-start"}}>
        <Text style={{color:colors.text}}>Chip</Text>
      </Pressable>

      <View style={{flexDirection:"row",alignItems:"center",gap:8,marginTop:8}}>
        <Switch value={on} onValueChange={setOn} thumbColor={"#fff"} trackColor={{true:colors.primary,false:"#d1d5db"}} />
        <Text style={type.body}>Flexible time</Text>
      </View>

      <Pressable onPress={onBack} style={{marginTop:24,padding:12,borderRadius:12,borderWidth:1,borderColor:colors.border}}>
        <Text>Back</Text>
      </Pressable>
    </View>
  );
}
