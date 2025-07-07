import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.tuempresa.inversionesteo",
  appName: "InversionesTeo",
  webDir: "build",
  //bundledWebRuntime: false,
  server: {
    url: "https://inversionesteo.onrender.com",
    cleartext: true,
  },
};

export default config;
