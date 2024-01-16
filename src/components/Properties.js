// Properties.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import levenshtein from 'fast-levenshtein';
//import './Properties.css'; // Подключаем файл стилей

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    type: 'Квартира', // По умолчанию тип - квартира
    address: {
      city: '',
      street: '',
      houseNumber: '',
      apartmentNumber: '',
    },
    coordinates: {
      latitude: '',
      longitude: '',
    },
    details: {
      floor: '',
      rooms: '',
      area: '',
    },
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = () => {
    axios.get('your_server_url/properties')
      .then(response => setProperties(response.data))
      .catch(error => console.error('Error fetching properties:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateProperty = (e) => {
    e.preventDefault();

    axios.post('your_server_url/properties', newProperty)
      .then(() => {
        fetchProperties();
        setNewProperty({
          type: 'Квартира',
          address: {
            city: '',
            street: '',
            houseNumber: '',
            apartmentNumber: '',
          },
          coordinates: {
            latitude: '',
            longitude: '',
          },
          details: {
            floor: '',
            rooms: '',
            area: '',
          },
        });
      })
      .catch(error => console.error('Error creating property:', error));
  };

  const handleSearch = () => {
    const filteredProperties = properties.filter(property => {
      const addressDistance = levenshtein.get(property.address.city + property.address.street, searchQuery);
      const houseApartmentDistance = levenshtein.get(property.address.houseNumber + property.address.apartmentNumber, searchQuery);
      return addressDistance <= 3 && houseApartmentDistance <= 1;
    });

    setProperties(filteredProperties);
  };

  const handleFilter = () => {
    // Реализуйте фильтрацию по типу
    const filteredProperties = properties.filter(property => property.type === filterType);
    setProperties(filteredProperties);
  };

  return (
    <div className="properties-container">
      <h2>Создать новый объект недвижимости</h2>
      <form onSubmit={handleCreateProperty}>
        <label>
          Тип:
          <select name="type" value={newProperty.type} onChange={handleInputChange}>
            <option value="Квартира">Квартира</option>
            <option value="Дом">Дом</option>
            <option value="Земля">Земля</option>
          </select>
        </label>
        <br />
        <label>
          Город:
          <input type="text" name="address.city" value={newProperty.address.city} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Улица:
          <input type="text" name="address.street" value={newProperty.address.street} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Номер дома:
          <input type="text" name="address.houseNumber" value={newProperty.address.houseNumber} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Номер квартиры:
          <input type="text" name="address.apartmentNumber" value={newProperty.address.apartmentNumber} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Широта:
          <input type="text" name="coordinates.latitude" value={newProperty.coordinates.latitude} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Долгота:
          <input type="text" name="coordinates.longitude" value={newProperty.coordinates.longitude} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Этаж:
          <input type="text" name="details.floor" value={newProperty.details.floor} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Количество комнат:
          <input type="text" name="details.rooms" value={newProperty.details.rooms} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Площадь:
          <input type="text" name="details.area" value={newProperty.details.area} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Создать</button>
      </form>

      <h2>Список объектов недвижимости</h2>
      <table className="properties-table">
        <thead>
          <tr>
            <th>Тип</th>
            <th>Адрес</th>
            <th>Координаты</th>
            <th>Детали</th>
          </tr>
        </thead>
        <tbody>
          {properties.map(property => (
            <tr key={property.id}>
              <td>{property.type}</td>
              <td>{`${property.address.city}, ${property.address.street}, ${property.address.houseNumber}, ${property.address.apartmentNumber}`}</td>
              <td>{`(${property.coordinates.latitude}, ${property.coordinates.longitude})`}</td>
              <td>{`Этаж: ${property.details.floor}, Комнаты: ${property.details.rooms}, Площадь: ${property.details.area}`}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Поиск и фильтрация</h2>
      <input
        type="text"
        placeholder="Поиск по адресу"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Поиск</button>

      <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
        <option value="">Все типы</option>
        <option value="Квартира">Квартира</option>
        <option value="Дом">Дом</option>
        <option value="Земля">Земля</option>
      </select>
      <button onClick={handleFilter}>Фильтр</button>
    </div>
  );
};

export default Properties;
