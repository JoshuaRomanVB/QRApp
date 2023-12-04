import { StyleSheet, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/AuthActions";
import { globalStyles } from "../styles/style";
import Palette from "../styles/Palette";
import AsyncStorage from "@react-native-async-storage/async-storage";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Ingresa un email válido")
    .matches(/uteq\.edu\.mx$/, "El correo debe pertenecer a la UTEQ")
    .required("El campo email es obligatorio"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Debe contener al menos un carácter especial"
    )
    .required("La contraseña es obligatoria"),
});

export default function FormLogin() {
  const navigation = useNavigation();

  const [loginStatus, setLoginStatus] = useState(null);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    // Al cargar el componente, limpia el estado de login
    setLoginStatus(null);
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: () => handleLogin(),
  });

  const navigateToRegister = () => {
    navigation.navigate("RegisterScreen");
  };

  const navigateToEscanear = () => {
    navigation.navigate("EscanearQR");
  };
  const handleLogin = async () => {
    try {
      const { user, userData } = await dispatch(loginUser(formik.values.email, formik.values.password));

      // Guarda la información del usuario en AsyncStorage
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      navigation.navigate("GenerarQR");
      // Actualiza el estado de login
      setLoginStatus({ type: "success", message: "Inicio de sesión exitoso" });
    } catch (error) {
      setLoginStatus({ type: "error", message: `Error: ${error.message}` });
    }
    // Oculta el mensaje después de 5 segundos
    setTimeout(() => {
      setLoginStatus(null);
    }, 5000);
  };

  return (
    <View
      style={{ marginTop: 40, marginHorizontal: 20, justifyContent: "center" }}
    >
      <TextInput
        label={"Escribe tu email"}
        value={formik.values.email}
        mode="flat"
        onChangeText={formik.handleChange("email")}
        style={globalStyles.input}
        theme={{
          colors: {
            primary: Palette.colors.primary,
          },
        }}
      />
      <Text style={{ color: Palette.colors.danger }}>
        {formik.touched.email && formik.errors.email}
      </Text>

      <TextInput
        label={"Escribe tu contraseña"}
        value={formik.values.password}
        mode="flat"
        onChangeText={formik.handleChange("password")}
        style={globalStyles.input}
        theme={{
          colors: {
            primary: Palette.colors.primary,
          },
        }}
      />
      <Text style={{ color: Palette.colors.danger }}>
        {formik.touched.password && formik.errors.password}
      </Text>

      <Button title="Enviar" onPress={formik.handleSubmit} />

      <Button
        mode="contained"
        buttonColor={Palette.colors.primary}
        style={globalStyles.button}
        onPress={handleLogin}
      >
        Iniciar sesión
      </Button>
      <Button
        mode="contained"
        buttonColor={Palette.colors.primary}
        style={globalStyles.button}
        onPress={navigateToRegister}
      >
        Ir a Registro
      </Button>
      <Button
        mode="contained"
        buttonColor={Palette.colors.primary}
        style={globalStyles.button}
        onPress={navigateToEscanear}
      >
        Ir a Escaner
      </Button>
      {loginStatus && (
        <Text style={{ color: loginStatus.type === "success" ? "green" : "red" }}>
          {loginStatus.message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
