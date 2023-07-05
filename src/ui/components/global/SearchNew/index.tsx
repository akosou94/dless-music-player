import { useEffect, useState } from 'react';
import { getSearchByAuthor, getSearchDefault } from '@/api';
import styles from '@/src/ui/components/global/SearchNew/SearchNew.module.scss';
import Track from '@/src/ui/components/Track';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const SearchNew = () => {
  const [searchAudio, setserchAudio] = useState<any>([]);
  const [inputValue, setinputValue] = useState('');

  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue(e.target.value);
  };

  const getSearch = async () => {
    const SearchResp = await getSearchByAuthor(inputValue);
    setserchAudio(SearchResp);
  };

  const getDefault = async () => {
    const SearchResp = await getSearchDefault();
    setserchAudio(SearchResp);
  };

  useEffect(() => {
    try {
      if (inputValue.length > 1) {
        getSearch();
      } else {
        setserchAudio([]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [inputValue]);
  return (
    <div
      className={styles.search}
      onFocus={() => {
        getDefault();
      }}
    >
      <input
        type='text'
        className={styles.search__fields}
        placeholder='Поиск'
        value={inputValue}
        autoComplete='off'
        onChange={handleChangeFilter}
        id={'search'}
      />
      <div
        onMouseLeave={() => {
          setserchAudio([]);
        }}
        className={`${styles.search__overflow}  ${
          searchAudio?.length == 0 ? ' ' : styles.search__overflow__active
        }`}
      >
        <div>
          <FontAwesomeIcon
            icon={faClose}
            onClick={() => setserchAudio([])}
            size={'xl'}
          />
          {searchAudio &&
            searchAudio?.data?.map(
              ({ id, attributes }: ITrackProps, index: number) => (
                <Track
                  key={id}
                  id={id}
                  index={index + 1}
                  attributes={attributes}
                  size={'sm'}
                />
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default SearchNew;
