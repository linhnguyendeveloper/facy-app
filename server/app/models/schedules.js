const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require('joi');

const _Schema = new Schema({
    email: { type: String, unique: true, index: true },
    student_id: { type: String },
    subject_id: { type: String },
    slot: { type: Number },
    status: { type: Boolean, default: true },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})


function validateCreate(data) {
    const schema = Joi.object({
        id: Joi.string().require(),
        student_id: Joi.string().require(),
        subject_id: Joi.string().require(),
        slot: Joi.number().require(),
        status: Joi.string()
    });
    return schema.validate(data);
}

function validateEdit(data) {
    const schema = Joi.object({
        id: Joi.string().require(),
        student_id: Joi.string().require(),
        subject_id: Joi.string().require(),
        slot: Joi.number().require(),
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
const Schedule = mongoose.model("Schedule", _Schema,"Facy_Schedules");
exports.validateCreate = validateCreate;
exports.validateEdit = validateEdit;
exports.Schedule = Schedule;
// exports.validateLogin = validateLogin;