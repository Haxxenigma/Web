'use client';
import Image from 'next/image';

export default function Images({ styles }) {
    const handleClick = e => {
        e.target.classList.toggle(styles.active);
    }

    return (
        <div className={styles.images}>
            <Image src={'/bulb.svg'} alt='' width={100} height={100} id={styles.bulb_img} onClick={handleClick} />
            <Image src={'/quiz.svg'} alt='' width={150} height={150} id={styles.quiz_img} onClick={handleClick} />
        </div>
    );
}