import { validationResult } from "express-validator";
import { body } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array()[0] });
};

export const validateCredential = [
  body("user.email").normalizeEmail().isEmail().withMessage("Invalid email"),
  body("user.password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password should be at least 5 characters"),
  validate,
];

export const validateUpdateProfile = [
  body("profile.comapny")
    .if(body("user.role.provider").equals("true"))
    .isLength({ min: 5, max: 20 })
    .withMessage("Company name should be at least 5 characters"),
  body("profile.name.first")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("First name should be at least 1 characters"),
  body("profile.name.last")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("Last name should be at least 1 characters"),
  body("profile.contact.countryCode")
    .trim()
    .isLength({ min: 1, max: 4 })
    .withMessage("Country Code should be between 1 - 4 digits"),
  body("profile.contact.phoneNumber")
    .isMobilePhone()
    .withMessage("Input correct Phone Number"),
  body("profile.address.country")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("Country is missing"),
  body("profile.address.zipCode")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("Zip code is missing"),
  body("profile.address.state")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("State is missing"),
  body("profile.address.city")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("City is missing"),
  validate,
];

export const validateRegisterProfile = [
  ...validateCredential,
  ...validateUpdateProfile,
  validate,
];
