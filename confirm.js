import React from "react";
import { View, Text, Pressable, Alert } from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as Notifications from "expo-notifications";
import { colors, type } from "../styles/tokens";

Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound:false, shouldSetBadge:false })
});

export default function Confirm({ onBack, onScan }) {
  async function schedule(){
    const inSeconds = 30; // 演示用 30 秒；实际 30 分钟 = 1800
    const {status} = await Notifications.requestPermissionsAsync();
    if (status !== "granted") return Alert.alert("Permission denied");
    await Notifications.scheduleNotificationAsync({
      content: { title:"AptFix reminder", body:"Tech arriving in ~30 min." },
      trigger: { seconds: inSeconds }
    });
    Alert.alert("Reminder scheduled", "Will fire in ~30s for demo.");
  }

  return (
    <View>
      <Text style={type.h1}>Order Confirmed</Text>
      <View style={{marginTop:12, padding:12, borderWidth:1, borderColor:colors.border, borderRadius:12}}>
        <Text>Job ID: AT-2048</Text>
        <Text>Unit: B·3F</Text>
        <Text>ETA: Today 1:30–3:00 PM</Text>
      </View>

      <View style={{marginTop:16, alignItems:"center"}}>
        <QRCode value={JSON.stringify({ jobId:"AT-2048" })} size={160}/>
        <Text style={[type.caption,{marginTop:8}]}>Show this QR to the technician</Text>
      </View>

      <Pressable onPress={schedule} style={{marginTop:16, backgroundColor:colors.primary, padding:14, borderRadius:12, alignItems:"center"}}>
        <Text style={{color:"#fff"}}>Enable 30-min reminder</Text>
      </Pressable>

      <View style={{flexDirection:"row", gap:8, marginTop:16}}>
        <Pressable onPress={onBack} style={{flex:1, padding:12, borderRadius:12, borderWidth:1, borderColor:colors.border, alignItems:"center"}}>
          <Text>Back</Text>
        </Pressable>
        <Pressable onPress={onScan} style={{flex:1, padding:12, borderRadius:12, borderWidth:1, borderColor:colors.border, alignItems:"center"}}>
          <Text>Open Scanner</Text>
        </Pressable>
      </View>
    </View>
  );
}
