import SvgQRCode from 'react-native-qrcode-svg';
import { Text } from 'react-native';
import { useContextPanelQRCode } from '../providers/QRCodeProvider';
import QRCode from 'react-qr-code';

export default function QRCodejeje() {
	const [state] = useContextPanelQRCode();
	return (
		<>
			<Text>ESCANEA CODIGO QR</Text>
			<QRCode value={state.text} size={state.size} color={state.color} />
		</>
	);
}
