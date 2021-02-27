const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const _Schema = new Schema(
  {
    email: { type: String },
    room: { type: String },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

function validateCreate(data) {
  const schema = Joi.object({
    email: Joi.string().required(),
    room: Joi.string().required(),
    status: Joi.boolean(),
  });
  return schema.validate(data);
}

function validateEdit(data) {
  const schema = Joi.object({
    email: Joi.string().required(),
    room: Joi.string().required(),
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
const Attendance = mongoose.model("Attendance", _Schema, "Facy_Attendances");
exports.validateCreate = validateCreate;
exports.validateEdit = validateEdit;
exports.Attendance = Attendance;
// exports.validateLogin = validateLogin;
