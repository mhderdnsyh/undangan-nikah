import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen } from 'lucide-react';
import styles from './Hero.module.css';

interface HeroProps {
  onOpen: () => void;
  isOpen: boolean;
}

export default function Hero({ onOpen, isOpen }: HeroProps) {
  const [guestName, setGuestName] = useState<string>('');
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    
    if (to) {
      // Fetch official name from backend if slug is provided
      fetch(`/api/guests/${to}`)
        .then((res) => {
          if (!res.ok) throw new Error('Guest not found');
          return res.json();
        })
        .then((resJson) => {
          if (resJson.success && resJson.data?.name) {
            setGuestName(resJson.data.name);
          } else {
            // Fallback: decode slug directly
            setGuestName(decodeURIComponent(to).replace(/-/g, ' '));
          }
        })
        .catch(() => {
          // Fallback on error
          setGuestName(decodeURIComponent(to).replace(/-/g, ' '));
        });
    }
  }, []);

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className={styles.heroOverlay}
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100vh',
            opacity: 0,
            transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] } 
          }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col items-center justify-center text-center"
          >
            <span className={styles.subtitle}>Undangan Pernikahan</span>
            <h1 className={styles.title}>Lambok &amp; Juni</h1>
            <p style={{ fontStyle: 'italic', marginBottom: '30px', color: 'var(--text-muted)' }}>
              Jumat, 26 Juni 2026
            </p>
            
            <div className={styles.guestSection}>
              <p className={styles.toText}>Kepada Yth. Bapak/Ibu/Saudara/i</p>
              <h3 className={styles.guestName}>{guestName || 'Tamu Undangan'}</h3>
            </div>

            <button className={styles.openBtn} onClick={onOpen}>
              <MailOpen size={18} />
              Buka Undangan
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
