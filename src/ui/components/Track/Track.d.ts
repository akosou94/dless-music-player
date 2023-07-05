type TTrackData = {
  name: string;
  author: string;
  poster: TTrackPoster;
};

type TTrackPoster = {
  data: { attributes: { url: string } };
};

interface ITrackProps {
  id: number;
  size?: TSizeProp;
  attributes: TTrackData;
  index?: number;
}

type TSizeProp =
  | 'xs'
  | '2xs'
  | 'sm'
  | 'lg'
  | 'xl'
  | '2xl'
  | '1x'
  | '2x'
  | '3x'
  | '4x'
  | '5x'
  | '6x'
  | '7x'
  | '8x'
  | '9x'
  | '10x';
