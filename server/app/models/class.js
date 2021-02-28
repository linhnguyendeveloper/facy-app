const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require('joi');

const _Schema = new Schema({
    id: { type: String, unique: true, index: true },
    name: { type: String },
    teacher_id: { type: String },
    students_email: { type: Array },
    status: { type: Boolean, default: true },
    deleted: { type: Boolean },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})


function validateCreate(data) {
    const schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        teacher_id: Joi.string().required(),
        students_email : Joi.array(),
        status: Joi.boolean(),
        deleted: Joi.boolean()
    });
    return schema.validate(data);
}

function validateEdit(data) {
    const schema = Joi.object({
        id: Joi.string(),
        name: Joi.string(),
        teacher_id: Joi.string(),
        students_email : Joi.array(),
        status: Joi.boolean(),
        deleted: Joi.boolean()
    });
    return schema.validate(data);
}



_Schema.set('toObject', { virtuals: true });
_Schema.set('toJSON', { virtuals: true });

/**
 * Statics
 */

mongoose.set('useFindAndModify', false);
const Class = mongoose.model("Class", _Schema,"Facy_Class");
exports.validateCreate = validateCreate;
exports.validateEdit = validateEdit;
exports.Class = Class;
// exports.validateLogin = validateLogin;