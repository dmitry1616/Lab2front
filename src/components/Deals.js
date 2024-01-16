import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [needs, setNeeds] = useState([]);
  const [offers, setOffers] = useState([]);

  const [selectedDeal, setSelectedDeal] = useState(null);
  const [selectedNeed, setSelectedNeed] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    fetchDeals();
    fetchNeeds();
    fetchOffers();
  }, []);

  const fetchDeals = () => {
    axios.get('your_server_url/deals')
      .then(response => setDeals(response.data))
      .catch(error => console.error('Error fetching deals:', error));
  };

  const fetchNeeds = () => {
    axios.get('your_server_url/needs')
      .then(response => setNeeds(response.data))
      .catch(error => console.error('Error fetching needs:', error));
  };

  const fetchOffers = () => {
    axios.get('your_server_url/offers')
      .then(response => setOffers(response.data))
      .catch(error => console.error('Error fetching offers:', error));
  };

  const handleDealCreate = () => {
    if (selectedNeed && selectedOffer) {
      axios.post('your_server_url/deals', { needId: selectedNeed, offerId: selectedOffer })
        .then(() => {
          fetchDeals();
          setSelectedNeed(null);
          setSelectedOffer(null);
        })
        .catch(error => console.error('Error creating deal:', error));
    }
  };

  const handleDealDelete = (dealId) => {
    axios.delete(`your_server_url/deals/${dealId}`)
      .then(() => {
        fetchDeals();
        setSelectedDeal(null);
      })
      .catch(error => console.error('Error deleting deal:', error));
  };

  const calculateCommission = (propertyType, price) => {
    if (propertyType === 'Квартира') {
      return 36000 + (0.01 * price);
    } else if (propertyType === 'Дом') {
      return 30000 + (0.01 * price);
    } else if (propertyType === 'Земля') {
      return 30000 + (0.02 * price);
    }
    return 0;
  };

  const calculateCompanyCommission = (propertyType, price) => {
    if (propertyType === 'Квартира') {
      return 0.03 * price;
    } else if (propertyType === 'Дом' || propertyType === 'Земля') {
      return 0.03 * price;
    }
    return 0;
  };

  const calculateRieltorCommission = (rieltorShare, propertyType, price) => {
    const defaultShare = 0.45;
    const effectiveShare = rieltorShare || defaultShare;

    return effectiveShare * calculateCommission(propertyType, price);
  };

  return (
    <div className="deals-container">
      <h2>Управление сделками</h2>
      <select value={selectedNeed} onChange={(e) => setSelectedNeed(e.target.value)}>
        <option value="">Выберите потребность</option>
        {needs.map(need => (
          <option key={need.id} value={need.id}>{need.address}</option>
        ))}
      </select>

      <select value={selectedOffer} onChange={(e) => setSelectedOffer(e.target.value)}>
        <option value="">Выберите предложение</option>
        {offers.map(offer => (
          <option key={offer.id} value={offer.id}>{offer.property.address}</option>
        ))}
      </select>

      <button onClick={handleDealCreate}>Создать сделку</button>

      <h2>Список сделок</h2>
      <ul>
        {deals.map(deal => (
          <li key={deal.id}>
            {`Сделка ${deal.id}, Потребность: ${deal.need.address}, Предложение: ${deal.offer.property.address}`}
            <button onClick={() => handleDealDelete(deal.id)}>Удалить</button>
          </li>
        ))}
      </ul>

      {selectedDeal && (
        <div>
          <h3>Расчеты:</h3>
          <p>{`Стоимость услуг для клиента-продавца: ${calculateCompanyCommission(selectedOffer.property.type, selectedOffer.price)}`}</p>
          <p>{`Стоимость услуг для клиента-покупателя: ${calculateCommission(selectedOffer.property.type, selectedOffer.price)}`}</p>
          <p>{`Отчисления риэлтору клиента-продавца: ${calculateRieltorCommission(selectedDeal.rieltorSeller.share, selectedOffer.property.type, selectedOffer.price)}`}</p>
          <p>{`Отчисления риэлтору клиента-покупателя: ${calculateRieltorCommission(selectedDeal.rieltorBuyer.share, selectedOffer.property.type, selectedOffer.price)}`}</p>
          <p>{`Отчисления компании: ${calculateCompanyCommission(selectedOffer.property.type, selectedOffer.price)}`}</p>
        </div>
      )}
    </div>
  );
};

export default Deals;
