const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require('joi');
const bcrypt = require("bcryptjs");
const dataMigrate = require('../../database/seeds/users')

const _Schema = new Schema({
    id: { type: Schema.Types.ObjectId },
    fullname: { type: String },
    email: { type: String, unique: true, index: true },
    password: { type: String, required: false },
    role: { type: Array },
    role_name: { type: String },
    status: { type: Boolean, default: true },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})


function validateCreate(data) {
    const schema = {
        id: Joi.string().require(),
        fullname: Joi.string().require(),
        email: Joi.string().min(5).max(100).required().email(),
        password: Joi.string().min(5).max(255).allow(''),
        role: Joi.array().require(),
        role_name: Joi.string().require(),
        status: Joi.string()
    };
    return Joi.validate(data, schema);
}

function validateEdit(data) {
    const schema = {
        id: Joi.string().require(),
        fullname: Joi.string().require(),
        email: Joi.string().min(5).max(100).required().email(),
        password: Joi.string().min(5).max(255).allow(''),
        role: Joi.array().require(),
        role_name: Joi.string().require(),
        status: Joi.string()
    };
    return Joi.validate(data, schema);
}
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

_Schema.statics.getMigrateData = function () {
    return dataMigrate;
}
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

_Schema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}


_Schema.set('toObject', { virtuals: true });
_Schema.set('toJSON', { virtuals: true });

/**
 * Statics
 */

mongoose.set('useFindAndModify', false);
const Facy_User = mongoose.model("Facy_User", _Schema,"Facy_Users");
exports.validateCreate = validateCreate;
exports.validateEdit = validateEdit;
exports.Facy_User = Facy_User;
// exports.validateLogin = validateLogin;