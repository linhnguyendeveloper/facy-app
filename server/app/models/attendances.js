const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require('joi');
const bcrypt = require('bcrypt');
// const dataMigrate = require('../../database/seeds/users')

const _Schema = new Schema({
    id: { type: String, unique: true, required: true },
    courseId: { type: String, required: false },
    classId: { type: String, required: false },
    time: {
        type: String, enum: ["1", '2', "3", "4", "5",6], default: "1"
    },
    date : {type : String },
   attendance: { type: Object}
});


// function validateCreateUser(data) {
//     const schema = {
//         username: Joi.string().min(1).max(30).required(),
//         password:  Joi.string().min(5).max(255).allow(''),
//         role: Joi.string(),
//         organization: Joi.string().required(),
//         email: Joi.string().min(5).max(100).required().email(),
//         resetPasswordToken:  Joi.string(),
//         resetPasswordExpires : Joi.date(),
//         blocked : Joi.boolean(),
//     };
//     return Joi.validate(data, schema);
// }

// function validateEditUser(data) {
//     const schema = {
//         username: Joi.string().min(1).max(30),
//         password:  Joi.string().min(5).max(255).allow(''),
//         role: Joi.string(),
//         organization: Joi.string(),
//         email: Joi.string().min(5).max(100).email(),
//         resetPasswordToken:  Joi.string(),
//         resetPasswordExpires : Joi.date(),
//         blocked : Joi.boolean(),
//     };
//     return Joi.validate(data, schema);
// }
// const dataMigrate = [
//     {
//         email: 'admin@gmail.com',
//         username: "admin",
//         password: dfPass,
//         role: 'ADMIN',
//       },
//       {
//         email: 'staff-1@abc.com',
//         username: "ketoan",
//         password: dfPass,
//         role: 'ACCOUNTANT_CP',
//       },
//       {
//         email: 'chef-1@abc.com',
//         username: "ketoanbophan",
//         password: dfPass,
//         role: 'ACCOUNTANT_BR',
//       }
// ];

// _Schema.statics.getMigrateData = function () {
//     return dataMigrate;
// }
/**
 * virtual
 */

// function validateLogin(user) {
//     const schema = {
//         username: Joi.string().regex(/^[a-zA-Z0-9\_]+$/).min(3).max(50).required(),
//         password: Joi.string().min(5).max(255).required()
//     };
//     return Joi.validate(user, schema);
// }

// _Schema.methods.checkPassword = function (password) {
//     return bcrypt.compareSync(password, this.password);
// }

/**
 * Statics
 */


const User = mongoose.model("User", _Schema);
// exports.validateCreateUser = validateCreateUser;
// exports.validateEditUser = validateEditUser;
exports.User = User;
// exports.validateLogin = validateLogin;