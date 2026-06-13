import { useEffect, useRef } from 'react';
import { Music, Music4 } from 'lucide-react';
import styles from './AudioPlayer.module.css';

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function AudioPlayer({ isPlaying, setIsPlaying }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isPlayingRef = useRef(isPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const audio = new Audio('/cinta-terakhir.mp3');
    audio.loop = true;
    audio.volume = 0.5;

    const handleError = () => {
      console.warn('Local file /cinta-terakhir.mp3 not found. Falling back to default instrumental.');
      // Prevent infinite loop if fallback also fails
      audio.removeEventListener('error', handleError);
      audio.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3';
      if (isPlayingRef.current) {
        audio.play().catch((err) => console.warn('Fallback play failed:', err));
      }
    };

    audio.addEventListener('error', handleError);
    audioRef.current = audio;

    return () => {
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.warn('Autoplay prevented or failed:', err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, setIsPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <button 
      className={`${styles.audioBtn} ${isPlaying ? styles.rotate : ''}`}
      onClick={togglePlay}
      aria-label="Toggle Music"
    >
      {isPlaying ? <Music size={20} /> : <Music4 size={20} style={{ opacity: 0.6 }} />}
    </button>
  );
}
