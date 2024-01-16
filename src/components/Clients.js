// Clients.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/Clients.css'; // Подключаем файл стилей
import levenshtein from 'fast-levenshtein';


const Clients = () => {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    phoneNumber: '',
    email: '',
  });

  const [clientNeeds, setClientNeeds] = useState([]);
  const [selectedClientOffers, setSelectedClientOffers] = useState([]);

  const handleClientSelect = (clientId) => {
    // Fetch and set the needs for the selected client
    axios.get(`your_server_url/clients/${clientId}/needs`)
      .then(response => setClientNeeds(response.data))
      .catch(error => console.error('Error fetching client needs:', error));

    // Fetch and set the offers for the selected client
    axios.get(`your_server_url/clients/${clientId}/offers`)
      .then(response => setSelectedClientOffers(response.data))
      .catch(error => console.error('Error fetching client offers:', error));
  };

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    axios.get('your_server_url/clients')
      .then(response => setClients(response.data))
      .catch(error => console.error('Error fetching clients:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  

  const handleCreateClient = (e) => {
    e.preventDefault();

    if (newClient.phoneNumber || newClient.email) {
      axios.post('your_server_url/clients', newClient)
        .then(() => {
          fetchClients();
          setNewClient({
            lastName: '',
            firstName: '',
            middleName: '',
            phoneNumber: '',
            email: '',
          });
          setShowForm(false); // Скрываем форму после успешного создания клиента
        })
        .catch(error => console.error('Error creating client:', error));
    } else {
      alert('Укажите номер телефона или электронную почту');
    }
  };

  const handleSearch = () => {
    // Реализуйте поиск по ФИО с использованием расстояния Левенштейна
    const filteredClients = clients.filter(client => {
      const distance = levenshtein.get(client.lastName + client.firstName + client.middleName, searchQuery);
      return distance <= 3;
    });

    // Обновите состояние с отфильтрованными клиентами
    setClients(filteredClients);
  };

  

  return (
    <div className="clients-container">
      <button onClick={() => setShowForm(!showForm)}>+</button>
      
      {showForm && (
        <>
          <h2>Создать нового клиента</h2>
          <form onSubmit={handleCreateClient}>
          <label>
          Фамилия:
          <input type="text" name="lastName" value={newClient.lastName} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Имя:
          <input type="text" name="firstName" value={newClient.firstName} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Отчество:
          <input type="text" name="middleName" value={newClient.middleName} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Номер телефона:
          <input type="text" name="phoneNumber" value={newClient.phoneNumber} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Электронная почта:
          <input type="email" name="email" value={newClient.email} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Создать клиента</button>
          </form>
        </>
      )}

      <h2>Список клиентов</h2>
      <input
        type="text"
        placeholder="Поиск по ФИО"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button style={{marginBottom:10}} onClick={handleSearch}>Поиск</button>
      <table className="clients-table">
      <thead>
          <tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Номер телефона</th>
            <th>Электронная почта</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
              <tr key={client.id} onClick={() => handleClientSelect(client.id)}>
              <td>{client.lastName}</td>
              <td>{client.firstName}</td>
              <td>{client.middleName}</td>
              <td>{client.phoneNumber}</td>
              <td>{client.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedClientOffers.length > 0 && (
        <div>
          <h3>Предложения клиента</h3>
          <ul>
            {selectedClientOffers.map(offer => (
              <li key={offer.id}>
                {`Цена: ${offer.price}, Объект недвижимости: ${offer.property.address}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {clientNeeds.length > 0 && (
        <div>
          <h3>Потребности клиента</h3>
          <ul>
            {clientNeeds.map(need => (
              <li key={need.id}>
                {`Тип недвижимости: ${need.propertyType}, Адрес: ${need.address}, Мин. цена: ${need.minPrice}, Макс. цена: ${need.maxPrice}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Clients;
