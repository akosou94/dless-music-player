import styles from '@/src/ui/components/Slider/Pagination/Pagination.module.scss';

export default function Pagination({
  currentDataSlide,
  activeSlide,
  currentLink,
}) {
  return (
    <>
      <div className={styles.links}>
        {currentDataSlide &&
          [...new Array(currentDataSlide)].map((e, index) => (
            <div
              onMouseEnter={() => currentLink(index)}
              className={`${styles.links__points} ${
                index === activeSlide ? styles.links__active : ''
              }`}
              key={index}
            ></div>
          ))}
      </div>
    </>
  );
}
