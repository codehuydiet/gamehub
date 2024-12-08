import Image from "next/image";
import style from './listgame.module.css';
import TagGame from "./taggame/taggame";
import Link from "next/link";
const ListGame = async () => {
    return (
        <div className={style.container}>
            <TagGame></TagGame>
        </div>
    )
}

export default ListGame