import { getFirestore, collection, doc, setDoc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { firebaseConfig } from '../firebase-config';
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const registrarAsistenciaEnFirebase = async (uid) => {
  try {
    // Consultar al alumno por el UID
    const alumnosRef = collection(db, 'alumnos');
    const alumnoQuery = query(alumnosRef, where('uid', '==', uid));
    const alumnoSnapshot = await getDocs(alumnoQuery);

    // Verificar si el alumno existe
    if (alumnoSnapshot.size > 0) {
      // Obtener la referencia al primer documento que cumple con la consulta
      const alumnoDocRef = alumnoSnapshot.docs[0].ref;

      // Obtener la información del alumno
      const alumnoDoc = await getDoc(alumnoDocRef);
      const alumnoInfo = alumnoDoc.data();

      // Ejemplo de cómo podrías estructurar tu colección en Firebase
      const asistenciaRef = collection(db, 'asistencia');

      // Agregar una entrada en la colección de asistencia
      await setDoc(doc(asistenciaRef), {
        nombre: alumnoInfo.nombre,
        matricula: alumnoInfo.matricula,
        fecha: new Date(),
      });

      return true; // Éxito al registrar la asistencia
    } else {
      throw new Error('No se encontró información del alumno');
    }
  } catch (error) {
    console.error('Error al registrar la asistencia en Firebase:', error);
    throw error; // Puedes manejar este error según tus necesidades
  }
};
