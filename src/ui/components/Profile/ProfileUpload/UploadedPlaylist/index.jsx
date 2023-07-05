import styles from '@/src/ui/components/Profile/ProfileUpload/UploadedPlaylist/UploadedPlaylist.module.scss';

export default function UploadedPlaylist({
  newUserPlaylist,
  playlistName,
  handleRemoveFile,
  handlePlaylistName,
  uploadPlaylist,
  fileId,
  imagePlaylist,
}) {
  return (
    <>
      <div className={styles.playlists__create}>
        {newUserPlaylist.length >= 1 && (
          <div className={styles.playlists__info}>
            <div>
              <p className={styles.playlists__title}>Создать новую подборку</p>
              <input
                className={styles.playlists__name}
                value={playlistName}
                placeholder='Введите название...'
                onChange={(e) => handlePlaylistName(e)}
              />
            </div>
            <img
              src={imagePlaylist?.url}
              alt={'Image 60x60'}
              className={styles.image}
            />
          </div>
        )}
      </div>
      <>
        <ul className={styles.playlists__added}>
          {newUserPlaylist.map(({ author, name }, index) => (
            <li key={index} className={styles.playlists__item}>
              {index + 1}. {author} - {name}
              <button
                className={styles.button__remove}
                onClick={() => handleRemoveFile(index)}
              >
                &mdash;
              </button>
            </li>
          ))}
        </ul>
        {newUserPlaylist.length >= 2 && (
          <button
            className={styles.playlists__button}
            onClick={() => uploadPlaylist(fileId)}
          >
            Загрузить подборку
          </button>
        )}
      </>
    </>
  );
}
