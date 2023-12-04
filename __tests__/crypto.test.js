import { Crypto } from "../utils/Crypto"

test('Encriptación', async () => {
    const crypto = Crypto("AES")
    const textoEncriptado = crypto.encriptar("Arriba la uteq")
    expect(crypto.desencriptar(textoEncriptado)).toBe("Arriba la uteq")
})

test('Encriptación con RSA', async () => {
    const crypto = Crypto("RSA")
    const textoEncriptado = crypto.encriptar("Arriba la uteq")
    expect(crypto.desencriptar(textoEncriptado)).toBe("Arriba la uteq")
})