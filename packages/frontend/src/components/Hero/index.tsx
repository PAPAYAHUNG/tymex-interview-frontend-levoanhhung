import React from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';

// Import character images
import assassinImg from '../../assets/characters/section1.png';
import neonGuyImg from '../../assets/characters/section2.png';
import section3Img from '../../assets/characters/section3.png';
import bgImage from '../../assets/characters/bgImage.jpeg';
import horizontalImg from '../../assets/characters/horizontalSection.png';


const Hero: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <motion.div
          className={styles.heroRight}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img src={bgImage} alt="The DJ" />
        </motion.div>
      </div>

   

      <div
        className={styles.section3Img}
      >
        <img src={section3Img} alt="Mafia England" className={styles.image} />
      </div>


      <div
        className={styles.characterGrid}
        style={{
          background: `url(${horizontalImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          backgroundRepeat: 'repeat-x',
        }}
      >
        {/* <img src={assassinImg} alt="Character" className={styles.image} /> */}
      </div>
      <div
        className={styles.neonGuyImg}
      >
        <img src={neonGuyImg} alt="Mafia England" className={styles.image} />
      </div>
    </section>
  );
};

export default Hero; 