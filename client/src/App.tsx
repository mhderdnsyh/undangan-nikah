import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Mempelai from './components/Mempelai';
import Acara from './components/Acara';
import Gift from './components/Gift';
import Rsvp from './components/Rsvp';
import Ucapan from './components/Ucapan';
import AudioPlayer from './components/AudioPlayer';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Prevent scrolling when cover is active
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setIsPlaying(true);
  };

  return (
    <>
      {/* 1. Cover / Hero Page overlay */}
      <Hero onOpen={handleOpenInvitation} isOpen={isOpen} />

      {/* 2. Floating Audio Player (visible only when invitation is open) */}
      {isOpen && (
        <AudioPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      )}

      {/* 3. Main Content Sections */}
      {isOpen && (
        <main className="container">
          {/* Couple profiles */}
          <Mempelai />

          {/* Event details and Countdown */}
          <Acara />

          {/* Wedding Gift Section */}
          <Gift />

          {/* RSVP Form */}
          <Rsvp />

          {/* Wishes Board */}
          <Ucapan />

          {/* Footer details */}
          <footer className="text-center" style={{ padding: '40px 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <p>Terima kasih atas doa restu Anda.</p>
            <p style={{ marginTop: '10px', opacity: 0.6 }}>Made with ♥ for Surya &amp; Juni</p>
          </footer>
        </main>
      )}
    </>
  );
}
