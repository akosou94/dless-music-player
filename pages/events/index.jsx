import EventsAll from '@/src/ui/components/DlessEvents/EventsAll';

import { getEvents } from '@/api';

export const getServerSideProps = async () => {
  const events = await getEvents();

  return {
    props: { events },
  };
};

export default function EventsPage({ events }) {
  return (
    <div>
      <EventsAll events={events} />
    </div>
  );
}
