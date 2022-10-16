const en = {
  Default: {
    Messages: 'Messages',
    Friends: 'Friends',
    Users: 'Users',
  },
  Notification: {
    FriendshipRequest: 'Friend request',
    Pending: 'pending',
    Accepted: 'accepted',
    Declined: 'declined',
    Sent: (user, time) => `Sent ${time} by ${user}`,
    YouSent: (user, time) => `You sent to ${user} ${time}`,
    NotFound: 'You have no notification',
  },
  Navbar: {
    Home: 'Home',
    CreateRoom: 'Create Room',
    WarRooms: 'War Rooms',
  },
  CreateRoom: {
    Public: 'Create a game',
    Private: 'Play with a friend',
    Ai: 'Play with the computer',
    TimeControl: 'Time Control',
    RealTime: 'Real Time',
    Unlimited: 'Unlimited',
    MinutesPerSide: 'Minutes per side:',
    IncrementInSeconds: 'Increment in seconds:',
    RandomSide: 'Random side',
    Black: 'Black',
    White: 'White',
  },
  Rooms: {
    Player: 'Player',
    Rating: 'Rating',
    Time: 'Time',
    Join: 'Join',
    NotFound: 'No matching records found',
  },
  UserMenu: {
    Profile: 'Profile',
    Settings: 'Settings',
    Logout: 'Logout',
  },
  Profile: {
    MemberSince: 'Member since',
    Active: 'Active',
    Rating: 'Rating',
    TotalMatch: 'Total match',
    Win: 'Win',
    Draw: 'Draw',
    Lose: 'Lose',
  },
}

module.exports = en
