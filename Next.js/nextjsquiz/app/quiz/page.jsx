'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './quiz.module.scss';
import questions from './questions';

export default function Quiz() {
    const [index, setIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [hoverAreaPosition, setHoverAreaPosition] = useState({ left: 0, top: 0 });
    const [isHoverAreaVisible, setHoverAreaVisible] = useState(false);
    const quiz = useRef();
    const quiz_end = useRef();
    const submit = useRef();
    const confetti = useRef();

    const getSelectedAnswer = (btns) => {
        const answers = Array.from(btns);
        const selectedAnswer = answers.find((answer) => (answer.checked));
        return selectedAnswer;
    }

    const disableAllBtns = (btns) => {
        btns.forEach(btn => {
            btn.disabled = true;
        });
    }

    const showResult = (selectedAnswer, btns) => {
        const question = questions[index];
        const correctAnswer = question.correct;
        const isCorrectAnswer = selectedAnswer.dataset.index == correctAnswer;
        if (isCorrectAnswer) {
            selectedAnswer.classList.add(styles.correct);
            setCorrectAnswers(correctAnswers + 1);
        } else {
            selectedAnswer.classList.add(styles.incorrect);
            btns.forEach(btn => {
                btn.checked = false;
                if (btn.dataset.index == correctAnswer) {
                    btn.classList.add(styles.correct);
                }
            });
        }
        submit.current.addEventListener('click', () => {
            nextQuestion(btns);
            submit.current.innerHTML = 'Ответить';
        }, { once: true });
    }

    const nextQuestion = (btns) => {
        btns.forEach(btn => {
            btn.checked = false;
            btn.disabled = false;
            btn.classList.remove(styles.correct);
            btn.classList.remove(styles.incorrect);
            if (questions.length > (index + 1)) {
                setIndex(index + 1);
            } else {
                quiz.current.classList.add(styles.hidden);
                quiz_end.current.classList.add(styles.visible);
                confetti.current.classList.add(styles.active);
                setTimeout(() => {
                    confetti.current.classList.remove(styles.active);
                }, 5000);
            }
        });
    }

    const handleMouseMove = e => {
        const { offsetX, offsetY } = e.nativeEvent;
        setHoverAreaPosition({ left: offsetX, top: offsetY });
    }

    const handleMouseOver = () => {
        setHoverAreaVisible(true);
    }

    const handleMouseOut = () => {
        setHoverAreaVisible(false);
    }

    const handleSubmiit = () => {
        const btns = document.querySelectorAll('input');
        const selectedAnswer = getSelectedAnswer(btns);
        if (selectedAnswer) {
            disableAllBtns(btns);
            showResult(selectedAnswer, btns);
            submit.current.innerHTML = 'Следующий вопрос';
        }
    }

    return (
        <div className='main'>
            <div className={styles.confetti} ref={confetti}>
                <div className={styles.confetti_piece} />
                <div className={styles.confetti_piece} />
                <div className={styles.confetti_piece} />
                <div className={styles.confetti_piece} />
                <div className={styles.confetti_piece} />
                <div className={styles.confetti_piece} />
                <div className={styles.confetti_piece} />
                <div className={styles.confetti_piece} />
                <div className={styles.confetti_piece} />
                <div className={styles.confetti_piece} />
                <div className={styles.confetti_piece} />
                <div className={styles.confetti_piece} />
                <div className={styles.confetti_piece} />
                <div className={styles.confetti_piece} />
                <div className={styles.confetti_piece} />
                <div className={styles.confetti_piece} />
            </div>

            <div className='wrapper'>
                <div className={styles.quiz} ref={quiz}>
                    <div className={styles.quiz_header}>
                        <h2>{questions[index].question}</h2>
                    </div>
                    <div className={styles.quiz_answers}>
                        <ul>
                            {questions[index].answers.map((answer, i) => (
                                <li key={i}>
                                    <label
                                        htmlFor={`answer${i}`}
                                        onMouseMove={handleMouseMove}
                                        onMouseOver={handleMouseOver}
                                        onMouseOut={handleMouseOut}>
                                        <input data-index={i} type='radio' name='answer' id={`answer${i}`} />
                                        <span>{answer}</span>
                                        {isHoverAreaVisible && (
                                            <div
                                                className={styles.hoverArea}
                                                style={{ left: `${hoverAreaPosition.left}px`, top: `${hoverAreaPosition.top}px` }}
                                            />
                                        )}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.quiz_submit}>
                        <button type='submit' ref={submit} onClick={handleSubmiit}>Ответить</button>
                    </div>
                </div>

                <div className={styles.quiz_end} ref={quiz_end}>
                    {correctAnswers > 0 ? (
                        <div className={styles.quiz_end_header}>
                            <Image src={'./trophy.svg'} alt='' width={75} height={75} />
                            <p>Поздравляем!</p>
                            <p>Викторина успешно завершена.</p>
                        </div>
                    ) : (
                        <div className={styles.quiz_end_header}>
                            <Image src={'./skull.svg'} alt='' width={50} height={50} />
                            <p>..?</p>
                            <p>Викторина успешно провалена.</p>
                        </div>
                    )}
                    <div className={styles.quiz_end_footer}>
                        <p>Ваш счет</p>
                        {correctAnswers > 0 ? (
                            <p>{Math.round(100 * correctAnswers / questions.length)}%</p>
                        ) : (
                            <p id={styles.paragraph_s0}>{Math.round(100 * correctAnswers / questions.length)}%</p>
                        )}
                        {correctAnswers > 0 && (
                            correctAnswers === 1 && (
                                <p>Вы ответили на <span id={styles.span_q}>{questions.length} вопроса</span> и только <span id={styles.span_a}>{correctAnswers} из них</span> был правильным.</p>
                            ) || (
                                <p>Вы ответили на <span id={styles.span_q}>{questions.length} вопроса</span> и <span id={styles.span_a}>{correctAnswers} из них</span> были правильными.</p>
                            )
                        )}
                        {correctAnswers === 0 && <p>Вы ответили на <span id={styles.span_q}>{questions.length} вопроса</span> и <span id={styles.span_a0}>ни один из них</span> не был правильным.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
