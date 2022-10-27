const generate_routes = require('./generate_routes')

const verifyToken = require('../middlewares/verify-token')

const auth_controller = require('../controllers/auth-controller')
const user_controller = require('../controllers/user-controller')
const chart_controller = require('../controllers/chart-controller')
const chat_controller = require('../controllers/chat-controller')
const friendship_controller = require('../controllers/friendship-controller')

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
    path: '/user',
    children: [
      {
        path: '/all',
        handler: user_controller.getAllUsers,
        method: 'get',
      },
      {
        path: '/:slug',
        handler: user_controller.getUserByUsername,
        method: 'get',
      },
      {
        path: '/',
        handler: user_controller.updateUser,
        method: 'put',
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
        path: '/public',
        handler: chart_controller.get,
        method: 'get',
      },
      {
        path: '/:id',
        handler: chart_controller.getByID,
        method: 'get',
      },
      {
        path: '/user/:id',
        handler: chart_controller.getByUserID,
        method: 'get',
      },
      {
        path: '/',
        handler: chart_controller.create,
        method: 'post',
      },
      {
        path: '/private',
        handler: chart_controller.create,
        method: 'post',
      },
      {
        path: '/ai',
        handler: chart_controller.create,
        method: 'post',
      },
      {
        path: '/:id',
        handler: chart_controller.update,
        method: 'put',
      },
      {
        path: '/:id',
        handler: chart_controller.remove,
        method: 'delete',
      },
      {
        path: '/update-time/:id',
        handler: chart_controller.updateTime,
        method: 'put',
      },
    ],
  },
  {
    path: '/chat',
    children: [
      {
        path: '/user/:id',
        handler: chat_controller.getByUserID,
        method: 'get',
      },
      {
        path: '/',
        handler: chat_controller.create,
        method: 'post',
      },
      {
        path: '/:id',
        handler: chat_controller.sendMessage,
        method: 'put',
      },
    ],
  },
  {
    path: '/friendship',
    children: [
      {
        path: '/',
        handler: friendship_controller.getRequests,
        method: 'get',
      },
      {
        path: '/:id',
        handler: friendship_controller.getRequest,
        method: 'get',
      },
      {
        path: '/',
        handler: friendship_controller.createRequest,
        method: 'post',
      },
      {
        path: '/:id',
        handler: friendship_controller.updateRequest,
        method: 'put',
      },
    ],
  },
]

module.exports = generate_routes(routes)
