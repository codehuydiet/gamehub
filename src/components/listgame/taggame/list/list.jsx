'use client'
import style from './list.module.css'
import Game from './game/game';
import React, { useRef, useState, useEffect } from "react";

const List = ({ tag }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const slideRef = useRef(null);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const checkIfScrolledToEnd = () => {
        if (slideRef.current) {
            const { scrollLeft, scrollWidth, offsetWidth } = slideRef.current;
            //console.log("scrool left: ", scrollLeft, " scroll width: ", scrollWidth, " offset width: ", offsetWidth);
            const atEnd = scrollLeft + offsetWidth >= scrollWidth - 1;
            //const check = atEnd ? console.log("tiếp đi bé") : console.log("hết rồi bé")
            setIsAtEnd(atEnd);
        }
    };

    const scrollLeft = () => {
        if (slideRef.current) {
            slideRef.current.scrollBy({ left: -200, behavior: 'smooth' });
            setTimeout(() => {
                setScrollPosition(slideRef.current.scrollLeft);
                // console.log(slideRef);
                checkIfScrolledToEnd();
            }, 0);
        }
    };

    const scrollRight = () => {
        if (slideRef.current) {
            slideRef.current.scrollBy({ left: 200, behavior: 'smooth' });
            setTimeout(() => {
                setScrollPosition(slideRef.current.scrollLeft);
                // console.log(slideRef);
                checkIfScrolledToEnd();
            }, 0);
        }
    };

    const leftButtonClass = scrollPosition === 0 ? 'hidden' : '';
    const rightButtonClass = isAtEnd ? 'hidden' : '';
    return (
        <div className={style.contentContainer}>
            <button className={`${style.buttonLeft} ${leftButtonClass}`} aria-label="Left arrow" onClick={scrollLeft}>{"<"}</button>
            <div ref={slideRef} className={style.itemContainer}>
                <Game tag={tag}></Game>
            </div>
            <button className={`${style.buttonRight} ${rightButtonClass}`} aria-label="Right arrow" onClick={scrollRight}>{">"}</button>
        </div>
    )
}

export default List