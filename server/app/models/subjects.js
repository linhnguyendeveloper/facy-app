const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require('joi');

const _Schema = new Schema({
    email: { type: String, unique: true, index: true },
    name: { type: String },
    teacher_id: { type: String },
    status: { type: Boolean, default: true },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})


function validateCreate(data) {
    const schema = Joi.object({
        id: Joi.string().require(),
        name: Joi.string().require(),
        teacher_id: Joi.string().require(),
        status: Joi.string()
    });
    return schema.validate(data);
}

function validateEdit(data) {
    const schema = Joi.object({
        id: Joi.string().require(),
        name: Joi.string().require(),
        teacher_id: Joi.string().require(),
        status: Joi.string()
    });
    return schema.validate(data);
}


_Schema.set('toObject', { virtuals: true });
_Schema.set('toJSON', { virtuals: true });

/**
 * Statics
 */

mongoose.set('useFindAndModify', false);
const Subject = mongoose.model("Subject", _Schema,"Facy_Subjects");
exports.validateCreate = validateCreate;
exports.validateEdit = validateEdit;
exports.Subject = Subject;
// exports.validateLogin = validateLogin;