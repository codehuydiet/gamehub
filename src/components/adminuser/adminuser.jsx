import { connectToDb } from '@/lib/utils'
import style from './adminuser.module.css'
import { createUser, deleteUser } from '@/lib/action';
import Adminusercomponent from './adminusercomponent/Adminusercomponent'

const getData = async () => {
    const data = await fetch(`${process.env.DOMAIN}/api/users`, { cache: 'no-store' })
    if (!data.ok) {
        throw new Error("Somthing went wrong");
    }
    return data.json();
}
var result = {}
const AdminUser = async () => {
    const data = await getData();
    return (
        <div className={style.container}>
            <div className={style.data}>
                {data.map((data) => (
                    <div className={style.item} key={data._id}>
                        {data.userName}
                        <form action={deleteUser}>
                            <button className={style.delete} type="submit" name="action" value={data._id}>Delete</button>
                        </form>
                    </div>
                ))}
            </div>
            <Adminusercomponent data={data}></Adminusercomponent>
        </div>
    )
}
export default AdminUser