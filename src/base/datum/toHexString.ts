export function toHexString(value) {
    const hexTable = []
    let hexString = ''

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 256; i++) {
        hexTable[i] = (i <= 15 ? '0' : '') + i.toString(16)
    }

    const id = Object.keys(value.id).map((key) => value.id[key]) // eslint-disable-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return

    // eslint-disable-next-line no-restricted-syntax
    for (const el of id) {
        hexString += hexTable[el] // eslint-disable-line @typescript-eslint/no-unsafe-member-access
    }

    return hexString
}
