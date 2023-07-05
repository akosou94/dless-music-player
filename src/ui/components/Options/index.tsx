import React, { useState, useContext } from 'react';
import Toast from '@/src/ui/components/global/Toast';

import styles from '@/src/ui/components/Options/Options.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faStop, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '@/src/redux/hooks/hooks';
import { playNewTrack, setCurrentAudio } from '@/src/redux/audios/audios';

const Options = ({
  play = false,
  like = false,
  queue = false,
  size = 'xs',
  dataMusic,
}: IOptionsProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [isPlay, setIsPlay] = useState(false);
  const [list, setList] = useState<Array<IToast>>([]);

  const handleClickNewTrack = () => {
    dispatch(playNewTrack({ data: dataMusic }));
    dispatch(setCurrentAudio({ data: dataMusic }));
  };

  // const checkUnique = (music: any, playlistQueue: any): boolean => {
  //   for (const IdPlaylist of playlistQueue) {
  //     for (const IdMusic of music) {
  //       if (IdPlaylist.id === IdMusic.id) {
  //         return false;
  //       }
  //     }
  //   }
  //   return true;
  // };
  // const addInQueue = (musicItem: any): void => {
  //   if (audioContext !== null) {
  //     if (
  //       musicItem !== undefined &&
  //       checkUnique(musicItem, audioContext.data)
  //     ) {
  //       setAudioContext({
  //         data: [...audioContext.data, ...musicItem],
  //       });
  //     } else {
  //       setList([
  //         ...list,
  //         {
  //           id: Date.now(),
  //           type: 'warn',
  //           title: `Ошибка добавления музыки`,
  //           description: 'Одинаковую музыку нельзя добавлять больше 1 раза',
  //         },
  //       ]);
  //     }
  //   } else {
  //     setAudioContext({
  //       data: musicItem,
  //     });
  //   }
  // };
  return (
    <>
      <Toast toastlist={list} setList={setList} />
      <div className={styles.wrapper}>
        {play && (
          <div
            onClick={(): void => {
              setIsPlay(!isPlay);
            }}
            className={styles.options}
            hint={'Слушать'}
          >
            {isPlay ? (
              <FontAwesomeIcon icon={faStop} size={size} />
            ) : (
              <FontAwesomeIcon
                icon={faPlay}
                size={size}
                // onClick={() => setAudioContext({ data: dataMusic })}
                onClick={handleClickNewTrack}
              />
            )}
          </div>
        )}

        {like && (
          <div className={styles.options} hint={'Добавить в свою коллекцию'}>
            <FontAwesomeIcon icon={faHeart} size={size} />
          </div>
        )}
        {queue && (
          <div className={styles.options} hint={'Добавить в очередь'}>
            <FontAwesomeIcon
              icon={faPlus}
              size={size}
              // onClick={(): void => addInQueue(dataMusic)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Options;
