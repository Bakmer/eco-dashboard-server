export const __prod__ = !!(process.env.NODE_ENV === "production");
export const COOKIE_NAME = "qid";
export const storeNotFoundResponse = {
  field: "error",
  message: "No existe la tienda seleccionada",
};
