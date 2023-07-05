import React from 'react';
import Header from '@/src/ui/components/global/Header';

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps): JSX.Element => {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
};
export default Layout;
