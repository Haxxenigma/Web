import React, { useEffect, useRef } from "react";

export default function Modal({ isPosterExpanded, setPosterExpanded, postersArray, currentSlide, closeModal, prevSlide, nextSlide }) {
    const modalRef = useRef(null);
    const closeModalRef = useRef(null);
    const modalCtrRef = useRef(null);

    useEffect(() => {
        modalRef.current.addEventListener('click', handleModalClick);
        return () => {
            modalRef.current.removeEventListener('click', handleModalClick);
        }
    }, [isPosterExpanded]);

    const handleModalClick = event => {
        if (
            !closeModalRef.current.contains(event.target) &&
            !modalCtrRef.current.contains(event.target)
        ) {
            setPosterExpanded(false);
        }
    };

    return (
        <div className={isPosterExpanded ? 'modal posterExpanded' : 'modal'} id='modal' ref={modalRef}>
            <span id='closeModal' onClick={closeModal} ref={closeModalRef}>&times;</span>
            <div id='modalCtr' key={currentSlide} ref={modalCtrRef}>
                <div className='modalPosterCtr'>
                    <img
                        id='modalPoster'
                        src={postersArray[currentSlide].posterImg}
                        alt={postersArray[currentSlide].posterAlt}
                    />
                    <a href={void (0)} id='prev' onClick={prevSlide}>&#10094;</a>
                    <a href={void (0)} id='next' onClick={nextSlide}>&#10095;</a>
                </div>
                <div id='modalInfo'>
                    <div id='modalCaption'>{postersArray[currentSlide].posterAlt}</div>
                    <a
                        href={postersArray[currentSlide].posterImg}
                        className='modalInfo'
                        id='modalSrc'
                        target='_blank'
                        title='Open source'
                    />
                    <a
                        href={postersArray[currentSlide].posterImg}
                        className='modalInfo'
                        id='modalDwn'
                        target='_blank'
                        title='Download'
                        download={postersArray[currentSlide].posterAlt}
                    />
                </div>
            </div>
        </div>
    );
}