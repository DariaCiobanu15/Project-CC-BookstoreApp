const axios = require('axios');

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send('Access denied');
    }

    try {
        const response = await axios.post('http://auth-service:3001/auth/validate', { token });
        req.user = response.data; // Datele despre utilizator
        next();
    } catch (err) {
        res.status(401).send('Invalid or expired token');
    }
};

const authorize = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).send('Access forbidden');
    }
    next();
};

module.exports = { authenticate, authorize };
