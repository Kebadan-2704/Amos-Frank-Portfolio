// Amos Frank — Complete Track & Video Data
// All YouTube video IDs and Spotify track IDs

export const youtubeVideos = [
  { id: 'Rppzop-SUy4', title: 'Arpudhamaana Naamame', artist: 'Benny John Joseph', category: 'original' },
  { id: 'XYZawVrF3z4', title: 'Vetkapattupovathillai', artist: 'Zac Robert', category: 'original' },
  { id: '8IqgN-P8-y0', title: 'Paaduvaen En Yesuvai', artist: 'Messiah Dasan', category: 'original' },
  { id: 'Ut-Z__gnqXo', title: 'Hosanna', artist: 'Abikumar', category: 'original' },
  { id: '57kvacDyP3w', title: 'Praise - Elevation Worship', artist: 'Life Room Music', category: 'cover' },
  { id: 'ztA2OHbKuhk', title: 'MASIHA', artist: 'Merlyn Salvadi', category: 'original' },
  { id: 'Ip9O1_buM2E', title: 'Aasmaan', artist: 'The Non Violinist Project', category: 'featured' },
  { id: 'IJUl1JqAlxE', title: 'Kaathiru', artist: 'Abikumar', category: 'original' },
  { id: 'EdImPdsXJUc', title: 'Sthuthincheda', artist: 'Merge Music', category: 'original' },
  { id: '3156_SWKB0k', title: 'Melana Naamame', artist: 'Freddy John Samuel', category: 'original' },
  { id: 'E-KysKHJ6Kw', title: 'Thooyar Neer Endrum', artist: 'Zac Robert', category: 'original' },
  { id: 'vAVJkIsyGTM', title: 'Thedi Poguthe', artist: 'Shravan Sridhar', category: 'featured' },
  { id: 'SFOowRQEj3o', title: 'BHAAGO', artist: 'Merlyn Salvadi', category: 'original' },
  { id: '7Moh-N2j6_I', title: 'Maruvalenu / Nee Balidhanamu', artist: 'Merge Music', category: 'original' },
  { id: '-hXYTjnXExM', title: 'Lovely Lord', artist: 'CRC | Petra Cover', category: 'cover' },
  { id: 'ZQ_mHFdORxk', title: 'En Nilalaaneerae', artist: 'Messiah Dasan', category: 'original' },
  { id: 'wIT5EjP6deg', title: 'En Parigaari (Healer)', artist: 'Hallelujah Tower', category: 'original' },
  { id: 'sxw14GszsXs', title: 'Ratchagar Yesu Piranthar', artist: 'Christmas Song', category: 'original' },
  { id: '68YxWgyHYDU', title: 'Solven Yesu', artist: 'Zac Robert', category: 'cover' },
  { id: 'ks6O1efBtbQ', title: 'Right On Time', artist: 'Life Room Music', category: 'cover' },
  { id: '_5JfSO43QCM', title: 'Shubhavela', artist: 'Merge Music', category: 'original' },
  { id: 'e1wZPZcflfA', title: 'ELSHADDAI', artist: 'Freddy John Samuel', category: 'original' },
  { id: '78rLQG1N30k', title: 'Chattan Telugu', artist: 'Merge Music', category: 'original' },
  { id: '6AHXzg_WsEE', title: 'Everybody x Sa Re Ga Me', artist: 'The Non Violinist Project', category: 'featured' },
  { id: 'dwBXAv61_hQ', title: 'Saadhyame', artist: 'Merge Music', category: 'original' },
  { id: 'KWGA-SkhD8c', title: 'The Ultimate Bollywood Retro', artist: 'The Non Violinist Project', category: 'featured' },
];

// Spotify tracks
export const spotifyTracks = [
  { id: '1SEM8M8RDyH8Qt5E5eTwMy', title: 'Tere Saath' },
  { id: '6oAD86UAm9STeojYu2HhGp', title: 'Ennai Yetrarulum Yesuve' },
  { id: '2CFMpOyaT4MCAXzKONIvrI', title: 'Arpanithaen' },
];

export const featuredVideoId = 'Rppzop-SUy4';

export const artistInfo = {
  name: 'Amos Frank',
  tagline: 'Teacher, Guitarist & Music Producer',
  role: 'Teacher',
  roles: ['Music Producer', 'Performer', 'Teacher'],
  bio: ` A music producer, performer, and educator with over 20 years of musical experience. I started my journey at the age of 10 and have been performing professionally for over 11 years across a wide range of genres.\n\nI specialize in keyboard, bass guitar, and music production, and I’m passionate about creating music that connects—whether it’s on stage, in the studio, or in the classroom.`,
  bioExtended: `Inspired by artists like Snarky Puppy, Cory Henry, Jacob Collier, Bruno Mars, and Israel Houghton, my style blends groove, harmony, and modern production.\n\nThrough my music school, Musik Hub, I help students grow into confident, creative musicians while also working with artists and clients to bring their musical ideas to life.`,
  stats: {
    tracks: 29,
    videos: 26,
    spotifyTracks: 3,
    yearsPerforming: 11,
    yearsActive: 20,
  },
  social: {
    instagram: 'https://www.instagram.com/amosfrank.wav',
    musikHub: 'https://www.instagram.com/musikhub.in',
  },
  contact: {
    email: 'iamamosfrank.v@gmail.com',
    phone: '+91 7708913686',
    location: 'Coimbatore, Tamil Nadu, India',
  },
  photos: {
    hero: '/amos-hero.jpg',
    about: '/amos-stage-bw.jpg',
    bass: '/amos-bass.jpg',
    keys: '/amos-keys.jpg',
  },
};

export const getThumbnail = (videoId, quality = 'hqdefault') => {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};
