import EventId from '@/src/ui/components/DlessEvents/EventId';

import { getEventsId } from '@/api';

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  const events = await getEventsId(id);

  return {
    props: { events },
  };
};

const EventCurrentId = ({ events }) => {
  const { data } = events;

  return (
    <div>
      <div className='container'>
        <EventId events={data} />
      </div>
    </div>
  );
};

export default EventCurrentId;
