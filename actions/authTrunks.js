// thunks/authThunks.js
import { registerUserAPI, registerTeacherAPI } from '../api/auth';

// thunks/authThunks.js
export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
      const user = await registerUserAPI(userData);
      dispatch({ type: "REGISTER_SUCCESS", payload: user });
      // Devuelve un mensaje de éxito
      return "Registro exitoso";
    } catch (error) {
      console.error("Error al registrar el usuario:", error.message);
      dispatch({ type: "REGISTER_FAILURE", payload: error.message });
      throw error;
    }
  };
};
  
  export const registerTeacher = (teacherData) => {
    return async (dispatch) => {
      try {
        const user = await registerTeacherAPI(teacherData);
        dispatch({ type: "REGISTER_TEACHER_SUCCESS", payload: user });
      } catch (error) {
        console.error("Error al registrar el maestro:", error.message);
        dispatch({ type: "REGISTER_TEACHER_FAILURE", payload: error.message });
      }
    };
  };


  
export const loginUserAPI = async (email, password) => {
  try {
    // Perform login API call and retrieve user data
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Retrieve additional user data as needed
    const userData = await fetchUserData(user.uid);

    return { user, userData };
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
  