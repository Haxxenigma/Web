import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';
import animeJsonData from './json/animes.json';
import mangaJsonData from './json/mangas.json';
import './styles/reset.css';
import './styles/header.css';
import './styles/main.css';
import './styles/footer.css';

function App() {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('anime');
  const [sortDirection, setSortDirection] = useState({});
  const [searchInput, setSearchInput] = useState('');

  const animeData = animeJsonData.map((anime, index) => ({
    index: index,
    ...anime
  }));

  const mangaData = mangaJsonData.map((manga, index) => ({
    index: index,
    ...manga
  }));

  useEffect(() => {
    if (selectedOption === 'anime') {
      setData(animeData);
      resetSortDirection();
    } else if (selectedOption === 'manga') {
      setData(mangaData);
      resetSortDirection();
    };
  }, [selectedOption]);

  if (selectedOption === 'anime') {
    var tableHeadCells = [
      { label: 'target_id', title: 'Id', sortType: 'number' },
      { label: 'target_title', title: 'Title', sortType: 'string' },
      { label: 'index', title: 'Order', sortType: 'number' },
      { label: 'score', title: 'Score', sortType: 'number' },
      { label: 'status', title: 'Status', sortType: 'string' },
      { label: 'rewatches', title: 'Rewatches', sortType: 'number' },
      { label: 'episodes', title: 'Episodes', sortType: 'number' },
    ];
  } else if (selectedOption === 'manga') {
    var tableHeadCells = [
      { label: 'target_id', title: 'Id', sortType: 'number' },
      { label: 'target_title', title: 'Title', sortType: 'string' },
      { label: 'index', title: 'Order', sortType: 'number' },
      { label: 'score', title: 'Score', sortType: 'number' },
      { label: 'status', title: 'Status', sortType: 'string' },
      { label: 'rewatches', title: 'Rewatches', sortType: 'number' },
      { label: 'volumes', title: 'Volumes', sortType: 'number' },
      { label: 'chapters', title: 'Chapters', sortType: 'number' },
    ];
  };

  const resetSortDirection = () => {
    const headerCells = document.querySelectorAll('.row:first-child .cell');

    headerCells.forEach(cell => {
      cell.setAttribute('data-sort-direction', 'none');
    });
  };

  const sortTable = columnIndex => {
    const newData = [...data];

    const sortType = tableHeadCells[columnIndex].sortType;
    const currentDirection = sortDirection[columnIndex];

    newData.sort((rowA, rowB) => {
      const valueA = rowA[tableHeadCells[columnIndex].label];
      const valueB = rowB[tableHeadCells[columnIndex].label];

      if (sortType === 'number') {
        return currentDirection === 'asc' ? parseFloat(valueB) - parseFloat(valueA) : parseFloat(valueA) - parseFloat(valueB);
      } else {
        return currentDirection === 'asc' ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
      };
    });

    resetSortDirection();
    setSortDirection({ ...sortDirection, [columnIndex]: currentDirection === 'asc' ? 'desc' : 'asc' });
    setData(newData);
  };

  const handleTitleClick = (id, title) => {
    let url = title.toLowerCase();
    url = url.replace(/[\s:'-./☆*]+/g, '-').replace(/[()"!?&~]/g, "");
    selectedOption === 'anime' ? url = 'https://shikimori.me/animes/' + id + '-' + url : url = 'https://shikimori.me/mangas/' + id + '-' + url;
    window.open(url, '_blank').focus();
  };

  const handleSearchInput = input => {
    setSearchInput(input);
  };

  const filteredData = data.filter(row => {
    const rowText = Object.values(row).join(' ').toLowerCase();
    return rowText.includes(searchInput.toLowerCase());
  });

  const handleChange = event => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <>
      <Header
        selectedOption={selectedOption}
        onSearch={handleSearchInput}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Main
        data={filteredData}
        tableHeadCells={tableHeadCells}
        sortDirection={sortDirection}
        sortTable={sortTable}
        handleTitleClick={handleTitleClick}
      />
      <Footer />
    </>
  )
}

const root = createRoot(document.getElementById('root'));
root.render(
  <App />
);