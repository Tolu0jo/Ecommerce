"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySignature = exports.validatePassword = exports.GenerateSignature = exports.HashedPassword = exports.GenerateSalt = exports.option = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
exports.registerSchema = joi_1.default.object().keys({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    confirm_password: joi_1.default.any().equal(joi_1.default.ref("password")).required().label("Confirm password").messages({ "any.only": "{{#label}} does not match" }),
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    phone: joi_1.default.string().required(),
});
exports.option = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        }
    }
};
const GenerateSalt = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.genSalt();
});
exports.GenerateSalt = GenerateSalt;
const HashedPassword = (password, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.hash(password, salt);
});
exports.HashedPassword = HashedPassword;
const GenerateSignature = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign(payload, config_1.JWT_SECRET);
});
exports.GenerateSignature = GenerateSignature;
const validatePassword = (enteredPassword, savedPassword, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield (0, exports.HashedPassword)(enteredPassword, salt)) === savedPassword;
});
exports.validatePassword = validatePassword;
const verifySignature = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
});
exports.verifySignature = verifySignature;
