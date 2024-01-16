// Offers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './Offers.css'; // Подключаем файл стилей

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [newOffer, setNewOffer] = useState({
    client: '',
    realtor: '',
    property: '',
    price: '',
  });

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = () => {
    axios.get('your_server_url/offers')
      .then(response => setOffers(response.data))
      .catch(error => console.error('Error fetching offers:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOffer(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateOffer = (e) => {
    e.preventDefault();

    axios.post('your_server_url/offers', newOffer)
      .then(() => {
        fetchOffers();
        setNewOffer({
          client: '',
          realtor: '',
          property: '',
          price: '',
        });
      })
      .catch(error => console.error('Error creating offer:', error));
  };

  const handleDeleteOffer = (id) => {
    // Реализуйте проверку на участие предложения в сделке перед удалением
    // Если предложение участвует в сделке, выведите соответствующее сообщение
    // и не выполняйте удаление
    axios.delete(`your_server_url/offers/${id}`)
      .then(() => fetchOffers())
      .catch(error => console.error('Error deleting offer:', error));
  };

  return (
    <div className="offers-container">
      <h2>Создать новое предложение</h2>
      <form onSubmit={handleCreateOffer}>
        <label>
          Клиент:
          <input type="text" name="client" value={newOffer.client} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Риэлтор:
          <input type="text" name="realtor" value={newOffer.realtor} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Объект недвижимости:
          <input type="text" name="property" value={newOffer.property} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Цена:
          <input type="number" name="price" value={newOffer.price} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Создать</button>
      </form>

      <h2>Список предложений</h2>
      <table className="offers-table">
        <thead>
          <tr>
            <th>Клиент</th>
            <th>Риэлтор</th>
            <th>Объект недвижимости</th>
            <th>Цена</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {offers.map(offer => (
            <tr key={offer.id}>
              <td>{offer.client}</td>
              <td>{offer.realtor}</td>
              <td>{offer.property}</td>
              <td>{offer.price}</td>
              <td>
                <button onClick={() => handleDeleteOffer(offer.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Offers;
