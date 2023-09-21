const xss = require('xss')
const { addHours, isAfter } = require('date-fns');
const jwt = require('jsonwebtoken');

const apiKey = process.env.REACT_APP_API_KEY;

const controlApiKey = (req, res, next) => {
    const apikeyClient = req.query.key;

    if (!apikeyClient) {
        return res.status(401).json({ error: "Clé API manquante dégage !" });
    }
    if (apikeyClient !== apiKey) {
        return res.status(401).json({ error: "Clé API non conforme dégage !" });
    }

    next();
};

const cleanInjection = (req, res, next) => {
    cleanRecursive(req.params);
    cleanRecursive(req.body);
    cleanRecursive(req.query);

    next();
};

const cleanRecursive = (obj) => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === "object" && obj[key] !== null) {
                cleanRecursive(obj[key]);
            } else if (obj[key] !== null) {
                if (typeof obj[key] === "string") {
                    obj[key] = xss(obj[key]);
                } else {
                    console.log(obj[key]);
                }
            }
        } else {
            console.log("info non conforme :" + key);
        }
    }
};

const controlToken = (req, res, next) => {
    const token = req.cookies.token;

    console.log(token);

    if (!token) {
        return res.status(401).json({ error: "Token manquant dégage !" });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);

        const expirationTime = new Date(decoded.exp * 1000);

        if (isAfter(new Date(), expirationTime)) {
            return res.status(401).json({ error: "Token expiré dégage !" });
        }

        next();
    } catch (error) {
        return res.status(401).json({ error: "Token invalide dégage !" });
    }
};

const createToken = (id) => {
    const expirationTime = addHours(new Date(), 1);
    const tokenData = { id, exp: Math.floor(expirationTime / 1000) };
    return jwt.sign(tokenData, process.env.TOKEN_KEY);
};

module.exports = { controlApiKey, cleanInjection, controlToken, createToken };