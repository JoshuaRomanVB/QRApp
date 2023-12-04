
function suma(a, b) {
    return a + b
}

test('suma de 4 + 5 es igual a 9', () => {
    expect(suma(4, 5)).toBe(9)
})

test('suma de 3 + 5 es igual a 8', () => {
    expect(suma(3, 5)).toBe(8)
})
