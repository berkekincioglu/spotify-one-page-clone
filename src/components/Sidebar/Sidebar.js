import { useRef, useEffect, useState } from 'react';
import './sidebar.css';
import spotifyLogo from '../../assets/icons/spotify-logo.svg';
import homeIcon from '../../assets/icons/Home.svg';
import searchIcon from '../../assets/icons/Search2.svg';
import libraryIcon from '../../assets/icons/Library.svg';
import axios from 'axios';

// http://zmdp.cloud/iseAlim/spotify.json
const Sidebar = () => {
  const btnRef = useRef(null);
  useEffect(() => {
    btnRef.current.focus();
  }, []);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (search.length === 0) {
      fetchData();
    }
  }, [search]);

  const fetchData = async () => {
    await axios
      .get('http://zmdp.cloud/iseAlim/spotify.json')
      .then((res) => {
        setData(res.data.allPlaylists);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // update data on search onChange

  const onSearchFilterData = (e) => {
    setSearch(e.target.value);
    const filteredData = data.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
    setData(filteredData);
  };

  const btnData = [
    {
      icon: homeIcon,
      text: 'Giris',
      ref: btnRef,
    },
    {
      icon: searchIcon,
      text: 'Gozat',
      ref: null,
    },
    {
      icon: libraryIcon,
      text: 'Kitaplik',
      ref: null,
    },
  ];

  return (
    <div className='sidebar'>
      <img src={spotifyLogo} alt='spotify-logo' className='sidebar_logo' />
      <div className='sidebar_btns'>
        {btnData.map((btn, index) => (
          <button ref={btn.ref} className='sidebar_btn' key={index}>
            <img src={btn.icon} alt='' />
            {btn.text}
          </button>
        ))}
      </div>
      <div className='sidebar_playlist'>
        <h3>CALMA LISTELERIM</h3>

        <div className='sidebar_playlist_search'>
          <input
            onChange={(e) => onSearchFilterData(e)}
            type='text'
            placeholder='Ara'
          />
          {/* <img src={searchIcon} alt='' /> */}

          <img src={searchIcon} alt='' />
        </div>
        <div className='sidebar_playlist_container'>
          {data &&
            data.map((item, index) => (
              <span className='sidebar_playlist_text' key={index}>
                {item?.name}
              </span>
            ))}

          {data.length === 0 && (
            <span className='sidebar_playlist_text'>No data found</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
