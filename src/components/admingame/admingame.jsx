import { createGame, deleteGame } from '@/lib/action';
import style from './admingame.module.css'
import Admingameform from './form/admingameform';

const getData = async () => {
    const data = await fetch(`${process.env.DOMAIN}/api/allgame`, { cache: 'no-store' })
    if (!data.ok) {
        throw new Error("Somthing went wrong");
    }
    return data.json();
}

const AdminGame = async () => {
    const data = await getData();
    return (
        <div className={style.container}>
            <div className={style.data}>
                {data.map((data) => (
                    <div className={style.item} key={data._id}>
                        {data.name}
                        <form action={deleteGame}>
                            <button className={style.delete} type="submit" name="action" value={data._id}>Delete</button>
                        </form>
                    </div>
                ))}
            </div>
            <Admingameform data={data}>

            </Admingameform>
        </div>
    )
}
export default AdminGame