import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useDispatch } from 'react-redux';
import { Crypto, TipoAlgoritmoCripto } from '../utils/Crypto';
import { registrarAsistencia } from '../actions/asistenciaActions';

export default function Escanear() {
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    console.log('Código QR escaneado:', data);

    try {
      const crypto = await Crypto(
        TipoAlgoritmoCripto.find((item) => item.tipo === 'AES').algoritmo
      );
      const decryptedData = await crypto.desencriptar(data);

      console.log('Datos desencriptados:', decryptedData);

      // Verificar que decryptedData tenga la propiedad uid
        // Despachar la acción para registrar la asistencia en Firebase utilizando Flux
        dispatch(registrarAsistencia(decryptedData));

        // Avisar al usuario que la asistencia ha sido registrada
        alert(`Asistencia registrada para ${decryptedData}`);
   
    } catch (error) {
      console.error('Error al desencriptar el código QR:', error.message);
      alert(`Error al desencriptar el código QR: ${error.message}`);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
