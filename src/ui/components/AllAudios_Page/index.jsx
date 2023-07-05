import { useState } from 'react';
import Options from '@/src/ui/components/Options';
import Track from '@/src/ui/components/Track';
import styles from '@/src/ui/components/AllAudios_Page/AllAudios_Page.module.scss';

const AllAudios_Page = ({ audios }) => {
  const [visible, setVisibale] = useState(10);

  const showMoreTrack = () => {
    setVisibale((prevValue) => prevValue + 5);
  };

  return (
    <div className={styles.wrapper}>
      <div className={'title'}>Все треки</div>
      <div className={styles.options}>
        <Options play={true} size={'lg'} dataMusic={audios.data} />
      </div>
      {audios ? (
        audios &&
        audios?.data
          .slice(0, visible)
          .map(({ id, attributes }, index) => (
            <Track
              key={id}
              id={id}
              index={index + 1}
              attributes={attributes}
              size={'lg'}
            />
          ))
      ) : (
        <div className={styles.nonTrack}>Треков нет</div>
      )}
      {audios && audios?.data?.length > visible && (
        <a href='#showMoreTrack'>
          <button
            name='showMoreTrack'
            className={styles.showMoreTrack}
            onClick={() => showMoreTrack()}
            id='showMoreTrack'
          >
            Показать еще
          </button>
        </a>
      )}
    </div>
  );
};

export default AllAudios_Page;
