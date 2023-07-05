declare global {
  declare module '@types/react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      hint?: string;
    }
  }
}

interface IAudios {
  data: TAudiosData;
  meta?: unknown;
}
type TAudiosData = {
  id: number;
  attributes: {
    name: string;
    author: string;
    poster?: {
      data: {
        attributes: {
          hash: string;
          id: number;
        };
      };
    };
    src: {
      data: {
        attributes: {
          id: number;
          url: string;
        };
      };
    };
  };
};
