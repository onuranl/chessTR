const generate_routes = require("./generate_routes");

const chart_controller = require("../controllers/chart-controller");

const routes = [{
    path: "/chart",
    children: [
      {
        path: "/",
        handler: chart_controller.get,
        method: "get",
      },
      {
        path: "/:id",
        handler: chart_controller.getByID,
        method: "get",
      },
      {
        path: "/",
        handler: chart_controller.create,
        method: "post",
      },
      {
        path: "/:id",
        handler: chart_controller.update,
        method: "put",
      },
    ],
}]

module.exports = generate_routes(routes);