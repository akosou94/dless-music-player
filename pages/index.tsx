//Next/React
import Head from 'next/head';
import Link from 'next/link';

//Components
import Slider from '@/src/ui/components/Slider';
import SliderItem from '@/src/ui/components/Slider/SliderItem';

import Top10 from '@/src/ui/components/Top10';
import EventsAll from '@/src/ui/components/DlessEvents/EventsAll';

//Utils
import { getAudiosTop, getPlaylistNew, getEvents } from '@/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faCalendar } from '@fortawesome/free-solid-svg-icons';

export const getServerSideProps = async () => {
  const audioTop = await getAudiosTop();
  const playlistsNew = await getPlaylistNew();
  const events = await getEvents();

  return {
    props: { playlistsNew, events, audioTop },
  };
};

export default function Home({ playlistsNew, events, audioTop }: any) {
  return (
    <>
      <Head>
        <meta name='description' content='Decathlon lessons project' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='container'>
        <div className='layout'>
          <div className='layout__left'>
            <div className='slider'>
              <div className='title'>События DLESS</div>
              <Slider buttons={true} pagination={true}>
                {events?.data?.map(({ id, attributes }: any) => (
                  <SliderItem key={id}>
                    <Link href={`/events/${id}`}>
                      {attributes.poster?.data?.attributes?.url ? (
                        <img
                          className='slides'
                          src={
                            process.env.NEXT_PUBLIC_API_URL +
                            attributes?.poster?.data?.attributes?.url
                          }
                          alt={'image'}
                        />
                      ) : (
                        <div className='slides'>
                          <div className='noImage'>
                            <FontAwesomeIcon icon={faCalendar} size='10x' />{' '}
                          </div>
                        </div>
                      )}
                      <ul className='slides__list'>
                        <li className='slides__description'>
                          <p className='slides__date'>
                            {attributes?.date.slice(8, 10)} Марта
                          </p>
                          <p className='slides__time'>
                            {attributes?.time.slice(0, 5)}
                          </p>
                        </li>
                        <li className='slides__description'>
                          <p className='slides__item'>{attributes?.title}</p>
                          <p className='slides__item'>{attributes?.author}</p>
                        </li>
                      </ul>
                    </Link>
                  </SliderItem>
                ))}
              </Slider>
            </div>

            <div className='slider'>
              <div className='title'>Новинки от пользователей</div>
              <Slider buttons={true} pagination={true}>
                {playlistsNew?.data?.map(
                  ({ id, attributes }: any, index: number) => (
                    <SliderItem key={id}>
                      <Link href={`/playlist/${id}`}>
                        {attributes.poster?.data?.attributes?.url ? (
                          <img
                            className='slides'
                            src={
                              process.env.NEXT_PUBLIC_API_URL +
                              attributes?.poster?.data?.attributes?.url
                            }
                            alt={'image'}
                          />
                        ) : (
                          <div className='slides'>
                            <div className='noImage'>
                              <FontAwesomeIcon icon={faMusic} size='10x' />{' '}
                            </div>
                          </div>
                        )}

                        <ul className='slides__list'>
                          <h2 className='slides__description'>
                            {
                              attributes?.users_permissions_user?.data
                                ?.attributes?.username
                            }
                          </h2>
                          <li className='slides__item'>{attributes?.title} </li>
                        </ul>
                      </Link>
                    </SliderItem>
                  )
                )}
              </Slider>
            </div>
            <EventsAll events={events} />
          </div>
          <div className='layout__right'>
            <Top10 audioTop={audioTop} />
          </div>
        </div>
      </div>
    </>
  );
}
