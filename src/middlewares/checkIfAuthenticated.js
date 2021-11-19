const { auth }  = require("../services/firebase-service");

const getAuthToken = (req, res, next) => {
    if (req.headers.token && req.headers.token.split(" ")[0] === "Bearer") {
        req.authToken = req.headers.token.split(" ")[1];
    } else {
        req.authToken = null;
    }
    next();
};

const checkIfAuthenticated = (req, res, next) => {
    getAuthToken(req, res, async () => {
        try {
            const { authToken } = req;
            const userInfo = await auth.verifyIdToken(authToken);
            req.user = userInfo ;
            return next();
        } catch (e) {
            return res.status(401).send({ 
                status : "failure",
                error: e.message 
            });
        }
    });
};

module.exports = checkIfAuthenticated ;