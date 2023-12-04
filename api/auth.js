// api/auth.js

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';  // Asegúrate de importar la configuración de Firebase
import { firebaseConfig } from '../firebase-config';
import { initializeApp } from 'firebase/app';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// ...

export const registerUserAPI = async (userData) => {
  const { email, password, nombre, matricula, grupo, fechaNacimiento } = userData;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const db = getFirestore(app);
    const usersCollection = collection(db, "alumnos");

    const alumnoDoc = doc(usersCollection, user.uid);
    await setDoc(alumnoDoc, {
      nombre,
      matricula,
      grupo,
      fechaNacimiento,
      correo: email,
      uid: user.uid, // Agregar el UID del alumno
      password: password
    });

    return user;
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw error;
  }
};

export const loginUserAPI = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Obtener información adicional del usuario
    const db = getFirestore(app);
    const usersCollection = collection(db, "alumnos");
    const teachersCollection = collection(db, "maestros");

    const alumnoDoc = doc(usersCollection, user.uid);
    const teacherDoc = doc(teachersCollection, user.uid);

    let userData;

    if ((await getDoc(alumnoDoc)).exists()) {
      userData = (await getDoc(alumnoDoc)).data();
      userData.type = "alumno";
    } else if ((await getDoc(teacherDoc)).exists()) {
      userData = (await getDoc(teacherDoc)).data();
      userData.type = "maestro";
    }

    // Agrega el UID a la información del usuario
    userData.uid = user.uid;

    return { user, userData };
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

// ...

  
  export const registerTeacherAPI = async (teacherData) => {
    const { email, password, nombre, asignatura } = teacherData;
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      const db = getFirestore(app);
      const teachersCollection = collection(db, "maestros");
  
      const teacherDoc = doc(teachersCollection, user.uid);
      await setDoc(teacherDoc, {
        nombre,
        asignatura,
        correo: email,
      });
  
      return user;
    } catch (error) {
      console.error("Error al registrar el maestro:", error);
      throw error;
    }
  };
  

// ...
