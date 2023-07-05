import { Api } from '@/api';
import { stringify } from 'qs';

export const getAudios = async () => {
  const qyery = stringify(
    {
      fields: ['name', 'author'],
      populate: {
        src: {
          fields: ['hash'],
        },
        poster: {
          fields: ['url'],
        },
      },
      sort: ['id:desc'],
    },
    { encodeValuesOnly: true }
  );
  return await Api(`audios?${qyery}`);
};

export const getAudiosTop = async () => {
  const query = stringify(
    {
      fields: ['name', 'author', 'likes'],
      populate: {
        src: {
          fields: ['hash'],
        },
        poster: {
          fields: ['url'],
        },
      },
      sort: ['likes:desc'],
      pagination: {
        start: 0,
        limit: 10,
      },
    },
    { encodeValuesOnly: true }
  );
  return await Api(`audios?${query}`);
};
export const getAudiosAll = async () => {
  const query = stringify(
    {
      fields: ['name', 'author', 'likes'],
      sort: ['likes:desc'],
      pagination: {
        start: 0,
        limit: 50,
      },
      populate: {
        src: {
          fields: ['hash'],
        },
        poster: {
          fields: ['url'],
        },
      },
    },
    { encodeValuesOnly: true }
  );
  return await Api(`audios?${query}`);
};

export const createAudios = async (params, token) =>
  Api('audios', 'POST', params, token);
