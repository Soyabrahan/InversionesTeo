import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: "https://inversionesteo.onrender.com" }}
        style={{ flex: 1 }}
      />
      <StatusBar style="auto" />
    </View>
  );
}
