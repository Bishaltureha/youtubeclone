import Config from 'react-native-config';

const API_KEY = Config.API_KEY;
const BASE_URL = Config.BASE_URL;
const SERVER_URL = Config.SERVER_URL;

async function fetchVideoIdsFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const data = await response.json();
    return data.success ? data.data.map(item => item.videoId) : [];
  } catch (error) {
    console.error('Failed to fetch IDs from server:', error);
    return [];
  }
}

async function fetchVideoDetailsFromYouTube(videoIds) {
  if (videoIds.length === 0) return [];
  try {
    const response = await fetch(
      `${BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(
        ',',
      )}&key=${API_KEY}`,
    );
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('YouTube API error:', error);
    return [];
  }
}

// 3️⃣ Combined function
export async function fetchVideos() {
  const videoIds = await fetchVideoIdsFromServer();
  const videos = await fetchVideoDetailsFromYouTube(videoIds);
  return videos;
}
