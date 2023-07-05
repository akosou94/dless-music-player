import AllAudios_Page from '@/src/ui/components/AllAudios_Page';
import { getAudiosAll } from '@/api';

const allAudios = ({ audios }) => {
  return (
    <>
      <div className='container'>
        <AllAudios_Page audios={audios} />
      </div>
    </>
  );
};
export default allAudios;

export const getServerSideProps = async () => {
  const audios = await getAudiosAll();

  return {
    props: { audios },
  };
};
