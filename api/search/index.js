import { Api } from '@/api';
import { stringify } from 'qs';

export const getSearchDefault = async () => {
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
        limit: 5,
      },
    },
    { encodeValuesOnly: true }
  );
  return await Api(`audios?${query}`);
};
export const getSearchByAuthor = async (input) => {
  const query = stringify(
    {
      filters: {
        author: {
          $containsi: input,
        },
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
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
  return await Api(`audios?${query}`);
};
