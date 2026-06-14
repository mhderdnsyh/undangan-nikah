import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Copy, Check, Gift as GiftIcon, CreditCard, Smartphone } from 'lucide-react';
import styles from './Gift.module.css';

interface GiftMethod {
  id: string;
  provider: string;
  accountNumber: string;
  accountName: string;
  type: 'bank' | 'wallet';
}

export default function Gift() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form states
  const [nama, setNama] = useState('');
  const [namaBank, setNamaBank] = useState('BCA');
  const [nominal, setNominal] = useState('');
  const [ucapan, setUcapan] = useState('');
  const [fileBukti, setFileBukti] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const giftMethods: GiftMethod[] = [
    {
      id: 'bca',
      provider: 'BCA',
      accountNumber: '2200667266',
      accountName: 'Lambok Surya Rezeki Lumban Gaol',
      type: 'bank',
    },
    {
      id: 'dana',
      provider: 'DANA',
      accountNumber: '0895322917105',
      accountName: 'Lambok Surya Rezeki Lumban Gaol',
      type: 'wallet',
    },
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    }).catch((err) => {
      console.error('Failed to copy: ', err);
    });
  };

  const handleConfirmSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileBukti) {
      alert('Mohon unggah bukti transfer');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', fileBukti);

      const response = await fetch('/api/upload-proof', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        // Construct public URL, assuming backend runs on the same host or proxy
        const imageUrl = window.location.origin + data.data.url;
        
        const message = `Halo, saya ingin konfirmasi pengiriman kado pernikahan:

Nama: ${nama}
Bank Tujuan: ${namaBank}
Nominal: Rp ${nominal}
Ucapan: ${ucapan}

Bukti Transfer dapat dilihat di sini:
${imageUrl}`;

        const encodedMessage = encodeURIComponent(message);
        const waNumber = '62895322917105'; // Real WhatsApp number
        
        window.open(`https://wa.me/${waNumber}?text=${encodedMessage}`, '_blank');
        
        // Reset form
        setNama('');
        setNominal('');
        setUcapan('');
        setFileBukti(null);
      } else {
        alert('Gagal mengunggah bukti transfer: ' + data.message);
      }
    } catch (error) {
      console.error('Error uploading proof:', error);
      alert('Terjadi kesalahan saat mengunggah bukti transfer.');
    } finally {
      setIsLoading(false);
    }
  };

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
      id="gift"
    >
      <div className={styles.iconWrapper}>
        <GiftIcon size={40} className="floating-element" />
      </div>
      <h2 className={styles.title}>Kado Digital</h2>
      <p className={styles.subtitle}>
        Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberikan tanda kasih, Anda dapat mengirimkannya melalui rekening/e-wallet berikut:
      </p>

      <div className={styles.cardsGrid}>
        {giftMethods.map((method) => (
          <motion.div
            key={method.id}
            className={styles.giftCard}
            variants={itemVariants}
          >
            <div style={{ marginBottom: '15px', color: 'var(--accent-color)' }}>
              {method.type === 'bank' ? <CreditCard size={32} /> : <Smartphone size={32} />}
            </div>
            <h3 className={styles.providerName}>{method.provider}</h3>
            <span className={styles.accountNumber}>{method.accountNumber}</span>
            <span className={styles.accountName}>a.n. {method.accountName}</span>
            
            <button
              onClick={() => handleCopy(method.accountNumber, method.id)}
              className={`${styles.copyButton} ${copiedId === method.id ? styles.copied : ''}`}
            >
              {copiedId === method.id ? (
                <>
                  <Check size={16} />
                  <span>Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Salin Nomor</span>
                </>
              )}
            </button>
          </motion.div>
        ))}
      </div>

      <motion.div className={styles.formContainer} variants={itemVariants}>
        <h3 className={styles.formTitle}>Konfirmasi Kado</h3>
        <form onSubmit={handleConfirmSubmit}>
          <div className={styles.formGroup}>
            <label>Nama Anda</label>
            <input 
              type="text" 
              required 
              placeholder="Masukkan nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Bank / E-Wallet Tujuan</label>
            <select 
              value={namaBank}
              onChange={(e) => setNamaBank(e.target.value)}
            >
              <option value="BCA">BCA</option>
              <option value="DANA">DANA</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Nominal (Rp)</label>
            <input 
              type="number" 
              required 
              placeholder="Contoh: 500000"
              value={nominal}
              onChange={(e) => setNominal(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Ucapan / Pesan Tambahan</label>
            <textarea 
              rows={3} 
              placeholder="Tulis ucapan untuk mempelai..."
              value={ucapan}
              onChange={(e) => setUcapan(e.target.value)}
            ></textarea>
          </div>
          <div className={styles.formGroup}>
            <label>Bukti Transfer (Gambar)</label>
            <input 
              type="file" 
              accept="image/*" 
              required 
              onChange={(e) => setFileBukti(e.target.files ? e.target.files[0] : null)}
            />
          </div>
          <button 
            type="submit" 
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? 'Mengunggah & Membuka WA...' : 'Konfirmasi via WhatsApp'}
          </button>
        </form>
      </motion.div>
    </motion.section>
  );
}
