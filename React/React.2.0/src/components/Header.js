import React from 'react';

export default function Header({ LinkActive, isNavExpanded, toggleNav }) {
    return (
        <header className='header'>
            <div className='nav'>
                <a href='./' id='logo' />
                <a href='./' className={LinkActive == '/' ? 'navLink active' : 'navLink'} title='Home'>Home</a>
                <a href='./Gallery' className={LinkActive == '/Gallery' ? 'navLink active' : 'navLink'} title='Gallery'>Gallery</a>
                <div
                    className={isNavExpanded ? 'navToggleCtr navExpanded' : 'navToggleCtr'}
                    onClick={toggleNav}
                    id='navToggleCtr'>
                    <div className='navToggleBtn btn1'></div>
                    <div className='navToggleBtn btn2'></div>
                    <div className='navToggleBtn btn3'></div>
                </div>
            </div>
        </header>
    );
}