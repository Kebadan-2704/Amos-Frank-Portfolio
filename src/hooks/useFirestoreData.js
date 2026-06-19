import { useState, useEffect } from 'react';
import { db } from '../firebase';

// Static data imports as fallbacks
import {
  youtubeVideos as staticVideos,
  spotifyTracks as staticSpotify,
  featuredVideoId as staticFeaturedId,
  artistInfo as staticArtistInfo,
} from '../data/tracks';

/**
 * Hook that reads data from Firestore and falls back to static data if:
 * - Firebase is not configured (db is null)
 * - Firestore fetch fails (network error, etc.)
 * - Collection is empty
 */

// Cache to avoid refetching on every component mount
const cache = {};

export const useFirestoreData = () => {
  const [data, setData] = useState({
    youtubeVideos: staticVideos,
    spotifyTracks: staticSpotify,
    featuredVideoId: staticFeaturedId,
    artistInfo: staticArtistInfo,
    testimonials: null, // null = use component's own static data
    latestNews: null,
    settings: null,
    loading: true,
  });

  useEffect(() => {
    // If Firebase is not configured, use static data immediately
    if (!db) {
      setData((prev) => ({ ...prev, loading: false }));
      return;
    }

    // If we already cached, use cache
    if (cache._loaded) {
      setData({ ...cache, loading: false });
      return;
    }

    const fetchAll = async () => {
      try {
        const { collection, doc, getDocs, getDoc, query, orderBy } = await import('firebase/firestore');

        // Fetch all collections in parallel
        const [videosSnap, spotifySnap, testimonialsSnap, newsSnap, artistSnap, settingsSnap] = await Promise.all([
          getDocs(query(collection(db, 'youtube_videos'), orderBy('order', 'asc'))),
          getDocs(query(collection(db, 'spotify_tracks'), orderBy('order', 'asc'))),
          getDocs(query(collection(db, 'testimonials'), orderBy('order', 'asc'))),
          getDocs(query(collection(db, 'latest_news'), orderBy('order', 'asc'))),
          getDoc(doc(db, 'artist_info', 'profile')),
          getDoc(doc(db, 'site_settings', 'general')),
        ]);

        const videos = videosSnap.docs.map((d) => d.data());
        const spotify = spotifySnap.docs.map((d) => d.data());
        const testimonials = testimonialsSnap.docs.map((d) => d.data());
        const news = newsSnap.docs.map((d) => d.data());
        const artist = artistSnap.exists() ? artistSnap.data() : null;
        const settings = settingsSnap.exists() ? settingsSnap.data() : null;

        // Build merged artistInfo from Firestore data
        const mergedArtist = artist ? {
          ...staticArtistInfo,
          name: artist.name || staticArtistInfo.name,
          tagline: artist.tagline || staticArtistInfo.tagline,
          role: artist.role || staticArtistInfo.role,
          roles: artist.roles || staticArtistInfo.roles,
          bio: artist.bio || staticArtistInfo.bio,
          bioExtended: artist.bioExtended || staticArtistInfo.bioExtended,
          photos: {
            hero: artist.heroPhoto || staticArtistInfo.photos.hero,
            about: artist.aboutPhoto || staticArtistInfo.photos.about,
            bass: artist.bassPhoto || staticArtistInfo.photos.bass,
            keys: artist.keysPhoto || staticArtistInfo.photos.keys,
          },
          stats: settings ? {
            tracks: settings.tracks ?? staticArtistInfo.stats.tracks,
            videos: settings.videos ?? staticArtistInfo.stats.videos,
            spotifyTracks: settings.spotifyTracks ?? staticArtistInfo.stats.spotifyTracks,
            yearsPerforming: settings.yearsPerforming ?? staticArtistInfo.stats.yearsPerforming,
            yearsActive: settings.yearsActive ?? staticArtistInfo.stats.yearsActive,
          } : staticArtistInfo.stats,
          contact: settings ? {
            email: settings.email || staticArtistInfo.contact.email,
            phone: settings.phone || staticArtistInfo.contact.phone,
            location: settings.location || staticArtistInfo.contact.location,
          } : staticArtistInfo.contact,
          social: settings ? {
            instagram: settings.instagram || staticArtistInfo.social.instagram,
            musikHub: settings.musikHub || staticArtistInfo.social.musikHub,
          } : staticArtistInfo.social,
        } : staticArtistInfo;

        const result = {
          youtubeVideos: videos.length > 0 ? videos : staticVideos,
          spotifyTracks: spotify.length > 0 ? spotify : staticSpotify,
          featuredVideoId: settings?.featuredVideoId || staticFeaturedId,
          artistInfo: mergedArtist,
          testimonials: testimonials.length > 0 ? testimonials : null,
          latestNews: news.length > 0 ? news : null,
          settings,
          loading: false,
          _loaded: true,
        };

        // Cache the result
        Object.assign(cache, result);
        setData(result);
      } catch (err) {
        console.warn('Firestore fetch failed, using static data:', err.message);
        setData((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchAll();
  }, []);

  return data;
};
