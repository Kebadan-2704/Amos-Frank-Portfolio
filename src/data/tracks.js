// Amos Frank — Complete Track & Video Data with REAL titles
// All YouTube video IDs and Spotify track IDs

export const youtubeVideos = [
  { id: 'Ip9O1_buM2E', title: 'Aasmaan - The Non Violinist Project', artist: 'SoundChk S02 | Merchant Records', category: 'featured' },
  { id: 'vAVJkIsyGTM', title: 'Thedi Poguthe', artist: 'Shravan Sridhar ft. Dev & Alisha', category: 'featured' },
  { id: 'KWGA-SkhD8c', title: 'The Ultimate Bollywood Retro Medley', artist: 'The Non Violinist Project | Forte Series', category: 'featured' },
  { id: '6AHXzg_WsEE', title: 'Everybody x Sa Re Ga Me', artist: 'Backstreet Boys x AR Rahman', category: 'featured' },
  { id: 'ztA2OHbKuhk', title: 'MASIHA', artist: 'Hindi Christmas Song 2024', category: 'original' },
  { id: 'EdImPdsXJUc', title: 'Sthuthincheda', artist: 'Gyan Swaroop | Merge Music', category: 'original' },
  { id: 'SFOowRQEj3o', title: 'BHAAGO', artist: 'Merlyn Salvadi ft. Allen Ganta', category: 'original' },
  { id: '-hXYTjnXExM', title: 'Lovely Lord', artist: 'Petra | Cover', category: 'cover' },
  { id: '_5JfSO43QCM', title: 'Shubhavela', artist: 'Gyan Swaroop & Joel Johnson | Merge Music', category: 'original' },
  { id: 'dwBXAv61_hQ', title: 'Saadhyame', artist: 'Official Music Video', category: 'original' },
  { id: '78rLQG1N30k', title: 'Chattan (Telugu Version)', artist: 'Gyan Swaroop & Joel Johnson | Merge Music', category: 'original' },
  { id: '7Moh-N2j6_I', title: 'Nee Balidhanamu', artist: 'Gyan Swaroop | Merge Music', category: 'original' },
  { id: '57kvacDyP3w', title: 'Praise - Elevation Worship', artist: 'Acoustic Cover | Life Room Music', category: 'cover' },
  { id: 'ks6O1efBtbQ', title: 'Right On Time', artist: 'Cover | Life Room Music', category: 'cover' },
  { id: 'Rppzop-SUy4', title: 'Arpudhamaana Naamame', artist: 'Benny John Joseph | Zac Robert', category: 'original' },
  { id: 'IJUl1JqAlxE', title: 'Kaathiru', artist: 'Abikumar | Official Video 4K', category: 'original' },
  { id: 'wIT5EjP6deg', title: 'Healer (Tamil)', artist: 'Glady Paul | Hallelujah Tower', category: 'original' },
  { id: 'ZQ_mHFdORxk', title: 'En Nilalaaneerae', artist: 'Messiah Dasan | Amos Frank | Joshua Twills', category: 'original' },
  { id: 'Ut-Z__gnqXo', title: 'Hosanna', artist: 'Abikumar | Tamil Christian Song', category: 'original' },
  { id: '3156_SWKB0k', title: 'Melana Naamame', artist: 'Freddy John Samuel', category: 'original' },
  { id: 'sxw14GszsXs', title: 'Ratchagar Yesu Piranthar', artist: 'Christmas Song 2023', category: 'original' },
  { id: 'E-KysKHJ6Kw', title: 'Thooyar Neer Endrum', artist: 'Zac Robert | Glady Paul | Sarah Evangeline', category: 'original' },
  { id: 'e1wZPZcflfA', title: 'ELSHADDAI', artist: 'Freddy John Samuel', category: 'original' },
  { id: '68YxWgyHYDU', title: 'Solven Yesu (I Speak Jesus)', artist: 'Zac Robert | Sarah Evangeline | Glady Paul', category: 'cover' },
  { id: 'UpmBSklWqWA', title: 'Ennai Kaanbavar Neerae', artist: 'Prince Daniel', category: 'original' },
  { id: 'aBzigsJPHvk', title: 'Nantri Yesaiya', artist: 'Prince Daniel & Christy Joel', category: 'original' },
  { id: '8IqgN-P8-y0', title: 'Paaduvaen En Yesuvai', artist: 'Messiah Dasan | New Tamil Christian Song', category: 'original' },
  { id: 'XYZawVrF3z4', title: 'Vetkappatu Povadhillai', artist: 'Zac Robert', category: 'original' },
];

export const spotifyTracks = [
  { id: '1SEM8M8RDyH8Qt5E5eTwMy', title: 'Tere Saath' },
  { id: '2CFMpOyaT4MCAXzKONIvrI', title: 'Arpanithaen' },
  { id: '6oAD86UAm9STeojYu2HhGp', title: 'Ennai Yetrarulum Yesuve' },
];

export const featuredVideoId = 'Ip9O1_buM2E';

export const artistInfo = {
  name: 'Amos Frank',
  tagline: 'Musician, Singer & Violinist',
  role: 'Singer',
  roles: ['Musician', 'Violinist', 'Singer', 'Producer', 'Performer', 'Artist'],
  bio: `Amos Frank is a multi-talented Indian musician and violinist whose artistry bridges classical roots with contemporary expression. From performing in prestigious venues to producing chart-topping independent music, Amos brings a unique fusion of raw emotion and technical mastery to every performance.`,
  bioExtended: `A key member of The Non Violinist Project and a collaborator with artists across genres, Amos Frank has built an impressive catalog spanning original compositions, soulful covers, and groundbreaking fusion projects. With tracks featured across Spotify and YouTube, and performances that have captivated audiences worldwide, Amos's musical journey is defined by passion, innovation, and an unwavering commitment to artistic excellence.`,
  stats: {
    tracks: 30,
    videos: 28,
    spotifyTracks: 3,
    yearsActive: 5,
  },
  social: {
    youtube: 'https://www.youtube.com/@nonviolinistproject',
    spotify: 'https://open.spotify.com/artist/frankanna',
    instagram: 'https://www.instagram.com/frankanna_music/',
  },
  contact: {
    email: 'frankanna.music@gmail.com',
    phone: '+91 98765 43210',
    location: 'Chennai, India',
  },
};

export const getThumbnail = (videoId, quality = 'hqdefault') => {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};
