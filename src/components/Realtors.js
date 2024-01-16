// Realtors.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/Realtors.css'; // Подключаем файл стилей
import levenshtein from 'fast-levenshtein';


const Realtors = () => {
  const [realtors, setRealtors] = useState([]);
  const [newRealtor, setNewRealtor] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    commission: '',
  });

  const [searchQuery, setSearchQuery] = useState('');

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchRealtors();
  }, []);

  const fetchRealtors = () => {
    axios.get('your_server_url/realtors')
      .then(response => setRealtors(response.data))
      .catch(error => console.error('Error fetching realtors:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRealtor(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateRealtor = (e) => {
    e.preventDefault();

    if (newRealtor.lastName && newRealtor.firstName) {
      axios.post('your_server_url/realtors', newRealtor)
        .then(() => {
          fetchRealtors();
          setNewRealtor({
            lastName: '',
            firstName: '',
            middleName: '',
            commission: '',
          });
          setShowForm(false); // Скрываем форму после успешного создания риэлтора
        })
        .catch(error => console.error('Error creating realtor:', error));
    } else {
      alert('Укажите фамилию и имя риэлтора');
    }
  };

  const handleSearch = () => {
    // Реализуйте поиск по ФИО с использованием расстояния Левенштейна
    const filteredRealtors = realtors.filter(realtor => {
      const distance = levenshtein.get(realtor.lastName + realtor.firstName + realtor.middleName, searchQuery);
      return distance <= 3;
    });

    // Обновите состояние с отфильтрованными риэлторами
    setRealtors(filteredRealtors);
  };

  return (
    <div className="realtors-container">
      <button onClick={() => setShowForm(!showForm)}>+</button>
      
      {showForm && (
        <>
          <h2>Создать нового риэлтора</h2>
          <form onSubmit={handleCreateRealtor}>
          <label>
          Фамилия:
          <input type="text" name="lastName" value={newRealtor.lastName} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Имя:
          <input type="text" name="firstName" value={newRealtor.firstName} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Отчество:
          <input type="text" name="middleName" value={newRealtor.middleName} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Доля от комиссии:
          <input type="text" name="commission" value={newRealtor.commission} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Создать риэлтора</button>
          </form>
        </>
      )}

      <h2>Список риэлторов</h2>
      <input
        type="text"
        placeholder="Поиск по ФИО"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button style={{marginBottom:10}} onClick={handleSearch}>Поиск</button>
      <table className="realtors-table">
      <thead>
          <tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Доля от комиссии</th>
          </tr>
        </thead>
        <tbody>
          {realtors.map(realtor => (
            <tr key={realtor.id}>
              <td>{realtor.lastName}</td>
              <td>{realtor.firstName}</td>
              <td>{realtor.middleName}</td>
              <td>{realtor.commission}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Realtors;
