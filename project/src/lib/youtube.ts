import axios from 'axios';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  duration: string;
}

export async function searchCourses(query: string, maxResults = 10): Promise<YouTubeVideo[]> {
  try {
    const response = await axios.get(`${YOUTUBE_API_URL}/search`, {
      params: {
        part: 'snippet',
        maxResults,
        q: `${query} course tutorial`,
        type: 'video',
        key: YOUTUBE_API_KEY,
      },
    });

    const videoIds = response.data.items.map((item: any) => item.id.videoId).join(',');
    const videosResponse = await axios.get(`${YOUTUBE_API_URL}/videos`, {
      params: {
        part: 'contentDetails,statistics',
        id: videoIds,
        key: YOUTUBE_API_KEY,
      },
    });

    return response.data.items.map((item: any, index: number) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      duration: videosResponse.data.items[index]?.contentDetails.duration || 'N/A',
    }));
  } catch (error) {
    console.error('Error fetching YouTube courses:', error);
    return [];
  }
}

export async function getPlaylistVideos(playlistId: string, maxResults = 50): Promise<YouTubeVideo[]> {
  try {
    const response = await axios.get(`${YOUTUBE_API_URL}/playlistItems`, {
      params: {
        part: 'snippet',
        maxResults,
        playlistId,
        key: YOUTUBE_API_KEY,
      },
    });

    return response.data.items.map((item: any) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      duration: 'N/A', // Would need another API call to get duration
    }));
  } catch (error) {
    console.error('Error fetching playlist videos:', error);
    return [];
  }
}