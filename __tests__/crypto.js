import { Crypto} from '../utils/Crypto'; // Reemplaza 'tuArchivo' con la ruta correcta a tu archivo

test("se ejecuto", async ()=>{  
    const data = "Hola";
    const crypto = Crypto('AES');
    const encriptar = await crypto.encriptar(data);
    console.log(encriptar);
    console.log(data);
    const hola = await crypto.desencriptar(encriptar);
    expect(data).toBe(hola);
})