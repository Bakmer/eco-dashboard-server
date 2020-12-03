"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeNotFoundResponse = exports.COOKIE_NAME = exports.__prod__ = void 0;
exports.__prod__ = !!(process.env.NODE_ENV === "production");
exports.COOKIE_NAME = "qid";
exports.storeNotFoundResponse = {
    field: "error",
    message: "No existe la tienda seleccionada",
};
//# sourceMappingURL=index.js.map