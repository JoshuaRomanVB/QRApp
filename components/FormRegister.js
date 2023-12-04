// FormRegister.js
import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/authTrunks";
import { useNavigation } from "@react-navigation/native"; // Importa el hook de navegación

export default function FormRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [matricula, setMatricula] = useState("");
  const [grupo, setGrupo] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const successMessage = useSelector((state) => state.auth.successMessage);
  const navigation = useNavigation();

  const navigateToTeacherRegistration = () => {
    navigation.navigate("TeacherRegistration");
  };

  const handleRegister = async () => {
    try {
      await dispatch(registerUser({ email, password, nombre, matricula, grupo, fechaNacimiento }));
      setRegistrationStatus({ type: "success", message: "Registro exitoso" });
      // Limpia los campos después de un registro exitoso
      setEmail("");
      setPassword("");
      setNombre("");
      setMatricula("");
      setGrupo("");
      setFechaNacimiento("");
    } catch (error) {
      setRegistrationStatus({ type: "error", message: `Error: ${error.message}` });
    }
    // Oculta el mensaje después de 5 segundos
    setTimeout(() => {
      setRegistrationStatus(null);
    }, 5000);
  };

  return (
    <View>
      <TextInput
        placeholder="Correo electrónico"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TextInput
        placeholder="Nombre"
        onChangeText={(text) => setNombre(text)}
        value={nombre}
      />
      <TextInput
        placeholder="Matrícula"
        onChangeText={(text) => setMatricula(text)}
        value={matricula}
      />
      <TextInput
        placeholder="Grupo"
        onChangeText={(text) => setGrupo(text)}
        value={grupo}
      />
      <TextInput
        placeholder="Fecha de nacimiento"
        onChangeText={(text) => setFechaNacimiento(text)}
        value={fechaNacimiento}
      />
      <Button title="Registrar" onPress={handleRegister} />
      <Button
        title="Registrar Maestro"
        onPress={navigateToTeacherRegistration}
      />
      {/* Mostrar mensajes de éxito o error */}
      {registrationStatus && (
        <Text style={{ color: registrationStatus.type === "success" ? "green" : "red" }}>
          {registrationStatus.message}
        </Text>
      )}
    </View>
  );
}
