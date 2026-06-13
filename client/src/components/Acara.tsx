import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';
import styles from './Acara.module.css';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Acara() {
  const targetDate = '2026-06-26T09:00:00'; // Target wedding date
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.section 
      className={styles.section}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <h2 className={styles.title}>Hari Bahagia</h2>

      <div className={styles.countdownWrapper}>
        <div className={styles.countdownCard}>
          <span className={styles.number}>{timeLeft.days}</span>
          <span className={styles.label}>Hari</span>
        </div>
        <div className={styles.countdownCard}>
          <span className={styles.number}>{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className={styles.label}>Jam</span>
        </div>
        <div className={styles.countdownCard}>
          <span className={styles.number}>{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className={styles.label}>Menit</span>
        </div>
        <div className={styles.countdownCard}>
          <span className={styles.number}>{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className={styles.label}>Detik</span>
        </div>
      </div>

      <div className={styles.eventsGrid}>
        <motion.div className={styles.eventCard} variants={itemVariants}>
          <h3 className={styles.eventTitle}>
            <Calendar size={20} />
            Akad Nikah
          </h3>
          <div className={styles.time}>
            <Clock size={16} />
            <span>09:00 WIB - Selesai</span>
          </div>
          <div className={styles.location}>
            <MapPin size={16} />
            <span className={styles.locationName}>Masjid Agung Baiturrahman</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Jl. Pahlawan No. 10, Kota Semarang
          </p>
          <a 
            href="https://maps.google.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.mapLink}
          >
            <Navigation size={14} />
            Petunjuk Lokasi
          </a>
        </motion.div>

        <motion.div className={styles.eventCard} variants={itemVariants}>
          <h3 className={styles.eventTitle}>
            <Calendar size={20} />
            Resepsi
          </h3>
          <div className={styles.time}>
            <Clock size={16} />
            <span>11:00 WIB - 16:00 WIB</span>
          </div>
          <div className={styles.location}>
            <MapPin size={16} />
            <span className={styles.locationName}>Gedung Grand Ballroom Elegance</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Jl. Pemuda No. 45, Kota Semarang
          </p>
          <a 
            href="https://maps.google.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.mapLink}
          >
            <Navigation size={14} />
            Petunjuk Lokasi
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
