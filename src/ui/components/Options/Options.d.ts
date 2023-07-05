interface IOptionsProps {
  play?: boolean;
  like?: boolean;
  queue?: boolean;
  size?: TSizeProp;
  dataMusic?: Array<TOptionsMusic>;
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

type TOptionsMusicAttributes = {
  name: string;
  author: string;
  likes?: number;
  src?: Array;
  poster?: Array;
};

type TOptionsMusic = {
  id: number;
  attributes: TOptionsMusicAttributes;
};
