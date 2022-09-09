import { useEffect, useState } from 'react';
import Card from './components/Card/Card';
import searchIcon from './assets/icons/Search2.svg';

import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import axios from 'axios';

const App = () => {
  // http://zmdp.cloud/iseAlim/spotify.json

  const [search, setSearch] = useState('');
  const [recommended, setRecommended] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const filterData = (e) => {
    setSearch(e.target.value);
    const filteredData = data.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
    setData(filteredData);
  };

  const fetchData = () => {
    axios
      .get('http://zmdp.cloud/iseAlim/spotify.json')
      .then((res) => {
        console.log(res.data);
        setRecommended(res.data.recommended);
        setRecentlyPlayed(res.data.recentlyPlayed);
        setData([...res.data.recommended, ...res.data.recentlyPlayed]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sectionData = [
    {
      title: 'Yakinda Calanlar',
      description: '',
      cards: recentlyPlayed,
    },
    {
      title: 'Tavsiye Edilenler',
      description: 'Sevdiğin her şeyden biraz dinle.',
      cards: recommended,
    },
  ];
  return (
    <div className='App'>
      <Sidebar />
      <div className='right'>
        <div className='right_top'>
          <div className='app_search'>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type='text'
              placeholder='Ara'
            />
            <img src={searchIcon} alt='' />
          </div>
        </div>
        <div className='right_bottom'>
          {search.length === 0 ? (
            sectionData.map((section, index) => (
              <div className='section' key={index}>
                <div className='sectionWrapper'>
                  <h1>{section.title}</h1>

                  <h3>{section.description && section.description}</h3>

                  <div className='section_card_container'>
                    {section.cards?.map((card, index) => (
                      <Card data={card} key={index} />
                    ))}
                    {/* Test icin ekstra */}
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='section'>
              <div className='sectionWrapper'>
                <h1>Search Results</h1>
                <h3>{search}</h3>
                <div className='section_card_container'>
                  {data?.map((card, index) => (
                    <Card data={card} key={index} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <div className='bottom'></div> */}
    </div>
  );
};

export default App;
