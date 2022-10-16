const tr = {
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
  },
  Navbar: {
    Home: 'Ana Sayfa',
    CreateRoom: 'Oda Kur',
    WarRooms: 'Savaş Odaları',
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
}

module.exports = tr
