const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); // Add this line to parse JSON request bodies

const talent = [
  {
    id: 1,
    name: 'John Doe',
    instrument: 'Guitar',
    genre: 'Rock',
    location: 'New York, NY',
    bio: 'Experienced rock guitarist with a passion for live performances.',
    rate: 75,
    availability: ['2025-07-18', '2025-07-19', '2025-07-25', '2025-07-26'],
    service_type: ['live performance', 'recording'],
    user_type: 'individual_artist',
    media: [
      { type: 'audio', url: 'https://example.com/audio1.mp3' },
      { type: 'video', url: 'https://example.com/video1.mp4' },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    instrument: 'Piano',
    genre: 'Classical',
    location: 'Los Angeles, CA',
    bio: 'Classically trained pianist available for weddings and events.',
    rate: 100,
    availability: ['2025-07-20', '2025-07-21', '2025-07-27'],
    service_type: ['live performance', 'teaching'],
    user_type: 'individual_artist',
    media: [
      { type: 'audio', url: 'https://example.com/audio2.mp3' },
    ],
  },
  {
    id: 3,
    name: 'Mike Johnson',
    instrument: 'Drums',
    genre: 'Jazz',
    location: 'Chicago, IL',
    bio: 'Jazz drummer with a knack for improvisation.',
    rate: 60,
    availability: ['2025-07-22', '2025-07-23', '2025-07-29'],
    service_type: ['live performance', 'recording'],
    user_type: 'individual_artist',
    media: [
      { type: 'video', url: 'https://example.com/video2.mp4' },
    ],
  },
  {
    id: 4,
    name: 'Sarah Lee',
    instrument: null,
    genre: 'Abstract',
    location: 'San Francisco, CA',
    bio: 'Visual artist specializing in live painting for events.',
    rate: 120,
    availability: ['2025-07-18', '2025-07-25'],
    service_type: ['visual art'],
    user_type: 'individual_artist',
    media: [
      { type: 'image', url: 'https://example.com/artwork1.jpg' },
    ],
  },
  {
    id: 5,
    name: 'David Chen',
    instrument: 'Violin',
    genre: 'Orchestral',
    location: 'Boston, MA',
    bio: 'Composer and violinist available for custom compositions and lessons.',
    rate: 90,
    availability: ['2025-07-19', '2025-07-26'],
    service_type: ['composing', 'teaching'],
    user_type: 'individual_artist',
    media: [
      { type: 'audio', url: 'https://example.com/composition1.mp3' },
    ],
  },
  {
    id: 6,
    name: 'The Rockers',
    instrument: null,
    genre: 'Classic Rock',
    location: 'New York, NY',
    bio: 'High-energy rock band ready to electrify your event.',
    rate: 500,
    availability: ['2025-07-20', '2025-07-27'],
    service_type: ['live performance'],
    user_type: 'band',
    members: ['John Doe (Guitar)', 'Jane Smith (Bass)', 'Mike Johnson (Drums)'],
    media: [
      { type: 'video', url: 'https://example.com/band_performance.mp4' },
    ],
  },
];

let bookings = []; // In-memory storage for bookings
let nextBookingId = 1;

app.get('/api/talent', (req, res) => {
  const { genre, instrument, location, service_type, user_type } = req.query;

  let filteredTalent = talent;

  if (genre) {
    filteredTalent = filteredTalent.filter(item =>
      item.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }

  if (instrument) {
    filteredTalent = filteredTalent.filter(item =>
      item.instrument && item.instrument.toLowerCase().includes(instrument.toLowerCase())
    );
  }

  if (location) {
    filteredTalent = filteredTalent.filter(item =>
      item.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  if (service_type) {
    filteredTalent = filteredTalent.filter(item =>
      item.service_type && item.service_type.some(service =>
        service.toLowerCase().includes(service_type.toLowerCase())
      )
    );
  }

  if (user_type) {
    filteredTalent = filteredTalent.filter(item =>
      item.user_type && item.user_type.toLowerCase() === user_type.toLowerCase()
    );
  }

  res.json(filteredTalent);
});

app.get('/api/talent/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const foundTalent = talent.find(item => item.id === id);

  if (foundTalent) {
    res.json(foundTalent);
  } else {
    res.status(404).send('Talent not found');
  }
});

app.put('/api/talent/:id/availability', (req, res) => {
  const id = parseInt(req.params.id);
  const { availability } = req.body;
  const talentIndex = talent.findIndex(item => item.id === id);

  if (talentIndex !== -1) {
    talent[talentIndex].availability = availability;
    res.json({ message: 'Availability updated successfully', talent: talent[talentIndex] });
  } else {
    res.status(404).send('Talent not found');
  }
});

app.post('/api/bookings', (req, res) => {
  const bookingDetails = { id: nextBookingId++, status: 'pending', ...req.body };
  bookings.push(bookingDetails);
  console.log('New booking request:', bookingDetails);
  res.status(201).json({ message: 'Booking request received', bookingDetails });
});

app.put('/api/bookings/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  const bookingIndex = bookings.findIndex(booking => booking.id === id);

  if (bookingIndex !== -1) {
    bookings[bookingIndex].status = status;
    console.log(`Booking ${id} status updated to: ${status}`);
    res.json({ message: 'Booking status updated', booking: bookings[bookingIndex] });
  } else {
    res.status(404).send('Booking not found');
  }
});

app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

let reviews = []; // In-memory storage for reviews
let nextReviewId = 1;

app.post('/api/reviews', (req, res) => {
  const reviewDetails = { id: nextReviewId++, ...req.body, created_at: new Date() };
  reviews.push(reviewDetails);
  console.log('New review submitted:', reviewDetails);
  res.status(201).json({ message: 'Review submitted successfully', reviewDetails });
});

app.get('/api/reviews/:talentId', (req, res) => {
  const talentId = parseInt(req.params.talentId);
  const talentReviews = reviews.filter(review => review.talentId === talentId);
  res.json(talentReviews);
});

let messages = []; // In-memory storage for messages
let nextMessageId = 1;

app.post('/api/messages', (req, res) => {
  const messageDetails = { id: nextMessageId++, ...req.body, created_at: new Date() };
  messages.push(messageDetails);
  console.log('New message sent:', messageDetails);
  res.status(201).json({ message: 'Message sent successfully', messageDetails });
});

app.get('/api/messages/:talentId', (req, res) => {
  const talentId = parseInt(req.params.talentId);
  const talentMessages = messages.filter(message => message.receiverId === talentId || message.senderId === talentId);
  res.json(talentMessages);
});

let musicUploads = []; // In-memory storage for music uploads
let nextMusicId = 1;

app.post('/api/music/upload', (req, res) => {
  const musicDetails = { id: nextMusicId++, ...req.body, uploaded_at: new Date() };
  musicUploads.push(musicDetails);
  console.log('New music upload:', musicDetails);
  res.status(201).json({ message: 'Music uploaded successfully', musicDetails });
});

let musicDistributions = []; // In-memory storage for music distributions
let nextDistributionId = 1;

app.post('/api/music/distribute', (req, res) => {
  const distributionDetails = { id: nextDistributionId++, ...req.body, distributed_at: new Date() };
  musicDistributions.push(distributionDetails);
  console.log('New music distribution request:', distributionDetails);
  res.status(201).json({ message: 'Music distribution initiated successfully', distributionDetails });
});

app.get('/api/music/analytics', (req, res) => {
  // Simulate some analytics data
  const analyticsData = {
    totalStreams: Math.floor(Math.random() * 100000),
    totalDownloads: Math.floor(Math.random() * 10000),
    platforms: {
      spotify: Math.floor(Math.random() * 50000),
      appleMusic: Math.floor(Math.random() * 30000),
      youtubeMusic: Math.floor(Math.random() * 20000),
    },
    topTracks: [
      { title: 'Song A', streams: Math.floor(Math.random() * 10000) },
      { title: 'Song B', streams: Math.floor(Math.random() * 8000) },
      { title: 'Song C', streams: Math.floor(Math.random() * 6000) },
    ],
  };
  res.json(analyticsData);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
