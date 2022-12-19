class GlobalStore {
  // state
  constructor() {
    this.connectedUsers = []
    this.onlineUsers = {}
  }

  // getters
  getConnectedUsers() {
    return this.connectedUsers
  }

  getOnlineUsers() {
    return this.onlineUsers
  }

  getOnlineUser(id) {
    return this.onlineUsers[id]
  }

  // mutations
  addConnectedUser(user) {
    this.connectedUsers.push(user)
  }

  addOnlineUser(id, user) {
    this.onlineUsers[id] = user
  }

  removeConnectedUser(id) {
    const index = this.connectedUsers.map((e) => e.socketID).indexOf(id)

    if (index > -1) {
      this.connectedUsers.splice(index, 1)
    }
  }

  removeOnlineUser(id) {
    delete this.onlineUsers[id]
  }
}

class Store {
  // state
  constructor() {
    this.connectedUser = null
    this.chartID = null
  }

  // getters
  getConnectedUser() {
    return this.connectedUser
  }

  getConnectedUserID() {
    return this.connectedUser.id
  }

  getChartID() {
    return this.chartID
  }

  // mutations
  setConnectedUser(user) {
    this.connectedUser = user
  }

  setChartID(id) {
    this.chartID = id
  }

  removeChartID() {
    this.chartID = null
  }
}

module.exports = { GlobalStore, Store }
