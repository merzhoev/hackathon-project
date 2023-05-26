import { Container } from '@mantine/core';
import { FooterLinks } from 'components/Footer';
import { HeaderMegaMenu } from 'components/Header';
import { Outlet } from 'react-router-dom';

export function UserLayout() {
  return (
    <>
      <HeaderMegaMenu role="user" />
      <main className="main">
        <Container size="lg">
          <Outlet />
        </Container>
      </main>
      <FooterLinks />
    </>
  );
}
