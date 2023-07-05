import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '@/src/ui/components/Profile/Layout';
import CreatePlaylist from '@/src/ui/components/Profile/ProfileUpload/CreatePlaylist';
import UploadedSongs from '@/src/ui/components/Profile/ProfileUpload/Uploaded';
import UploadedPlaylist from '@/src/ui/components/Profile/ProfileUpload/UploadedPlaylist';
import PlaylistImageDrop from '@/src/ui/components/Profile/ProfileUpload/DragAndDrop/Playlist';
import MusicDrop from '@/src/ui/components/Profile/ProfileUpload/DragAndDrop/Music';
import ImageDrop from '@/src/ui/components/Profile/ProfileUpload/DragAndDrop/Image';

import Toast from '@/src/ui/components/global/Toast';

import { createAudios, postPlaylist, getAudiosAll } from '@/api';

export const getServerSideProps = async () => {
  const audios = await getAudiosAll();

  return {
    props: { audios },
  };
};

export default function UserCollection({ audios }) {
  const { data } = audios;

  const [loader, setLoader] = useState(true);
  const [loaderPlaylist, setLoaderPlaylist] = useState(true);
  const [list, setList] = useState([]);
  const { data: session } = useSession();
  const [files, setFiles] = useState([] || '');
  const [playlist, setPlaylist] = useState(data);
  const [playlistName, setPlaylistName] = useState('');
  const [fileId, setSongsId] = useState([] || null);
  const [newUserPlaylist, setNewUserPlaylist] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePlaylist, setImagePlaylist] = useState(null);

  const handleImageToUpload = (url, poster) => {
    setImage({ poster: poster, url: url });
  };
  const handleImagePlaylistToUpload = (url, poster) => {
    setImagePlaylist({ poster: poster, url: url });
  };

  const handleFilesToUpload = ({ name, author, src }) => {
    setFiles([
      ...files,
      { name, author, src, poster: image?.poster, url: image?.url },
    ]);
  };

  const handleDeleteSong = (index) => {
    setFiles([...files.slice(0, index), ...files.slice(index + 1)]);
  };

  const uploadNewSongs = (files) => {
    files.forEach((element) => {
      setLoader(false);
      createAudios(
        {
          data: {
            name: element.name,
            author: element.author,
          },
          files: {
            src: element.src,
            poster: element.poster,
          },
        },
        session?.jwt
      )
        .then(() => setLoader(true))
        .then(() => setFiles([]))
        .then(() =>
          setList([
            ...list,
            {
              id: Date.now(),
              type: 'success',
              description: 'Успешно загружено',
            },
          ])
        )
        .catch((error) => {
          throw error;
        });
    });
  };

  const handleSelectOption = (e) => {
    setSongsId([...fileId, Number(e.target.value)]);
  };

  const handlePlaylistName = (e) => {
    setPlaylistName(e.target.value);
  };

  const handleRemoveFile = (index) => {
    setNewUserPlaylist([
      ...newUserPlaylist.slice(0, index),
      ...newUserPlaylist.slice(index + 1),
    ]);
    setSongsId([...fileId.slice(0, index), ...fileId.slice(index + 1)]);
  };

  const handleNewUserPlaylist = (attr) => {
    setNewUserPlaylist([
      ...newUserPlaylist,
      { author: attr.author, name: attr.name },
    ]);
  };

  const uploadPlaylist = (fileId) => {
    setPlaylistName('');
    setLoaderPlaylist(false);
    postPlaylist(
      {
        data: {
          title: playlistName,
          user_id: session?.user.id,
          audio: {
            connect: fileId,
          },
        },
        files: {
          poster: imagePlaylist.poster,
        },
      },
      session?.jwt
    )
      .then(() => setLoaderPlaylist(true))
      .then(() => setNewUserPlaylist([]))
      .then(() => setPlaylistName(''))
      .then(() =>
        setList([
          ...list,
          {
            id: Date.now(),
            type: 'success',
            description: 'Успешно загружено',
          },
        ])
      )
      .catch((error) => {
        throw error;
      });
  };

  return (
    <Layout>
      <Toast toastlist={list} setList={setList} />
      <div className='uploaded'>
        <div className='uploaded__left'>
          {loader && (
            <UploadedSongs
              files={files}
              uploadNewSongs={uploadNewSongs}
              handleDeleteSong={handleDeleteSong}
            />
          )}
        </div>
        <div className='uploaded__right'>
          <ImageDrop
            loader={loader}
            handleImageToUpload={handleImageToUpload}
          />
          <MusicDrop
            loader={loader}
            handleFilesToUpload={handleFilesToUpload}
          />
        </div>
      </div>
      <div className='test'></div>
      <div className='uploaded'>
        <div className='uploaded__left'>
          {loaderPlaylist && (
            <UploadedPlaylist
              imagePlaylist={imagePlaylist}
              newUserPlaylist={newUserPlaylist}
              playlistName={playlistName}
              handleRemoveFile={handleRemoveFile}
              handlePlaylistName={handlePlaylistName}
              uploadPlaylist={uploadPlaylist}
              fileId={fileId}
            />
          )}
        </div>
        <div className='uploaded__right'>
          <PlaylistImageDrop
            loaderPlaylist={loaderPlaylist}
            handleImagePlaylistToUpload={handleImagePlaylistToUpload}
          />
          {loaderPlaylist && (
            <CreatePlaylist
              playlist={playlist}
              handleNewUserPlaylist={handleNewUserPlaylist}
              handleSelectOption={handleSelectOption}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
