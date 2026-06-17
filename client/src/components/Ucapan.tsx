import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Send } from 'lucide-react';
import styles from './Ucapan.module.css';

interface Wish {
  id: number;
  senderName: string;
  message: string;
  createdAt: string;
}

export default function Ucapan() {
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loadingWishes, setLoadingWishes] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // 1. Get guest name from query param as default sender name
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    if (to) {
      setSenderName(decodeURIComponent(to).replace(/-/g, ' '));
    }

    // 2. Load dummy wishes since we are fully static now
    fetchWishes();
  }, []);

  const fetchWishes = () => {
    setWishes([
      {
        id: 2,
        senderName: "Budi & Keluarga",
        message: "Selamat menempuh hidup baru Surya & Juni. Semoga menjadi keluarga yang bahagia selalu.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()
      },
      {
        id: 1,
        senderName: "Andi (Sahabat)",
        message: "Lancar sampai hari H ya! Bahagia selalu untuk kalian berdua.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
      }
    ]);
    setLoadingWishes(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) return;

    setSubmitting(true);

    try {
      const waMessage = `Halo, saya *${senderName}* ingin memberikan ucapan & doa untuk pernikahan kalian:

"${message}"

Selamat berbahagia!`;
      
      const encodedMessage = encodeURIComponent(waMessage);
      const waNumber = '62895322917105'; // Real WhatsApp number
      
      window.open(`https://wa.me/${waNumber}?text=${encodedMessage}`, '_blank');

      // Optimistic local state update so it pops up instantly on their screen
      const newWish: Wish = {
        id: Date.now(),
        senderName,
        message,
        createdAt: new Date().toISOString(),
      };
      setWishes((prev) => [newWish, ...prev]);
      setMessage('');
    } catch (err) {
      alert('Terjadi kesalahan saat membuka WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  // Simple relative time formatting helper
  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffMins < 1) return 'Baru saja';
      if (diffMins < 60) return `${diffMins} menit yang lalu`;
      if (diffHours < 24) return `${diffHours} jam yang lalu`;
      if (diffDays < 7) return `${diffDays} hari yang lalu`;

      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  return (
    <motion.section 
      className={styles.section}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
    >
      <h2 className={styles.title}>Ucapan &amp; Doa</h2>
      <p className={styles.description}>
        Berikan ucapan selamat dan doa restu kepada kedua mempelai.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="senderName">Nama Anda</label>
          <input 
            type="text" 
            id="senderName"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Tuliskan nama Anda"
            required
            disabled={submitting}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="message">Ucapan / Doa</label>
          <textarea 
            id="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tuliskan ucapan dan doa terbaik Anda di sini..."
            required
            disabled={submitting}
          />
        </div>

        <button className={styles.submitBtn} type="submit" disabled={submitting || !senderName.trim() || !message.trim()}>
          {submitting ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Mengirim...
            </>
          ) : (
            <>
              <Send size={16} />
              Kirim Ucapan
            </>
          )}
        </button>
      </form>

      <div className={styles.wishesList}>
        {loadingWishes ? (
          <div className="flex justify-center" style={{ padding: '40px 0' }}>
            <Loader2 className="animate-spin" size={24} style={{ color: 'var(--accent-color)' }} />
          </div>
        ) : wishes.length === 0 ? (
          <p className={styles.emptyState}>Belum ada ucapan. Jadilah yang pertama memberikan doa restu!</p>
        ) : (
          <AnimatePresence>
            {wishes.map((wish) => (
              <motion.div 
                className={styles.wishCard} 
                key={wish.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.senderName}>{wish.senderName}</div>
                <div className={styles.message}>{wish.message}</div>
                <div className={styles.date}>{formatTime(wish.createdAt)}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.section>
  );
}
