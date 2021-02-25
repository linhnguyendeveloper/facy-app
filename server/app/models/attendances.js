const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require('joi');

const _Schema = new Schema({
    id: { type: Schema.Types.ObjectId },
    class_id: { type: Schema.Types.ObjectId },
    attendance: { type: Array},
    status: { type: Boolean, default: true },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})


function validateCreate(data) {
    const schema = {
        id: Joi.string().require(),
        class_id: Joi.string().require(),
        attendance: Joi.array().require(),
        status: Joi.string()
    };
    return Joi.validate(data, schema);
}

function validateEdit(data) {
    const schema = {
        id: Joi.string().require(),
        class_id: Joi.string().require(),
        attendance: Joi.array().require(),
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
const Facy_Attendance = mongoose.model("Facy_Attendance", _Schema,"Facy_Attendances");
exports.validateCreate = validateCreate;
exports.validateEdit = validateEdit;
exports.Facy_Attendance = Facy_Attendance;
// exports.validateLogin = validateLogin;