import { useEffect, useRef } from 'react';
import { Music, Music4 } from 'lucide-react';
import styles from './AudioPlayer.module.css';

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function AudioPlayer({ isPlaying, setIsPlaying }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Soft piano ambient music
    audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
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
