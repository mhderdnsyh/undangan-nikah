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

  const giftMethods: GiftMethod[] = [
    {
      id: 'bca',
      provider: 'BCA',
      accountNumber: '7812345678',
      accountName: 'Surya',
      type: 'bank',
    },
    {
      id: 'dana',
      provider: 'DANA',
      accountNumber: '081234567890',
      accountName: 'Juni',
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
    </motion.section>
  );
}
