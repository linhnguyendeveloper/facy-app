const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require('joi');

const _Schema = new Schema({
    id: { type: Schema.Types.ObjectId },
    student_id: { type: Schema.Types.ObjectId },
    subject_id: { type: Schema.Types.ObjectId },
    slot: { type: Number },
    status: { type: Boolean, default: true },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})


function validateCreate(data) {
    const schema = {
        id: Joi.string().require(),
        student_id: Joi.string().require(),
        subject_id: Joi.string().require(),
        slot: Joi.number().require(),
        status: Joi.string()
    };
    return Joi.validate(data, schema);
}

function validateEdit(data) {
    const schema = {
        id: Joi.string().require(),
        student_id: Joi.string().require(),
        subject_id: Joi.string().require(),
        slot: Joi.number().require(),
        status: Joi.string()
    };
    return Joi.validate(data, schema);
}


_Schema.set('toObject', { virtuals: true });
_Schema.set('toJSON', { virtuals: true });

/**
 * Statics
 */

mongoose.set('useFindAndModify', false);
const Facy_Schedule = mongoose.model("Facy_Schedule", _Schema,"Facy_Schedules");
exports.validateCreate = validateCreate;
exports.validateEdit = validateEdit;
exports.Facy_Schedule = Facy_Schedule;
// exports.validateLogin = validateLogin;