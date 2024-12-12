require('dotenv').config();
import style from './game.module.css'
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const getData = async () => {
    const data = await fetch(`http://localhost:3000/api/allgame`, { cache: 'no-store' })
    if (!data.ok) {
        throw new Error("Something went wrong");
    }
    return data.json();
}

const getRandomGames = (games) => {
    const shuffled = games.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
}


const Game = ({ tag }) => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData();
            const randomGames = getRandomGames(data);
            setGames(randomGames);
        };
        fetchData();
    }, []);

    console.log(games);

    return (
        <ul className={style.container}>
            {games.slice(0, 6).map((game) => (
                <li key={game.idGame} className={style.item}>
                    <div className={style.warpLink}>
                        <Link className={style.linkContainer} href={game.path}>
                            <div className={style.gameName}>{game.tenGame}</div>
                            <Image className={style.img} src={game.img} fill alt="" />
                        </Link>
                    </div>
                </li>
            ))}
        </ul>
    );
}
export default Game