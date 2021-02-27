const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const _Schema = new Schema(
  {
    student_id: { type: String },
    subject_id: { type: String },
    slot: { type: Number },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

function validateCreate(data) {
  const schema = Joi.object({
    student_id: Joi.string().required(),
    subject_id: Joi.string().required(),
    slot: Joi.number().required(),
    status: Joi.boolean(),
  });
  return schema.validate(data);
}

function validateEdit(data) {
  const schema = Joi.object({
    student_id: Joi.string().required(),
    subject_id: Joi.string().required(),
    slot: Joi.number().required(),
    status: Joi.boolean(),
  });
  return schema.validate(data);
}

_Schema.set("toObject", { virtuals: true });
_Schema.set("toJSON", { virtuals: true });

/**
 * Statics
 */

mongoose.set("useFindAndModify", false);
const Schedule = mongoose.model("Schedule", _Schema, "Facy_Schedules");
exports.validateCreate = validateCreate;
exports.validateEdit = validateEdit;
exports.Schedule = Schedule;
// exports.validateLogin = validateLogin;
