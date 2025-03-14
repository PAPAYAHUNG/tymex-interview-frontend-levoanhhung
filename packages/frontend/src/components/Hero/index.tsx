import React from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.scss';

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
        {heroes.map((hero) => (
          <div className={styles.heroCard} key={hero.id}>
            <img src={hero.image} alt={hero.name} className={styles.image} />
            <div className={styles.heroCardText}>
              <h3>{hero.name}</h3>
            </div>
          </div>
        ))}
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