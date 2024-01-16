// Needs.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './Needs.css'; // Подключаем файл стилей

const Needs = () => {
  const [needs, setNeeds] = useState([]);
  const [newNeed, setNewNeed] = useState({
    client: '',
    realtor: '',
    propertyType: '',
    address: '',
    minPrice: '',
    maxPrice: '',
    details: {
      minArea: '',
      maxArea: '',
      minRooms: '',
      maxRooms: '',
      minFloors: '',
      maxFloors: '',
    },
  });

  useEffect(() => {
    fetchNeeds();
  }, []);

  const fetchNeeds = () => {
    axios.get('your_server_url/needs')
      .then(response => setNeeds(response.data))
      .catch(error => console.error('Error fetching needs:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNeed(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateNeed = (e) => {
    e.preventDefault();

    axios.post('your_server_url/needs', newNeed)
      .then(() => {
        fetchNeeds();
        setNewNeed({
          client: '',
          realtor: '',
          propertyType: '',
          address: '',
          minPrice: '',
          maxPrice: '',
          details: {
            minArea: '',
            maxArea: '',
            minRooms: '',
            maxRooms: '',
            minFloors: '',
            maxFloors: '',
          },
        });
      })
      .catch(error => console.error('Error creating need:', error));
  };

  const handleDeleteNeed = (id) => {
    // Реализуйте проверку на участие потребности в сделке перед удалением
    // Если потребность участвует в сделке, выведите соответствующее сообщение
    // и не выполняйте удаление
    axios.delete(`your_server_url/needs/${id}`)
      .then(() => fetchNeeds())
      .catch(error => console.error('Error deleting need:', error));
  };

  return (
    <div className="needs-container">
      <h2>Создать новую потребность</h2>
      <form onSubmit={handleCreateNeed}>
        <label>
          Клиент:
          <input type="text" name="client" value={newNeed.client} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Риэлтор:
          <input type="text" name="realtor" value={newNeed.realtor} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Тип объекта недвижимости:
          <select name="propertyType" value={newNeed.propertyType} onChange={handleInputChange}>
            <option value="Квартира">Квартира</option>
            <option value="Дом">Дом</option>
            <option value="Земля">Земля</option>
          </select>
        </label>
        <br />
        <label>
          Адрес:
          <input type="text" name="address" value={newNeed.address} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Минимальная цена:
          <input type="number" name="minPrice" value={newNeed.minPrice} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Максимальная цена:
          <input type="number" name="maxPrice" value={newNeed.maxPrice} onChange={handleInputChange} />
        </label>
        <br />

        {/* Дополнительные детали в зависимости от типа объекта недвижимости */}
        {newNeed.propertyType === 'Квартира' && (
  <div>
    <label>
      Минимальная площадь:
      <input type="number" name="details.minArea" value={newNeed.details.minArea} onChange={handleInputChange} />
    </label>
    <br />
    <label>
      Максимальная площадь:
      <input type="number" name="details.maxArea" value={newNeed.details.maxArea} onChange={handleInputChange} />
    </label>
    <br />
    <label>
      Минимальное количество комнат:
      <input type="number" name="details.minRooms" value={newNeed.details.minRooms} onChange={handleInputChange} />
    </label>
    <br />
    <label>
      Максимальное количество комнат:
      <input type="number" name="details.maxRooms" value={newNeed.details.maxRooms} onChange={handleInputChange} />
    </label>
    <br />
    <label>
      Минимальный этаж:
      <input type="number" name="details.minFloors" value={newNeed.details.minFloors} onChange={handleInputChange} />
    </label>
    <br />
    <label>
      Максимальный этаж:
      <input type="number" name="details.maxFloors" value={newNeed.details.maxFloors} onChange={handleInputChange} />
    </label>
  </div>
)}

{newNeed.propertyType === 'Дом' && (
  <div>
    <label>
      Минимальная площадь:
      <input type="number" name="details.minArea" value={newNeed.details.minArea} onChange={handleInputChange} />
    </label>
    <br />
    <label>
      Максимальная площадь:
      <input type="number" name="details.maxArea" value={newNeed.details.maxArea} onChange={handleInputChange} />
    </label>
    <br />
    <label>
      Минимальное количество комнат:
      <input type="number" name="details.minRooms" value={newNeed.details.minRooms} onChange={handleInputChange} />
    </label>
    <br />
    <label>
      Максимальное количество комнат:
      <input type="number" name="details.maxRooms" value={newNeed.details.maxRooms} onChange={handleInputChange} />
    </label>
    <br />
    <label>
      Минимальная этажность дома:
      <input type="number" name="details.minFloors" value={newNeed.details.minFloors} onChange={handleInputChange} />
    </label>
    <br />
    <label>
      Максимальная этажность дома:
      <input type="number" name="details.maxFloors" value={newNeed.details.maxFloors} onChange={handleInputChange} />
    </label>
  </div>
)}

{newNeed.propertyType === 'Земля' && (
  <div>
    <label>
      Минимальная площадь:
      <input type="number" name="details.minArea" value={newNeed.details.minArea} onChange={handleInputChange} />
    </label>
    <br />
    <label>
      Максимальная площадь:
      <input type="number" name="details.maxArea" value={newNeed.details.maxArea} onChange={handleInputChange} />
    </label>
  </div>
)}
        

        <button type="submit">Создать</button>
      </form>

      <h2>Список потребностей</h2>
      <table className="needs-table">
        <thead>
          <tr>
            <th>Клиент</th>
            <th>Риэлтор</th>
            <th>Тип объекта недвижимости</th>
            <th>Адрес</th>
            <th>Мин. цена</th>
            <th>Макс. цена</th>
            <th>Дополнительные детали</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {needs.map(need => (
            <tr key={need.id}>
              <td>{need.client}</td>
              <td>{need.realtor}</td>
              <td>{need.propertyType}</td>
              <td>{need.address}</td>
              <td>{need.minPrice}</td>
              <td>{need.maxPrice}</td>
              <td>{`Мин. площадь: ${need.details.minArea}, Макс. площадь: ${need.details.maxArea}, Мин. комнаты: ${need.details.minRooms}, Макс. комнаты: ${need.details.maxRooms}, Мин. этажи: ${need.details.minFloors}, Макс. этажи: ${need.details.maxFloors}`}</td>
              <td>
                <button onClick={() => handleDeleteNeed(need.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Needs;
