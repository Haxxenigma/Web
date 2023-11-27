import React from 'react';

export default function Footer({ isNavExpanded }) {
    return (
        <footer className={isNavExpanded ? 'footer navExpanded' : 'footer'}>
            <div className='fNav'>
                <div className='fNavStart'>
                    <div className='fNavLeft'>
                        <div className='fNavLogo'>
                            This is just a test site made for a deeper dive into web development, to see what the React framework is and a combination of html/css/js
                        </div>
                        <div className='fNavSocialLinks'>
                            <a href='https://www.facebook.com/' className='fNavSocialLink facebook' title='facebook' target='_blank' rel="noopener noreferrer"></a>
                            <a href='https://www.linkedin.com/' className='fNavSocialLink linkedin' title='linkedin' target='_blank' rel="noopener noreferrer"></a>
                            <a href='https://twitter.com/' className='fNavSocialLink twitter' title='twitter' target='_blank' rel="noopener noreferrer"></a>
                            <a href='https://github.com/' className='fNavSocialLink github' title='github' target='_blank' rel="noopener noreferrer"></a>
                        </div>
                    </div>
                    <div className='fNavRight'>
                        <div className='fNavLinks'>
                            <a href='' className='fNavLink' title='Privacy Policy'>Privacy Policy</a>
                            <a href='' className='fNavLink' title='Terms of Use'>Terms of Use</a>
                            <a href='' className='fNavLink' title='Licensing'>Licensing</a>
                            <a href='' className='fNavLink' title='Contact'>Contact</a>
                        </div>
                    </div>
                </div>
                <div className='fNavEnd'>
                    This site &copy; 2023 &middot; All Rights Reserved
                </div>
            </div>
        </footer>
    );
}