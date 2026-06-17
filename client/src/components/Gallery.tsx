import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Gallery.module.css';

const photos = [
  '/gallery/foto1.png',
  '/gallery/foto2.png',
  '/gallery/foto3.png',
  '/gallery/foto4.png',
  '/gallery/foto5.png',
  '/gallery/foto6.png'
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Close lightbox on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  // Disable scrolling when Lightbox is active
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedIndex]);

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <motion.section
      id="gallery"
      className={styles.section}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <motion.div className={styles.header} variants={itemVariants}>
        <Camera className={styles.icon} />
        <h2 className={styles.title}>Galeri Foto</h2>
        <div className={styles.divider}></div>
        <p className={styles.subtitle}>Momen-momen indah kebersamaan kami</p>
      </motion.div>

      <motion.div className={styles.grid} variants={containerVariants}>
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            className={styles.photoCard}
            variants={itemVariants}
            onClick={() => setSelectedIndex(index)}
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.975 }}
          >
            <div className={styles.imageWrapper}>
              <img
                src={photo}
                alt={`Prewedding Surya & Juni ${index + 1}`}
                loading="lazy"
                className={styles.image}
              />
              <div className={styles.overlay}>
                <span className={styles.overlayText}>Lihat Foto</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Dark background click handler */}
            <div className={styles.lightboxBg} onClick={() => setSelectedIndex(null)} />

            {/* Close Button */}
            <button
              className={styles.closeBtn}
              onClick={() => setSelectedIndex(null)}
              aria-label="Tutup Galeri"
            >
              <X size={28} />
            </button>

            {/* Navigation Buttons */}
            <button
              className={`${styles.navBtn} ${styles.prevBtn}`}
              onClick={handlePrev}
              aria-label="Foto Sebelumnya"
            >
              <ChevronLeft size={36} />
            </button>

            <button
              className={`${styles.navBtn} ${styles.nextBtn}`}
              onClick={handleNext}
              aria-label="Foto Selanjutnya"
            >
              <ChevronRight size={36} />
            </button>

            {/* Active Image Container */}
            <motion.div
              className={styles.activeImageWrapper}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              key={selectedIndex} // key changed ensures smooth framer-motion swap animation
            >
              <img
                src={photos[selectedIndex]}
                alt={`Prewedding Surya & Juni ${selectedIndex + 1}`}
                className={styles.activeImage}
              />
              <div className={styles.counter}>
                {selectedIndex + 1} / {photos.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
