import { Api } from '@/api';
import { stringify } from 'qs';

export const getPlaylistNew = async () => {
  const query = stringify(
    {
      fields: ['title', 'createdAt'],
      sort: ['createdAt:desc'],
      pagination: {
        start: 0,
        limit: 5,
      },
      populate: {
        poster: {
          fields: ['url'],
        },
        users_permissions_user: {
          fields: ['username'],
        },
        sort: ['name'],
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  return await Api(`playlists?${query}`);
};

export const getPlaylistByID = async (queryID) => {
  const query = stringify(
    {
      fields: ['title', 'createdAt', 'id'],

      filters: {
        id: {
          $eq: queryID,
        },
      },
      populate: {
        poster: {
          fields: ['url'],
        },
        audio: {
          fields: ['name', 'author', 'id'],
          populate: {
            src: {
              fields: ['hash'],
            },
            poster: {
              fields: ['url'],
            },
          },
        },
        users_permissions_user: {
          fields: ['name'],
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  return await Api(`playlists?${query}`);
};

export const postPlaylist = async (params, token) =>
  Api('playlists', 'POST', params, token);
