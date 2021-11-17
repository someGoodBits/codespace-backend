import { auth } from "../services/firebase-service";

const getAuthToken = (req, res, next) => {
    if (req.headers.token && req.headers.token.split(" ")[0] === "Bearer") {
        req.authToken = req.headers.token.split(" ")[1];
    } else {
        req.authToken = null;
    }
    next();
};

const isAuthenticated = (req, res, next) => {
    getAuthToken(req, res, async () => {
        try {
            const { authToken } = req;
            const userInfo = await auth.verifyIdToken(authToken);
            req.user = userInfo ;
            return next();
        } catch (e) {
            return res.status(401).send({ 
                status : "failure",
                error: "Unauthorized" 
            });
        }
    });
};

module.exports = isAuthenticated ;