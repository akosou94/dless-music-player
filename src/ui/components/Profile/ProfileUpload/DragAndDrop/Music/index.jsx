import { useState } from 'react';

import styles from '@/src/ui/components/Profile/ProfileUpload/DragAndDrop/Dropzone.module.scss';

export default function MusicDrop({ handleFilesToUpload, loader }) {
  const [active, setActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setActive(true);
    } else if (e.type === 'dragleave') {
      setActive(false);
    }
  };
  const handleSelectFile = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer) {
      const data = e.dataTransfer.files[0].name.split('.mp3', [1]);
      const audio = {
        name: data[0].split(' - ')[1],
        author: data[0].split(' - ')[0],
        src: e.dataTransfer.files[0],
      };
      setActive(false);

      handleFilesToUpload(audio);
    } else if (e.target.files) {
      const data = e.target.files[0].name.split('.mp3', [1]);
      const audio = {
        name: data[0].split(' - ')[1],
        author: data[0].split(' - ')[0],
        src: e.target.files[0],
      };
      setActive(false);

      handleFilesToUpload(audio);
    }
  };

  return (
    <div className={styles.dropzone}>
      {loader ? (
        <form>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleSelectFile}
          >
            <div
              className={`${styles.dropzone__wrapper} ${
                active && styles.dropzone__wrapper__active
              }`}
            >
              <label className={styles.dropzone__info}>
                2. Выберите песню в формате <br /> ( mp3) <br />
              </label>
              <input
                required
                className={styles.dropzone__input}
                type={'file'}
                onChange={handleSelectFile}
                accept='audio/mp3'
              />
            </div>
          </div>
        </form>
      ) : (
        ''
      )}
    </div>
  );
}
