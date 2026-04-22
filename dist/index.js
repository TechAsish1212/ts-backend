"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 2005;
app.get('/', (req, res) => {
    return res.send('Hiii......');
});
app.listen(PORT, () => {
    return `Server is started at:: https://localhost:${PORT}`;
});
//# sourceMappingURL=index.js.map