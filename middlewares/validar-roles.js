import { request, response } from "express";

export const isAdminRole = (req = request, res = response, next) => {
  if (!req.userAuth) {
    return res.status(500).json({
      msg: "Se quiere verificar el role sin validar el token primero",
    });
  }

  const { role, name } = req.userAuth;
  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} no es administrador`,
    });
  }

  next();
};

export const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.userAuth) {
      return res.status(500).json({
        msg: "Se quiere verificar el role sin validar el token primero",
      });
    }

    if (!roles.includes(req.userAuth.role)) {
      return res.status(401).json({
        msg: `El servicio require uno de estos roles: ${roles}`,
      });
    }

    next();
  };
};
