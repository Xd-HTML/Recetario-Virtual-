// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// 🔧 Configura tu Firebase aquí
const firebaseConfig = {
  apiKey: "AIzaSyB2cU8nXlkxEBLKSX5cBvLKybGE8HHpw1c",
  authDomain: "recetario-virtual.firebaseapp.com",
  databaseURL: "https://recetario-virtual-default-rtdb.firebaseio.com",
  projectId: "recetario-virtual",
  storageBucket: "recetario-virtual.firebasestorage.app",
  messagingSenderId: "1062247715844",
  appId: "1:1062247715844:web:180a220283b74c481f5151"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, signOut, onAuthStateChanged };
