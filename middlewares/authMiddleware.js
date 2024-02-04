const jwt = require("./../utils/jwt");

const authMiddleware = async (req, res, next) => {
    const token = req.cookies["auth"];

    if (!token) {
        return next();
    }

    try {
        const decoded = await jwt.verify(token, process.env.SECRET);

        req.userId = decoded._id;
        res.locals.isAuthenticated = true;

        next();
    } catch (err) {
        next();
    }
}

const isAuth = (req, res, next) => {
    if (!req.userId) {
        return res.redirect("/login");
    }

    next();
}

module.exports = {
    authMiddleware,
    isAuth
}