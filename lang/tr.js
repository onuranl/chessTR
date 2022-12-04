const tr = {
  Auth: {
    Welcome: "<b>ChessTR'ye</b> hoş geldin",
    Username: 'Kullanıcı ismi',
    Email: 'E-posta',
    Password: 'Şifre',
    LoginLabel: 'Giriş yap',
    Login: {
      RememberMe: 'Beni hatırla',
      NewHere: 'Yeni misin ?',
      CreateNewAccount: 'Yeni hesap oluştur',
    },
    Register: {
      CreateAccount: 'Hesap oluştur',
      YouAreHere: 'Üye misin ?',
    },
  },
  Default: {
    Messages: 'Mesajlar',
    Friends: 'Arkadaşlar',
    Users: 'Kullanıcılar',
  },
  Notification: {
    FriendshipRequest: 'Arkadaşlık isteği',
    Pending: 'bekliyor',
    Accepted: 'kabul edildi',
    Declined: 'reddeldi',
    Sent: (user, time) => `${user} tarafından ${time} gönderildi`,
    YouSent: (user, time) => `${user} kullanıcısına ${time} gönderdin`,
    NotFound: 'Bildirimin yok',
    Successful: 'Başarılı',
    RequestSuccessfullySent: 'Arkadaşlık isteği başarıyla gönderildi',
    RequestAccepted: 'Arkadaşlık isteğin kabul edildi',
    FriendsNow: (user) => `Artık ${user} ile arkadaşsınız`
  },
  Navbar: {
    Home: 'Ana Sayfa',
    CreateRoom: 'Oda Kur',
    WarRooms: 'Savaş Odaları',
    ActiveMatches: 'Aktif Maçlar',
    Login: 'Giriş Yap',
    GetStarted: 'Aramıza Katıl',
  },
  CreateRoom: {
    Public: 'Yeni bir oyun kur',
    Private: 'Bir arkadaşınla oyna',
    Ai: 'Bilgisayara karşı oyna',
    TimeControl: 'Süre ayarı',
    RealTime: 'Gerçek zaman',
    Unlimited: 'Sınırsız',
    MinutesPerSide: 'Taraf başına dakika:',
    IncrementInSeconds: 'Hamle başına eklenen saniye:',
    RandomSide: 'Rastgele renk',
    Black: 'Siyah',
    White: 'Beyaz',
  },
  Rooms: {
    Player: 'Oyuncu',
    Rating: 'Rating',
    Time: 'Zaman',
    Join: 'Katıl',
    NotFound: 'Hiçbir eşleşen kayıt bulunamadı',
  },
  ActiveMatches: {
    NoOpponent: 'rakip yok',
  },
  UserMenu: {
    Profile: 'Profil',
    Settings: 'Ayarlar',
    Logout: 'Çıkış yap',
  },
  Profile: {
    MemberSince: 'Üyelik Tarihi',
    Active: 'Aktif',
    Rating: 'Rating',
    TotalMatch: 'Oynanan oyun',
    Win: 'Galibiyet',
    Draw: 'Beraberlik',
    Lose: 'Mağlubiyet',
  },
  Settings: {
    UserInformation: 'Kullanıcı Bilgileri',
    Links: 'Bağlantılar',
    Username: 'Kullanıcı ismi',
    Email: 'E-posta',
  },
}

module.exports = tr
