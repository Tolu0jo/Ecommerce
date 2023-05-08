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
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
//import{db} from "./config/index"
const buyerRoute_1 = __importDefault(require("./routes/buyerRoute"));
const db_1 = require("./config/db");
dotenv_1.default.config();
// db.sync().then(()=>{
//     console.log("Database connected Successfully...")
// }).catch(err=>{
//     console.log(err)
// })
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "*"
}));
app.use("/user", buyerRoute_1.default);
const port = 5000;
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectDb)();
    db_1.sequelize.sync({ force: false }).then(() => {
        console.log("Database Synced Successfully...");
    });
    console.log(`Server running on http://localhost:${port}`);
}));
