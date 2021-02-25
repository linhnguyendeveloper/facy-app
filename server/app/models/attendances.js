const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require('joi');

const _Schema = new Schema({
    email: { type: String, unique: true, index: true },
    class_id: { type: String },
    attendance: { type: Array},
    status: { type: Boolean, default: true },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})


function validateCreate(data) {
    const schema = Joi.object({
        id: Joi.string().require(),
        class_id: Joi.string().require(),
        attendance: Joi.array().require(),
        status: Joi.string()
    });
    return schema.validate(data);
}

function validateEdit(data) {
    const schema = Joi.object({
        id: Joi.string().require(),
        class_id: Joi.string().require(),
        attendance: Joi.array().require(),
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
const Attendance = mongoose.model("Attendance", _Schema,"Facy_Attendances");
exports.validateCreate = validateCreate;
exports.validateEdit = validateEdit;
exports.Attendance = Attendance;
// exports.validateLogin = validateLogin;