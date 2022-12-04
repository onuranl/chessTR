const en = {
  Auth: {
    Welcome: 'Welcome to <b>ChessTR</b>',
    Username: 'Username',
    Email: 'Email',
    Password: 'Password',
    LoginLabel: 'Login',
    Login: {
      RememberMe: 'Remember me',
      NewHere: 'New here ?',
      CreateNewAccount: 'Create New Account',
    },
    Register: {
      CreateAccount: 'Create Account',
      YouAreHere: 'You are here ?',
    },
  },
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
    Successful: 'Successful',
    RequestSuccessfullySent: 'Your friend request has been sent successfully',
    RequestAccepted: 'Your friend request has been accepted',
    FriendsNow: (user) => `You are now friends with ${user}`
  },
  Navbar: {
    Home: 'Home',
    CreateRoom: 'Create Room',
    WarRooms: 'War Rooms',
    ActiveMatches: 'Active Matches',
    Login: 'Login',
    GetStarted: 'Get Started',
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
  ActiveMatches: {
    NoOpponent: 'no opponent',
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
  Settings: {
    UserInformation: 'User information',
    Links: 'Links',
    Username: 'Username',
    Email: 'Email',
  },
}

module.exports = en
