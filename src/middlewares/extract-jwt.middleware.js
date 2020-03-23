const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const { JWT_SECRET } = require('../utils/utils');

/* validar se a roda está autorizada */
module.exports = (req, res, next) => {
    let authorization = req.get('authorization');
    let token = authorization ?  authorization.split(' ')[1] : undefined;
    
    req['context'] = {};
    req['context']['authorization'] = authorization;

    if(!token) return next();
    
    jwt.verify(token, JWT_SECRET(), (err, decoded) => {
        if(err) return next();

        User.findByPk(decoded.sub, {
            attributes: ['id', 'email']
        }).then((user) => {
            
            if(user) {
                req['context']['authUser'] = {
                    id: user.get('id'),
                    email: user.get('email')
                };
            }
            return next();
        });
        
    });

};
