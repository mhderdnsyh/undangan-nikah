import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Mempelai from './components/Mempelai';
import Acara from './components/Acara';
import Gift from './components/Gift';
import Rsvp from './components/Rsvp';
import Ucapan from './components/Ucapan';
import AudioPlayer from './components/AudioPlayer';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

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

          {/* Prewedding photo gallery */}
          <Gallery />

          {/* Event details and Countdown */}
          <Acara />

          {/* Wedding Gift Section */}
          <Gift />

          {/* RSVP Form */}
          <Rsvp />

          {/* Wishes Board */}
          <Ucapan />

          {/* Footer details */}
          <Footer />
        </main>
      )}
    </>
  );
}
