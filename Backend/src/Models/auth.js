var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const Admin = require("./Admin.js")
const Pharmacist = require("./Pharmacist.js");
const Patient = require("./Patient.js");
const { default: mongoose } = require("mongoose");

const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash);
};

const createJWTP = (username) => {
    const token = jwt.sign(username, process.env.JWT_SECRETP);
    return token;
};
const createJWTPH = (username) => {
    const token = jwt.sign(username, process.env.JWT_SECRETPH);
    return token;
};

const createJWTA = (username) => {
    const token = jwt.sign(username, process.env.JWT_SECRETA);
    return token;
};

const protectP = (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        res.status(401);
        console.log("not authorized");
        res.json({ message: "not authorized" });
        return;
    }

    const [, token] = bearer.split(" ");

    if (!token) {
        res.status(401);
        console.log("not valid token");
        res.json({ message: "not valid token" });
        return;
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRETP);
        req.user = user;
        next();
    } catch (e) {
        console.error(e);
        res.status(401);
        res.json({ message: "not valid token" });
        return;
    }
};

const protectPH = (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        res.status(401);
        console.log("not authorized");
        res.json({ message: "not authorized" });
        return;
    }

    const [, token] = bearer.split(" ");

    if (!token) {
        res.status(401);
        console.log("not valid token");
        res.json({ message: "not valid token" });
        return;
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRETD);
        req.user = user;
        next();
    } catch (e) {
        console.error(e);
        res.status(401);
        res.json({ message: "not valid token" });
        return;
    }
};

const protectA = (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        res.status(401);
        console.log("not authorized");
        res.json({ message: "not authorized" });
        return;
    }

    const [, token] = bearer.split(" ");

    if (!token) {
        res.status(401);
        console.log("not valid token");
        res.json({ message: "not valid token" });
        return;
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRETA);
        req.user = user;
        next();
    } catch (e) {
        console.error(e);
        res.status(401);
        res.json({ message: "not valid token" });
        return;
    }
};

const signin = async (req, res) => {
    const username = req.body.Username;
    const password = req.body.Password;
    let user = await Patient.findOne({ Username: username });
    let isValid;
    if (user) {
        isValid = comparePassword(password, user.Password);
        if (isValid) {
            res.status(200).send({
                token: createJWTP(username),
                type: "Patient",
                Username: username,
            });
        } else {
            res.status(401).send("invalid password");
        }
    } else {
        user = await Pharmacist.findOne({ Username: username });
        if (user) {
            isValid = comparePassword(password, user.Password);
            if (isValid) {
                if (user.ReqStatus == "Accepted") {
                    res.status(200).send({
                        token: createJWTPH(username),
                        type: "Pharmacist",
                        Username: username,
                    });
                } else {
                    res.status(200).send({
                        type: "PendingPharmacist",
                        Username: username,
                    });
                }
            } else {
                res.status(401).send("invalid password");
            }
        } else {
            user = await Admin.findOne({ Username: username });
            if (user) {
                isValid = comparePassword(password, user.Password);
                if (isValid) {
                    res.status(200).send({
                        token: createJWTA(username),
                        type: "Admin",
                        Username: username,
                    });
                } else {
                    res.status(401).send("invalid password");
                }
            } else {
                res.status(401).send("user not found");
            }
        }
    }
};

module.exports = {
    signin,
    comparePassword,
    createJWTA,
    createJWTPH,
    createJWTP,
    protectA,
    protectPH,
    protectP,
};