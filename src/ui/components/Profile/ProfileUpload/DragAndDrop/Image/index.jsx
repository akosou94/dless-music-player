import { useState } from 'react';
import Preloader from '@/src/ui/components/global/Preloader';

import styles from '@/src/ui/components/Profile/ProfileUpload/DragAndDrop/Dropzone.module.scss';

export default function ImageDrop({ handleImageToUpload, loader }) {
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
      const poster = e.dataTransfer.files[0];
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();

      reader.addEventListener('load', (e) => {
        const url = e.target.result;
        handleImageToUpload(url, poster);
      });

      reader.readAsDataURL(file);
      setActive(false);
    } else if (e.target.files) {
      const poster = e.target.files[0];
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.addEventListener('load', (e) => {
        const url = e.target.result;
        handleImageToUpload(url, poster);
      });

      reader.readAsDataURL(file);
      setActive(false);
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
                1. Выберите обложку в формате <br /> ( jpeg, jpg, png, webp ){' '}
                <br />
              </label>
              <input
                required
                className={styles.dropzone__input}
                type={'file'}
                onChange={handleSelectFile}
                accept='image/jpeg, image/jpg, image/png, image/webp'
              />
            </div>
          </div>
        </form>
      ) : (
        <Preloader />
      )}
    </div>
  );
}
