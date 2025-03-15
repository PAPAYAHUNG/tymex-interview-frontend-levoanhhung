import React from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.scss';
import LazyImage from '../LazyImage/LazyImage';

// Import character images
import hero1 from '../../assets/characters/author/1.png';
import hero2 from '../../assets/characters/author/2.png';
import hero3 from '../../assets/characters/author/3.png';
import hero4 from '../../assets/characters/author/4.png';
import neonGuyImg from '../../assets/characters/section2.png';
import section3Img from '../../assets/characters/section3.png';
import bgImage from '../../assets/characters/bgImage.jpeg';
import horizontalImg from '../../assets/characters/horizontalSection.png';

const heroes = [
  {
    id: 1,
    name: 'ASSASISIN',
    image: hero1,
  },
  {
    id: 2,
    name: 'NEON GUY',
    image: hero2,
  },
  {
    id: 3,
    name: 'MAFIA ENGLAND',
    image: hero3,
  },
  {
    id: 4,
    name: 'BASKETBALL GIRL',
    image: hero4,
  },
];

const Hero: React.FC = () => {
  return (
    <section className={styles.heroSection} role="region">
      <div className={styles.heroContent} data-testid="hero-content">
        <motion.div
          className={styles.heroRight}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <LazyImage
            src={bgImage}
            alt="The DJ"
            className={styles.heroImage}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </motion.div>
      </div>

      <div className={styles.section3Img}>
        <LazyImage
          src={section3Img}
          alt="Mafia England"
          className={styles.image}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>

      <div
        className={styles.characterGrid}
        data-testid="character-grid"
        style={{
          background: `url(${horizontalImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          backgroundRepeat: 'repeat-x',
        }}
      >
        {heroes.map((hero) => (
          <div className={styles.heroCard} key={hero.id} data-testid="hero-card">
            <LazyImage
              src={hero.image}
              alt={hero.name}
              className={styles.image}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
            <div className={styles.heroCardText}>
              <h3>{hero.name}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.neonGuyImg}>
        <LazyImage
          src={neonGuyImg}
          alt="Mafia England"
          className={styles.image}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
    </section>
  );
};

export default Hero; 