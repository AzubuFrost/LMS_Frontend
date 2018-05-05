import React from 'react';
import TopNav from '../TopNav/TopNav';
import { SideBar } from '../../App';
import { Container } from '../../Framework/ui';
import './Shell.css';


export default function Shell({ children }) {
  return (
    <div >
      <Container>
        <TopNav />
        <SideBar />
      </Container>
      <Container>
        {children}
      </Container>
    </div>
  );
}
