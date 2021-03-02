const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const _Schema = new Schema(
  {
    id: { type: String},
    name: { type: String },
    class_id: { type: String },
    teacher_id: { type: String },
    status: { type: Boolean, default: true },
    deleted: { type: Boolean },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

function validateCreate(data) {
  const schema = Joi.object({
    id: Joi.string().required(),
    class_id: Joi.string().required(),
    name: Joi.string().required(),
    teacher_id: Joi.string().required(),
    status: Joi.boolean(),
    deleted: Joi.boolean(),
  });
  return schema.validate(data);
}

function validateEdit(data) {
  const schema = Joi.object({
    id: Joi.string(),
    class_id: Joi.string(),
    name: Joi.string().required(),
    teacher_id: Joi.string(),
    status: Joi.boolean(),
    deleted: Joi.boolean(),
  });
  return schema.validate(data);
}

_Schema.set("toObject", { virtuals: true });
_Schema.set("toJSON", { virtuals: true });

/**
 * Statics
 */

mongoose.set("useFindAndModify", false);
const Subject = mongoose.model("Subject", _Schema, "Facy_Subjects");
exports.validateCreate = validateCreate;
exports.validateEdit = validateEdit;
exports.Subject = Subject;
// exports.validateLogin = validateLogin;
