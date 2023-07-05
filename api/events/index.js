import Api from '../fetch';
import { stringify } from 'qs';

export const getEvents = async () => {
  const query = stringify({
    fields: ['title', 'place', 'date', 'author', 'time'],
    populate: {
      poster: {
        fields: ['url'],
      },
    },
  });
  return await Api(`events?${query}`);
};

export const getEventsId = async (queryId) => {
  const query = stringify({
    filters: {
      id: {
        $eq: queryId,
      },
    },
    fields: ['title', 'place', 'date', 'author', 'time'],
    populate: {
      poster: {
        fields: ['url'],
      },
    },
  });
  return await Api(`events?${query}`);
};
