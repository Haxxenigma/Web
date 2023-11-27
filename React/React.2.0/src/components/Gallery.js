import React from 'react';

export default function Gallery({ isNavExpanded, postersArray, posterExpand }) {
    return (
        <main className={isNavExpanded ? 'gallery navExpanded' : 'gallery'}>
            <div className='innerGallery'>
                {postersArray.map((poster, index) => (
                    <a
                        href={void (0)}
                        className='galleryItem'
                        key={index}
                        title={poster.posterAlt}
                        onClick={() => posterExpand(index)}
                    >
                        <div className='posterCtr'>
                            <div className='poster'>
                                <img
                                    src={poster.posterImg}
                                    alt={poster.posterAlt}
                                />
                            </div>
                        </div>
                        <div className='posterFtr'>
                            <div className='info'>{poster.posterAlt}</div>
                        </div>
                    </a>
                ))}
            </div>
        </main>
    );
}