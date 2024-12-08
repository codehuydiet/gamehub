import style from './taggame.module.css'
import Link from "next/link";
import List from './list/list';

const getData = async () => {
    const res = await fetch(`${process.env.DOMAIN}/api/tag`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error("Something went wrong");
    }
    return res.json();
}

const TagGame = async () => {
    // console.log(1);
    const data = await getData();
    // console.log(data[0]);
    return (
        <div className={style.container}>
            {data.slice(0, 10).map((type) => (
                <div className={style.wrapContainer} key={type.idType}>
                    <div className={style.labelContainer}>
                        <h2 className={style.nameTag}>{type.tagName}</h2>
                        <Link className={style.viewMore} href={type.path}>View more</Link>
                    </div>
                    <List tag={type._id}></List>
                </div>
            ))}
        </div>
    )
}

export default TagGame