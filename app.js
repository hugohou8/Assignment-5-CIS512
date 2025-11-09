import React, { useState } from "react";
import { View, Text, Pressable, SafeAreaView, ScrollView } from "react-native";
import StyleBoard from "./screens/StyleBoard";
import Intake from "./screens/intake";
import Schedule from "./screens/Schedule";
import Confirm from "./screens/confirm";
import Scanner from "./screens/scanner";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [shared, setShared] = useState({ timeWin: null });

  const Btn = ({ label, to }) => (
    <Pressable onPress={() => setScreen(to)} style={{padding:12,borderRadius:12,backgroundColor:"#0E7C66",marginVertical:6}}>
      <Text style={{color:"#fff",textAlign:"center"}}>{label}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={{ flex:1, backgroundColor:"#F9FAFB" }}>
      <ScrollView contentContainerStyle={{ flexGrow:1, padding:16 }}>
        {screen === "home" && (
          <View style={{ flex:1, justifyContent:"center" }}>
            <Text style={{ fontSize:28, textAlign:"center", marginBottom:12 }}>AptFix Hello</Text>
            <Btn label="Open Style Board" to="style" />
            <Btn label="Open Intake (2-photo gate)" to="intake" />
            <Btn label="Open Schedule (swap demo)" to="schedule" />
            <Btn label="Open Confirm (QR + reminder)" to="confirm" />
            <Btn label="Open Scanner" to="scanner" />
          </View>
        )}

        {screen === "style" && (
          <StyleBoard onBack={() => setScreen("home")} />
        )}

        {screen === "intake" && (
          <Intake
            onBack={() => setScreen("home")}
            onNext={(tw) => { setShared({ timeWin: tw }); setScreen("schedule"); }}
          />
        )}

        {screen === "schedule" && (
          <Schedule
            timeWin={shared.timeWin}
            onBack={() => setScreen("home")}
            onNext={() => setScreen("confirm")}
          />
        )}

        {screen === "confirm" && (
          <Confirm
            onBack={() => setScreen("home")}
            onScan={() => setScreen("scanner")}
          />
        )}

        {screen === "scanner" && (
          <Scanner onBack={() => setScreen("home")} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
