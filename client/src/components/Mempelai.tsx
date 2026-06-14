import { motion, Variants } from 'framer-motion';
import styles from './Mempelai.module.css';

export default function Mempelai() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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
      className={styles.section}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <motion.p className={styles.intro} variants={itemVariants}>
        Salam Sejahtera dalam Kasih Tuhan Yesus Kristus,<br />
        Dengan memohon rahmat dan berkat-Nya, kami bermaksud mengundang Bapak/Ibu/Saudara/i ke acara pernikahan kami:
      </motion.p>
      
      <div className={styles.coupleWrapper}>
        <motion.div className={styles.profile} variants={itemVariants}>
          <img src="/groom.png" alt="Mempelai Pria" className={styles.avatar} />
          <h2 className={styles.name} style={{ fontSize: '1.2rem', fontWeight: 600 }}>Lambok Surya Rezeki Lumban Gaol</h2>
          <p className={styles.parents}>
            Putra dari<br />
            <strong>Bpk. Lumban Gaol</strong><br />
            &amp; <strong>Ibu Lumban Gaol</strong>
          </p>
        </motion.div>
        
        <motion.span className={styles.ampersand} variants={itemVariants}>
          &amp;
        </motion.span>
        
        <motion.div className={styles.profile} variants={itemVariants}>
          <img src="/bride.png" alt="Mempelai Wanita" className={styles.avatar} />
          <h2 className={styles.name} style={{ fontSize: '1.2rem', fontWeight: 600 }}>Juni Amella Hutagalung</h2>
          <p className={styles.parents}>
            Putri dari<br />
            <strong>Bpk. Hutagalung</strong><br />
            &amp; <strong>Ibu Hutagalung</strong>
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
