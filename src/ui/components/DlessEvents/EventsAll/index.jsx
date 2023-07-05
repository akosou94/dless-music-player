import React from 'react';
import { EventInfo } from '@/src/ui/components/DlessEvents/EventsInfo';

export default function EventsAll({ events }) {
  return (
    <div className='container'>
      <div className='title'>События</div>
      {events?.data?.map(({ id, attributes }, index) => (
        <EventInfo key={id} id={id} index={index + 1} attributes={attributes} />
      ))}
    </div>
  );
}
