require('dotenv').config()
const crypto = require('crypto')
const salt = process.env.SALT || 'sila'

function createToken(data) {
    const header = {
        tpy:'JWT',
        alg:'HS256'
    }

    const payload = {
        ...data
    }

    const eHeader = encoding(header)
    const ePayload = encoding(payload)
    const signature = createSignature(eHeader, ePayload)

    return `${eHeader}.${ePayload}.${signature}`
}

function encoding(data) {
    return Buffer.from(JSON.stringify(data))
    .toString('base64').replace(/[=]/g, '')
}

function createSignature(header, payload) {
    const encoding = `${header}.${payload}`
    const signature = crypto.createHmac('sha256', salt).update(encoding)
    .digest('base64').replace(/[=]/g,'')

    return signature
}

module.exports = {
    createToken,
    createSignature
}