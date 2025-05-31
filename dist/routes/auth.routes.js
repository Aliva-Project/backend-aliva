"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../controllers/auth.controller");
const validate_request_1 = require("../middleware/validate-request");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/register', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Email inválido'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),
    (0, express_validator_1.body)('name').notEmpty().withMessage('El nombre es requerido'),
], validate_request_1.validateRequest, auth_controller_1.register);
router.post('/login', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Email inválido'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('La contraseña es requerida'),
], validate_request_1.validateRequest, auth_controller_1.login);
router.get('/profile', auth_1.authenticate, auth_controller_1.getProfile);
exports.default = router;
