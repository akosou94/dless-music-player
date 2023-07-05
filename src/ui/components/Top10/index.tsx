import Link from 'next/link';
import styles from '@/src/ui/components/Top10/Top10.module.scss';
import Track from '@/src/ui/components/Track';
import Options from '@/src/ui/components/Options';

const Top10 = ({ audioTop }: any) => {
  return (
    <div className={styles.wrapper}>
      <div className='title'>Топ 10</div>
      <Options play={true} like={true} size={'lg'} dataMusic={audioTop.data} />

      {audioTop.data?.map(
        ({ id, attributes }: ITrackProps, index: number): any => (
          <Track
            key={id}
            id={id}
            index={index + 1}
            attributes={attributes}
            size='lg'
          />
        )
      )}
      <span className={styles.link}>
        <Link href={'/allAudios'}>Посмотреть все треки</Link>
      </span>
    </div>
  );
};

export default Top10;
