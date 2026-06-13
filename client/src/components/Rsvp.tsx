import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCircle2, Loader2, XCircle } from 'lucide-react';
import styles from './Rsvp.module.css';

export default function Rsvp() {
  const [guestName, setGuestName] = useState('');
  const [guestId, setGuestId] = useState<number | null>(null);
  const [status, setStatus] = useState<'hadir' | 'tidak_hadir'>('hadir');
  const [totalGuests, setTotalGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    
    if (to) {
      fetch(`/api/guests/${to}`)
        .then((res) => {
          if (!res.ok) throw new Error('Guest not found');
          return res.json();
        })
        .then((resJson) => {
          if (resJson.success && resJson.data) {
            setGuestName(resJson.data.name);
            setGuestId(resJson.data.id);
          } else {
            setGuestName(decodeURIComponent(to).replace(/-/g, ' '));
          }
        })
        .catch(() => {
          setGuestName(decodeURIComponent(to).replace(/-/g, ' '));
        });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    setLoading(true);
    setResponseMsg(null);

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guestName,
          guestId: guestId || null,
          status,
          totalGuests: status === 'hadir' ? totalGuests : undefined,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setResponseMsg({
          type: 'success',
          text: 'Konfirmasi RSVP berhasil dikirim. Terima kasih atas konfirmasi Anda!',
        });
      } else {
        throw new Error(result.message || 'Gagal mengirim RSVP');
      }
    } catch (err) {
      setResponseMsg({
        type: 'error',
        text: err instanceof Error ? err.message : 'Koneksi internet bermasalah, silakan coba lagi.',
      });
    } finally {
      setLoading(false);
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
      <h2 className={styles.title}>Konfirmasi Kehadiran</h2>
      <p className={styles.description}>
        Mohon konfirmasikan kehadiran Anda sebelum tanggal pelaksanaan untuk memudahkan kami mempersiapkan acara.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="guestName">Nama Anda</label>
          <input 
            type="text" 
            id="guestName"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Tuliskan nama lengkap Anda"
            required
            disabled={loading}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Konfirmasi</label>
          <div className={styles.statusWrapper}>
            <div 
              className={`${styles.statusCard} ${status === 'hadir' ? styles.statusCardActive : ''}`}
              onClick={() => !loading && setStatus('hadir')}
            >
              {status === 'hadir' && <Check size={16} />}
              Saya Hadir
            </div>
            <div 
              className={`${styles.statusCard} ${status === 'tidak_hadir' ? styles.statusCardActive : ''}`}
              onClick={() => !loading && setStatus('tidak_hadir')}
            >
              {status === 'tidak_hadir' && <Check size={16} />}
              Tidak Hadir
            </div>
          </div>
        </div>

        {status === 'hadir' && (
          <motion.div 
            className={styles.formGroup}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <label className={styles.label} htmlFor="totalGuests">Jumlah Tamu</label>
            <input 
              type="number" 
              id="totalGuests"
              min={1}
              max={10}
              value={totalGuests}
              onChange={(e) => setTotalGuests(parseInt(e.target.value) || 1)}
              required
              disabled={loading}
            />
          </motion.div>
        )}

        <button className={styles.submitBtn} type="submit" disabled={loading || !guestName.trim()}>
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Mengirim...
            </>
          ) : (
            'Kirim Konfirmasi'
          )}
        </button>
      </form>

      {responseMsg && (
        <div className="flex justify-center">
          <div className={`${styles.feedback} ${responseMsg.type === 'success' ? styles.success : styles.error}`}>
            <span className="flex items-center gap-6 justify-center">
              {responseMsg.type === 'success' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
              {responseMsg.text}
            </span>
          </div>
        </div>
      )}
    </motion.section>
  );
}
