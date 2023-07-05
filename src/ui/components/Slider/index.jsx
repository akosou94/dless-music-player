import { useState } from 'react';
import Buttons from './Buttons';
import Pagination from './Pagination';

import styles from '@/src/ui/components/Slider/Slider.module.scss';

export default function Slider({ children, buttons, pagination }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const handlePrevSlide = () => {
    setActiveSlide(activeSlide === 0 ? activeSlide : activeSlide - 1);
  };
  const handleNextSlide = () => {
    setActiveSlide(activeSlide === children.length - 1 ? 0 : activeSlide + 1);
  };

  const currentLink = (index) => {
    setActiveSlide(index);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__slides}>{children[activeSlide]}</div>
      {buttons && <Buttons prev={handlePrevSlide} next={handleNextSlide} />}
      {pagination && (
        <Pagination
          currentDataSlide={children.length}
          activeSlide={activeSlide}
          currentLink={currentLink}
        />
      )}
    </div>
  );
}
