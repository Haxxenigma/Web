import React from 'react';

export default function SideNav({ LinkActive, isNavExpanded, closeNav }) {
    return (
        <div className={isNavExpanded ? 'sideNav navExpanded' : 'sideNav'} id='sideNav'>
            <a href={void (0)} id='navClose' onClick={closeNav}>&times;</a>
            <a href='./' className={LinkActive == '/' ? 'navLink active' : 'navLink'} title='Home'>Home</a>
            <a href='./Gallery' className={LinkActive == '/Gallery' ? 'navLink active' : 'navLink'} title='Gallery'>Gallery</a>
        </div>
    );
}