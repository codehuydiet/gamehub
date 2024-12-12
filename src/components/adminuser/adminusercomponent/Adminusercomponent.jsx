"use client"
import React from 'react'
import style from '../adminuser.module.css'
import { useFormState } from 'react-dom';
import { createUser, deleteUser } from '@/lib/action';

const Adminusercomponent = ({data}) => {
    const [state, formAction] = useFormState(createUser, undefined);
    console.log(state);

    return (
        <div className={style.modify}>
            <form
                className={style.form}
                action={formAction}
            >
                <input className={style.input} name='userName' type="text" placeholder='userName' />
                {state?.error3 ? (
                    <div className='text-red-600'>
                        {state?.error3}
                    </div>
                ) : ""}
                <input className={style.input} name='email' type="text" placeholder='email' />
                {state?.error4 ? (
                    <div className='text-red-600'>
                        {state?.error4}
                    </div>
                ) : ""}
                <input className={style.input} name='password' type="text" placeholder='password' />
                <input className={style.input} name='isAdmin' type="text" placeholder='isAdmin' />
                <input className={style.input} name='nation' type="text" placeholder='nation' />
                {state?.error1 ? (
                    <div className='text-red-600'>
                        {state?.error1}
                    </div>
                ) : ""}
                <button className={style.button}>Create</button>
            </form>
            <div className={style.stats}>Tổng có {data.length} dữ liệu</div>
        </div>
    )
}

export default Adminusercomponent