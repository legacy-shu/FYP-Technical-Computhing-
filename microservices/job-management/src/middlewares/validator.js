import { validationResult } from "express-validator";
import { body } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array()[0] });
};

export const validateJobPosting = [
  body("description.userId").notEmpty().withMessage("In userId field"),
  body("description.title").trim().notEmpty().withMessage("In title field"),
  body("description.email").normalizeEmail().isEmail().withMessage("In email field"),
  body("description.company").trim().notEmpty().withMessage("In company field"),
  body("description.address.country").trim().notEmpty().withMessage("In country field"),
  body("description.address.zipCode").trim().notEmpty().withMessage("In zipCode field"),
  body("description.address.state").trim().notEmpty().withMessage("In state field"),
  body("description.address.city").trim().notEmpty().withMessage("In city field"),
  body("description.salary").trim().notEmpty().withMessage("In salary field"),
  body("description.jobType").trim().notEmpty().withMessage("In jobType field"),
  body("description.posted").trim().notEmpty().withMessage("In posted field"),
  body("description.about").trim().notEmpty().isLength({ max: 5000 }).withMessage("In about field"),
  body("description.roleDetail").trim().notEmpty().isLength({ max: 5000 }).withMessage("In roleDetail field"),
  body("description.responsibilities")
    .trim()
    .notEmpty()
    .isLength({ max: 5000 }).withMessage("In responsibilities field"),
  body("description.skills").trim().notEmpty().isLength({ max: 5000 }).withMessage("In skills field"),
  validate,
];
