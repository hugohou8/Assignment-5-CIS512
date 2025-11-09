import React, { useState } from "react";
import { View, Text, Pressable, Image, FlatList } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { colors, type } from "../styles/tokens";

export default function Intake({ onBack, onNext }) {
  const [photos, setPhotos] = useState([]);
  const [timeWin, setTimeWin] = useState(null); // "AM" | "PM" | "EVENING"

  async function pick() {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7
    });
    if (!res.canceled) setPhotos((p) => [...p, res.assets[0].uri].slice(0,4));
  }

  const canSubmit = photos.length >= 2 && timeWin !== null;

  return (
    <View>
      <Text style={type.h1}>Evidence & Time</Text>

      <View style={{marginTop:12, flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
        <Text style={type.body}>Photos (min 2)</Text>
        <Text style={{color: photos.length>=2? "#16a34a" : "#dc2626"}}>{photos.length}/2</Text>
      </View>

      <FlatList
        horizontal
        data={[...photos, "add"]}
        keyExtractor={(it,i)=>i.toString()}
        renderItem={({item}) => item==="add" ? (
          <Pressable onPress={pick} style={{width:96,height:96,borderRadius:12,borderWidth:1,borderColor:colors.border, alignItems:"center",justifyContent:"center", marginRight:8}}>
            <Text style={{color:colors.subtext}}>＋</Text>
          </Pressable>
        ) : (
          <Image source={{uri:item}} style={{width:96,height:96,borderRadius:12, marginRight:8}}/>
        )}
        style={{marginTop:8}}
      />

      <Text style={[type.h2,{marginTop:16}]}>Time window</Text>
      <View style={{flexDirection:"row", gap:8, marginTop:8}}>
        {["AM","PM","EVENING"].map(k=>(
          <Pressable key={k} onPress={()=>setTimeWin(k)}
            style={{paddingVertical:10,paddingHorizontal:12,borderRadius:12,
              backgroundColor: timeWin===k? colors.secondary : "#fff",
              borderWidth:1,borderColor:colors.border, marginRight:8}}>
            <Text style={{color: timeWin===k? "#fff": colors.text}}>{k}</Text>
          </Pressable>
        ))}
      </View>

      {!canSubmit && (
        <Text style={[type.caption,{color:"#dc2626", marginTop:8}]}>
          Add at least 2 photos and choose a time window to continue.
        </Text>
      )}

      <View style={{flexDirection:"row", gap:8, marginTop:24}}>
        <Pressable onPress={onBack} style={{flex:1, padding:12, borderRadius:12, borderWidth:1, borderColor:colors.border, alignItems:"center"}}>
          <Text>Back</Text>
        </Pressable>
        <Pressable
          onPress={()=>onNext(timeWin)}
          disabled={!canSubmit}
          style={{flex:1, backgroundColor: canSubmit? colors.primary : "#d1d5db", padding:12, borderRadius:12, alignItems:"center"}}>
          <Text style={{color:"#fff"}}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
}
