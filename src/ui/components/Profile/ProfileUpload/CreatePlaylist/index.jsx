import styles from '@/src/ui/components/Profile/ProfileUpload/CreatePlaylist/CreatePlaylists.module.scss';

export default function CreatePlaylist({
  playlist,
  handleSelectOption,
  handleNewUserPlaylist,
}) {
  return (
    <>
      <ul className={styles.playlists__list}>
        <p className={styles.playlists__info}>
          Всего загружено: {playlist.length} песен
        </p>
        <div className={styles.playlists__select}>
          <select
            className={styles.select}
            onChange={handleSelectOption}
            multiple
          >
            <option className={styles.option__def}>
              &mdash;&mdash;&mdash; Выберите песни &mdash;&mdash;&mdash;
            </option>
            {playlist.map(({ id, attributes }, index) => {
              return (
                <option
                  key={id}
                  value={id}
                  className={styles.option}
                  onClick={() => handleNewUserPlaylist(attributes)}
                >
                  {index + 1}.
                  {attributes.author.slice(0, attributes.author.length)} -{' '}
                  {attributes.name.slice(0, attributes.name.length)}
                </option>
              );
            })}
          </select>
        </div>
      </ul>
    </>
  );
}
