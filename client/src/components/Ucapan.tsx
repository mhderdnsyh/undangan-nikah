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
    // 1. Fetch guest name from query param as default sender name
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    if (to) {
      fetch(`/api/guests/${to}`)
        .then((res) => {
          if (!res.ok) throw new Error('Guest not found');
          return res.json();
        })
        .then((resJson) => {
          if (resJson.success && resJson.data?.name) {
            setSenderName(resJson.data.name);
          } else {
            setSenderName(decodeURIComponent(to).replace(/-/g, ' '));
          }
        })
        .catch(() => {
          setSenderName(decodeURIComponent(to).replace(/-/g, ' '));
        });
    }

    // 2. Fetch wishes board
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      const res = await fetch('/api/wishes');
      const result = await res.json();
      if (result.success && result.data) {
        // Sort wishes by id descending (newest first)
        const sorted = [...result.data].sort((a: Wish, b: Wish) => b.id - a.id);
        setWishes(sorted);
      }
    } catch (err) {
      console.error('Failed to fetch wishes:', err);
    } finally {
      setLoadingWishes(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) return;

    setSubmitting(true);

    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderName, message }),
      });

      const result = await res.json();

      if (result.success) {
        // Optimistic / Real-time local state update so it pops up instantly
        const newWish: Wish = {
          id: Date.now(), // temporary id
          senderName,
          message,
          createdAt: new Date().toISOString(),
        };
        setWishes((prev) => [newWish, ...prev]);
        setMessage(''); // Clear message area
      } else {
        throw new Error(result.message || 'Gagal mengirim ucapan');
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Gagal mengirim ucapan, silakan coba lagi.');
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
