const jwt = require('jsonwebtoken');
const Worker = require('../models/worker'); // Import the Worker model
const Client = require('../models/client'); // If you support clients too
const Admin = require('../models/admin');   // If needed

const auth = (role) => {
    return async (req, res, next) => {
        const token = req.cookies.jwt;
        if (!token) {
            return res.redirect('/api/' + role + '/login');
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            if (decoded.role !== role) {
                return res.status(403).send('Forbidden');
            }

            // Set the ID
            req[role + 'ID'] = decoded.id;

            // Fetch full user data and attach to req.[role]
            let user;
            if (role === 'worker') {
                user = await Worker.findById(decoded.id);
                req.worker = user;
            } else if (role === 'client') {
                user = await Client.findById(decoded.id);
                req.client = user;
            } else if (role === 'admin') {
                user = await Admin.findById(decoded.id);
                req.admin = user;
            }

            if (!user) {
                return res.redirect('/api/' + role + '/login');
            }

            next();
        } catch (err) {
            console.log('Invalid token:', err.message);
            res.clearCookie('jwt');
            res.redirect('/api/' + role + '/login');
        }
    };
};

module.exports = auth;
