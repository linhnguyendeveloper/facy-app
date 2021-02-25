const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require('joi');

const _Schema = new Schema({
    id: { type: Schema.Types.ObjectId },
    name: { type: String },
    teacher_id: { type: Schema.Types.ObjectId },
    status: { type: Boolean, default: true },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})


function validateCreate(data) {
    const schema = {
        id: Joi.string().require(),
        name: Joi.string().require(),
        teacher_id: Joi.string().require(),
        status: Joi.string()
    };
    return Joi.validate(data, schema);
}

function validateEdit(data) {
    const schema = {
        id: Joi.string().require(),
        name: Joi.string().require(),
        teacher_id: Joi.string().require(),
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
const Facy_Class = mongoose.model("Facy_Class", _Schema,"Facy_Class");
exports.validateCreate = validateCreate;
exports.validateEdit = validateEdit;
exports.Facy_Class = Facy_Class;
// exports.validateLogin = validateLogin;