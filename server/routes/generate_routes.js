var express = require("express");
var router = express.Router();

function addRoute(route) {
  let { path, method, validation, handler, middleware } = route;
  if (!handler) return;

  router[method](path, middleware, (req, res) => {
    if (validation) {
      const errors = validation.validate(req.body)?.error?.details?.map((v) => {
        return {
          [v.context.key]: v.message,
        };
      });

      if (errors) {
        let formattedErrors = errors.reduce((a, b) => ({ ...a, ...b }), {});
        return res.status(422).json(formattedErrors);
      }
    }

    handler(req, res);
  });
}

function setupRouter(
  routes,
  parentPath = "",
  parentMiddlware = (req, res, next) => next()
) {
  routes.forEach((node) => {
    if (node.children) {
      addRoute(node);
      setupRouter(node.children, node.path, node.middleware);
      return;
    }

    if (parentPath) {
      node.path = parentPath + node.path;
    }

    if (!node.middleware) {
      node.middleware = parentMiddlware;
    }

    addRoute(node);
  });

  return router;
}

module.exports = setupRouter;