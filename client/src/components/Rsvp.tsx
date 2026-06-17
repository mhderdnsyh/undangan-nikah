import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import styles from './Rsvp.module.css';

export default function Rsvp() {
  const [guestName, setGuestName] = useState('');
  const [status, setStatus] = useState<'hadir' | 'tidak_hadir'>('hadir');
  const [totalGuests, setTotalGuests] = useState(1);

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
          } else {
            setGuestName(decodeURIComponent(to).replace(/-/g, ' '));
          }
        })
        .catch(() => {
          setGuestName(decodeURIComponent(to).replace(/-/g, ' '));
        });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const waNumber = '62895322917105';
    let message = `Halo, saya *${guestName}* ingin mengonfirmasi bahwa saya akan *${status === 'hadir' ? 'Hadir' : 'Tidak Hadir'}* pada acara pernikahan Surya & Juni.`;
    
    if (status === 'hadir') {
      message += `\nJumlah Tamu: *${totalGuests}* orang.`;
    }
    message += `\n\nTerima kasih.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
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
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Konfirmasi</label>
          <div className={styles.statusWrapper}>
            <div 
              className={`${styles.statusCard} ${status === 'hadir' ? styles.statusCardActive : ''}`}
              onClick={() => setStatus('hadir')}
            >
              {status === 'hadir' && <Check size={16} />}
              Saya Hadir
            </div>
            <div 
              className={`${styles.statusCard} ${status === 'tidak_hadir' ? styles.statusCardActive : ''}`}
              onClick={() => setStatus('tidak_hadir')}
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
            />
          </motion.div>
        )}

        <button className={styles.submitBtn} type="submit" disabled={!guestName.trim()}>
          Kirim Konfirmasi via WhatsApp
        </button>
      </form>
    </motion.section>
  );
}
