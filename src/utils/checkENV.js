function checkENV(value){
    const env = process.env[value];

    if (!env) {
        throw new Error(`${value} not found`)
    }

    return env
}

module.exports = checkENV