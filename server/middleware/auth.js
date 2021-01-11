// const { Role } = require('../app/models/roles');
const { pareJwtToken } = require('../app/utils/func');
const config = require('../config/index')

const auth = (req, res, next) => {
    // new Promise(async (rs, rj) => {
    //     if (req.headers && req.headers.authorization) {
    //         const jwtToken = pareJwtToken(req.headers.authorization);
    //         if (!jwtToken) return rj();
    //         if (jwtToken.role === "ADMIN") {
    //             return rs()
    //         } else {
    //             const per = req.url.substring(1).split('/');
    //             if (per.length < 2) return rj();
    //             const role = await Role.findOne({ name: jwtToken.role }).populate('permissions');
    //             if (!role) return rj();
    //             const check_role = role.permissions.find(e => e.module === per[0] && e.name === per[1]);
    //             if (check_role && check_role.check) {
    //                 return rs()
    //             }
    //             else {
    //                 return rj();
    //             }
    //         }

    //     } else {
    //         rj()
    //     }
    // }).then(data => {
    //     // req.user = data;
    //     next()
    // }).catch(err => {
    //     res.status(401).json({
    //         result: false,
    //         errors: {},
    //         message: "Unauthorized user!"
    //     })
    // })
    console.log('hahaha');
    next()
}

module.exports = auth
