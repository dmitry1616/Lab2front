// NavigationMenu.js
import React from 'react';
import styled from 'styled-components';
import { FaHome, FaBullhorn, FaHandshake, FaUsers, FaUserTie, FaBuilding } from 'react-icons/fa';
import Needs from './Needs';
import Offers from './Offers';
import Deals from './Deals';
import Clients from './Clients';
import Realtors from './Realtors';
import Properties from './Properties';

const Container = styled.div`
  display: flex;
  height: 100vh;
  display: flex;
  margin: 0;
  
  
`;

const MenuContainer = styled.div`
  width: 200px;
  background-color: #3498db;
  display: flex;
  flex-direction: column;
  padding: 20px;
  
  
  
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  
`;

const Logo = styled.div`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const MenuItem = styled.div`
  color: #fff;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
  padding: 15px;
  border-radius:20px;

  &:hover {
    background-color: #2980b9;
  }

  svg {
    margin-right: 10px;
  }
`;

const NavigationMenu = () => {
  const [activeTab, setActiveTab] = React.useState('Needs');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const renderComponent = () => {
    switch (activeTab) {
      case 'Needs':
        return <Needs />;
      case 'Offers':
        return <Offers />;
      case 'Deals':
        return <Deals />;
      case 'Clients':
        return <Clients />;
      case 'Realtors':
        return <Realtors />;
      case 'Properties':
        return <Properties />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <MenuContainer>
        <Logo>ESOFT</Logo>
        <MenuItem onClick={() => handleTabClick('Needs')}>
          <FaHome /> Потребности
        </MenuItem>
        <MenuItem onClick={() => handleTabClick('Offers')}>
          <FaBullhorn /> Предложения
        </MenuItem>
        <MenuItem onClick={() => handleTabClick('Deals')}>
          <FaHandshake /> Сделки
        </MenuItem>
        <MenuItem onClick={() => handleTabClick('Clients')}>
          <FaUsers /> Клиенты
        </MenuItem>
        <MenuItem onClick={() => handleTabClick('Realtors')}>
          <FaUserTie /> Риэлторы
        </MenuItem>
        <MenuItem onClick={() => handleTabClick('Properties')}>
          <FaBuilding /> Объекты недвижимости
        </MenuItem>
      </MenuContainer>
      <ContentContainer>{renderComponent()}</ContentContainer>
    </Container>
  );
};

export default NavigationMenu;
