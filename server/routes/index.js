const generate_routes = require('./generate_routes')

const verifyToken = require('../middlewares/verify-token')

const auth_controller = require('../controllers/auth-controller')
const user_controller = require('../controllers/user-controller')
const chart_controller = require('../controllers/chart-controller')

const routes = [
  {
    path: '/auth',
    children: [
      {
        path: '/register',
        handler: auth_controller.register,
        method: 'post',
      },
      {
        path: '/login',
        handler: auth_controller.login,
        method: 'post',
      },
      {
        path: '/logout',
        handler: auth_controller.logout,
        method: 'post',
      },
      {
        path: '/user',
        handler: user_controller.user,
        method: 'get',
        middleware: verifyToken,
      },
    ],
  },
  {
    path: '/chart',
    children: [
      {
        path: '/',
        handler: chart_controller.get,
        method: 'get',
      },
      {
        path: '/:id',
        handler: chart_controller.getByID,
        method: 'get',
      },
      {
        path: '/',
        handler: chart_controller.create,
        method: 'post',
      },
      {
        path: '/public',
        handler: chart_controller.create,
        method: 'post',
      },
      {
        path: '/:id',
        handler: chart_controller.update,
        method: 'put',
      },
      {
        path: '/update-time/:id',
        handler: chart_controller.updateTime,
        method: 'put',
      },
    ],
  },
]

module.exports = generate_routes(routes)
