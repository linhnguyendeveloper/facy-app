const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require('joi');

const _Schema = new Schema({
    id: { type: String, unique: true, index: true },
    class_id: { type: String },
    attendance: { type: Array },
    status: { type: Boolean, default: true },
    year: { type: String },
    semester: { type: Number },
    deleted: { type: Boolean },

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})


function validateCreate(data) {
    const schema = Joi.object({
        id: Joi.string().required(),
        class_id: Joi.string().required(),
        attendance: Joi.array().required(),
        year: Joi.string().required(),
        semester: Joi.number().required(),
        status: Joi.boolean(),
        deleted: Joi.boolean()

    });
    return schema.validate(data);
}

function validateEdit(data) {
    const schema = Joi.object({
        id: Joi.string().require(),
        class_id: Joi.string().require(),
        attendance: Joi.array().require(),
        year: Joi.string().required(),
        semester: Joi.number().required(),
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
const Schedule = mongoose.model("Schedule", _Schema, "Facy_Schedules");
exports.validateCreate = validateCreate;
exports.validateEdit = validateEdit;
exports.Schedule = Schedule;
// exports.validateLogin = validateLogin;