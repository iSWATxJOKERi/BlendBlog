"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./config/passport"));
const users_1 = __importDefault(require("./routes/api/users"));
const posts_1 = __importDefault(require("./routes/api/posts"));
const favorites_1 = __importDefault(require("./routes/api/favorites"));
app.use(passport_1.default.initialize());
passport_2.default(passport_1.default);
app.use(express_1.default.static('dist'));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../dist', 'index.html'));
});
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use("/api", users_1.default);
app.use("/api", posts_1.default);
app.use("/api", favorites_1.default);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
