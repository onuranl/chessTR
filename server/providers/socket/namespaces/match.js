const pools = require('../../../helpers/pools')
const chart_model = require('../../../models/chart')

module.exports = (socket, io) => {
  socket.on('match', (data) => {
    pools.map(async (pool, index) => {
      const isUserInPool = pool.searchers.indexOf(socket.id)

      if (isUserInPool !== -1) {
        pool.searchers.splice(isUserInPool, 1)
      }

      if (data) {
        if (pool.clock === data.clock && pool.perf === data.perf) {
          pool.searchers.push(socket.id)

          const searchers = pools[index].searchers

          if (searchers[searchers.length - 2]) {
            const payload = {}
            const createdChart = await chart_model.create(payload)

            io.to(searchers[searchers.length - 2]).emit(
              'generate',
              createdChart
            )

            var userController

            userController = setInterval(async function () {
              const chart = await chart_model.findById(createdChart._id)
              if (chart.users.length > 0) {
                io.to(searchers[searchers.length - 1]).emit(
                  'generate',
                  createdChart
                )

                clearInterval(userController)
              }
            }, 1000)
          }
        }
      }
    })
  })
}
