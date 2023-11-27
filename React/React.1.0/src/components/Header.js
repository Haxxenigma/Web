import React, { useState, useEffect } from 'react';

function Header({ selectedOption, onSearch, handleChange, handleSubmit }) {
    const [hoverAreaPosition, setHoverAreaPosition] = useState({ left: 0, top: 0 });
    const [isHoverAreaVisible, setHoverAreaVisible] = useState(false);
    const [isHoverAreaVisibleOption1, setHoverAreaVisibleOption1] = useState(false);
    const [isHoverAreaVisibleOption2, setHoverAreaVisibleOption2] = useState(false);
    const [isSearchMenuVisible, setSearchMenuVisible] = useState(false);
    const [isMenuVisible, setMenuVisible] = useState(false);

    const handleMouseMove = event => {
        const { offsetX, offsetY } = event.nativeEvent;
        setHoverAreaPosition({ left: offsetX, top: offsetY });
    };

    const handleMouseOver = () => {
        setHoverAreaVisible(true);
    };

    const handleMouseOut = () => {
        setHoverAreaVisible(false);
    };

    const handleInputFocus = () => {
        setSearchMenuVisible(true);
    };

    const handleMouseMoveOption1 = event => {
        const { offsetX, offsetY } = event.nativeEvent;
        setHoverAreaPosition({ left: offsetX, top: offsetY });
    };

    const handleMouseOverOption1 = () => {
        setHoverAreaVisibleOption1(true);
    };

    const handleMouseOutOption1 = () => {
        setHoverAreaVisibleOption1(false);
    };

    const handleMouseMoveOption2 = event => {
        const { offsetX, offsetY } = event.nativeEvent;
        setHoverAreaPosition({ left: offsetX, top: offsetY });
    };

    const handleMouseOverOption2 = () => {
        setHoverAreaVisibleOption2(true);
    };

    const handleMouseOutOption2 = () => {
        setHoverAreaVisibleOption2(false);
    };

    const showMenu = () => {
        if (isMenuVisible) {
            setMenuVisible(false);
        } else {
            setMenuVisible(true);
        };
    };

    const handleDocumentClick = event => {
        if (
            !document.getElementById('searchInput').contains(event.target) &&
            !document.getElementById('searchMenu').contains(event.target)
        ) {
            setSearchMenuVisible(false);
        };
    };

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const handleSearchInput = event => {
        onSearch(event.target.value);
    };

    return (
        <header className='header'>
            <div className='nav'>
                <div className='logo' onClick={() => {
                    window.location.href = "";
                }}></div>

                <div className='search' id='search'>
                    <form
                        className='searchBar'
                        id='searchBar'
                        role='search'
                        autoComplete='off'
                        onSubmit={handleSubmit}
                        onMouseMove={handleMouseMove}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}>
                        <input
                            type='text'
                            id='searchInput'
                            name='searchInput'
                            placeholder='Search...'
                            autoComplete='off'
                            onFocus={handleInputFocus}
                            onChange={handleSearchInput}></input>
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {isHoverAreaVisible && (
                            <div className='hoverArea'
                                style={{ left: `${hoverAreaPosition.left}px`, top: `${hoverAreaPosition.top}px` }}
                            ></div>
                        )}
                    </form>

                    <div className={isSearchMenuVisible ? 'searchMenu' : 'hide'} id='searchMenu'>
                        <div className='searchMenuOption'
                            onMouseMove={handleMouseMoveOption1}
                            onMouseOver={handleMouseOverOption1}
                            onMouseOut={handleMouseOutOption1}>
                            <input
                                type='radio'
                                value='anime'
                                id='anime'
                                name='searchMenuOption'
                                checked={selectedOption === 'anime'}
                                onChange={handleChange}
                                onClick={() => {
                                    document.getElementById('searchInput').focus();
                                }} />
                            <label htmlFor='anime'>Anime</label>
                            {isHoverAreaVisibleOption1 && (
                                <div className='hoverArea'
                                    style={{ left: `${hoverAreaPosition.left}px`, top: `${hoverAreaPosition.top}px` }}
                                ></div>
                            )}
                        </div>
                        <div className='searchMenuOption'
                            onMouseMove={handleMouseMoveOption2}
                            onMouseOver={handleMouseOverOption2}
                            onMouseOut={handleMouseOutOption2}>
                            <input
                                type='radio'
                                value='manga'
                                id='manga'
                                name='searchMenuOption'
                                checked={selectedOption === 'manga'}
                                onChange={handleChange}
                                onClick={() => {
                                    document.getElementById('searchInput').focus();
                                }} />
                            <label htmlFor='manga'>Mange</label>
                            {isHoverAreaVisibleOption2 && (
                                <div className='hoverArea'
                                    style={{ left: `${hoverAreaPosition.left}px`, top: `${hoverAreaPosition.top}px` }}
                                ></div>
                            )}
                        </div>
                    </div>
                </div>

                <div
                    className='menuToggle'
                    id='menuToggle'
                    tabIndex='0'
                    onClick={showMenu}>
                    <svg viewBox="0 0 24 24" xmlns='http://www.w3.org/2000/svg' fill='none' height='30px' width='30px'>
                        <path d="M4 6H20M4 12H20M4 18H20" stroke='#fff' strokeLinecap='round' strokeLinejoin='round'
                            strokeWidth='2' />
                    </svg>
                </div>
                <div className={isMenuVisible ? 'menu' : 'hide'} id='menu'>
                    <div className='menuExit'>
                        <button
                            type='button'
                            className='menuExitBtn'
                            onClick={showMenu}>&times;</button>
                    </div>
                    <p>See source: <a href='https://github.com/Haxxenigma/WebSites' target='_blank' rel="noopener noreferrer">GitHub</a></p>
                </div>
            </div>
        </header >
    )
}

export default Header;