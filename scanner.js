import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Platform } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function Scanner({ onBack }) {
  // Web 预览直接给提示，避免红屏
  if (Platform.OS === "web") {
    return (
      <View style={{ flex:1, alignItems:"center", justifyContent:"center", padding:16 }}>
        <Text style={{ textAlign:"center", marginBottom:12 }}>
          Camera scanning isn’t available in web preview.
          Open this Snack in Expo Go (My Device) on your phone.
        </Text>
        <Pressable onPress={onBack} style={{ padding:10, backgroundColor:"#0E7C66", borderRadius:8 }}>
          <Text style={{ color:"#fff" }}>Back</Text>
        </Pressable>
      </View>
    );
  }

  const [permission, requestPermission] = useCameraPermissions();
  const [locked, setLocked] = useState(false);
  const [ok, setOk] = useState(null);

  useEffect(() => {
    if (!permission) requestPermission();
  }, [permission]);

  if (!permission) return <Text>Requesting camera permission…</Text>;

  if (!permission.granted) {
    return (
      <View style={{ flex:1, alignItems:"center", justifyContent:"center" }}>
        <Text style={{ marginBottom:12 }}>No camera access.</Text>
        <Pressable onPress={requestPermission} style={{ padding:10, backgroundColor:"#0E7C66", borderRadius:8 }}>
          <Text style={{ color:"#fff" }}>Grant permission</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        // 你关心的码制式在这里配置
        barcodeScannerSettings={{ barcodeTypes: ["qr", "ean13", "code128"] }}
        onBarcodeScanned={({ data /*, type */ }) => {
          if (locked) return;
          setLocked(true);
          try {
            const obj = JSON.parse(data);
            setOk(obj.jobId === "AT-2048");
          } catch {
            setOk(false);
          }
          setTimeout(() => setLocked(false), 1200);
        }}
      />
      <View style={{ position:"absolute", bottom:40, left:16, right:16, alignItems:"center" }}>
        <Text style={{ color:"#fff", backgroundColor:"rgba(0,0,0,0.6)", padding:8, borderRadius:8 }}>
          {ok === null ? "Scan the QR from Confirm screen" : ok ? "Job verified: AT-2048" : "Invalid QR"}
        </Text>
      </View>
    </View>
  );
}
