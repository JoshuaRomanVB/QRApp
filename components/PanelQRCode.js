import { StyleSheet, TextInput, View, Text } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { useContextPanelQRCode } from '../providers/QRCodeProvider'
import Slider from '@react-native-community/slider';
import { ColorPicker, TriangleColorPicker } from 'react-native-color-picker';
import { Crypto, TipoAlgoritmoCripto } from '../utils/Crypto';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ... (importaciones anteriores)
export default function PanelQRCode() {
    const [state, dispatch] = useContextPanelQRCode();
    const [selected, setSelected] = useState('#db643a')
    const [text, setText] = useState("")
    const [typeCrypto, setTypeCrypto] = useState("AES");
    const [alumnoUID, setAlumnoUID] = useState(""); // Cambié el nombre del estado a `alumnoUID`
    const colorPickerRef = useRef()

    useEffect(() => {
        const updateQRCode = async () => {
            try {
                // Consulta el AsyncStorage para obtener los datos del alumno
                const alumnoData = await AsyncStorage.getItem('userData');
                
                // Verifica si hay datos y actualiza el estado
                if (alumnoData) {
                
                    const parsedData = JSON.parse(alumnoData);
               
                    // Encripta los datos utilizando AES
                    const crypto = await Crypto(TipoAlgoritmoCripto.find(item => item.tipo === "AES").algoritmo);
                    const textoEncriptado = await crypto.encriptar(parsedData.uid);
                    
                    // Actualiza el estado con el texto encriptado y el UID del alumno
                    setText(textoEncriptado);
                    setAlumnoUID(parsedData.uid); // Cambié aquí
                    // Actualiza el estado del QRCode
                    dispatch({ type: 'UPDATE_TEXT', text: textoEncriptado });
                }
            } catch (error) {
                console.error('Error al obtener datos del AsyncStorage:', error);
            }
        };

        // Ejecuta la función inicialmente
        updateQRCode();

        // Configura el intervalo para ejecutar la actualización cada 5 segundos
        const intervalId = setInterval(updateQRCode, 5000);

        // Limpia el intervalo al desmontar el componente
        return () => clearInterval(intervalId);
    }, []);
      
    const onDataChange = (value) => {
        setText(value);
        dispatch({ type: 'UPDATE_TEXT', text: value })
    }

    const onColorChange = (color) => {
        setSelected(color)
        dispatch({ type: 'UPDATE_COLOR', color: color })
    }

    const onValueChange = (value) => {
        dispatch({ type: 'UPDATE_SIZE', size: value })
    }

    const onEncryptText = async (itemTipoAlgoritmoCrypto) => {
        setTypeCrypto(itemTipoAlgoritmoCrypto.tipo)
        const crypto = await Crypto(itemTipoAlgoritmoCrypto.algoritmo)
        const textoEncriptado = await crypto.encriptar(text)
        dispatch({ type: "UPDATE_TEXT", text: textoEncriptado })
    }

    return (
        <View style={{ height: 300, justifyContent: 'center', alignItems: 'center' }}>
            <ColorPicker
                onColorSelected={onColorChange}
                style={{ flex: 1, width: 100 }}
                sliderComponent={Slider}
                hideSliders
                ref={colorPickerRef}
            />
            <TextInput value={text} onChangeText={onDataChange} />
          
            <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={100}
                maximumValue={400}
                minimumTrackTintColor='black'
                maximumTrackTintColor='grey'
                onValueChange={onValueChange}
            />

            {/* Nuevo componente Text para mostrar el UID del alumno */}
            <Text style={{ marginTop: 10 }}>{alumnoUID}</Text>
        </View>
    )
}

// Resto del código sin cambios


