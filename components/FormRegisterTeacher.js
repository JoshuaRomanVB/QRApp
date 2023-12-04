// FormRegisterTeacher.js
import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { registerTeacher } from "../actions/authTrunks";

export default function FormRegisterTeacher() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [asignatura, setAsignatura] = useState("");
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const successMessage = useSelector((state) => state.auth.successMessage);

  const handleRegister = () => {
    dispatch(registerTeacher({ email, password, nombre, asignatura }));
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
        placeholder="Asignatura"
        onChangeText={(text) => setAsignatura(text)}
        value={asignatura}
      />
      <Button title="Registrar Maestro" onPress={handleRegister} />

      {/* Mostrar mensajes de éxito o error */}
      {successMessage !== "" && <Text style={{ color: "green" }}>{successMessage}</Text>}
      {errorMessage !== "" && <Text style={{ color: "red" }}>{errorMessage}</Text>}
    </View>
  );
}
