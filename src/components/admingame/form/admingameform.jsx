"use client"

import React from 'react'
import style from '../admingame.module.css'
import { createGame, deleteGame } from '@/lib/action';
import { useFormState } from 'react-dom';

const Admingameform = ({ data }) => {
    const [state, formAction] = useFormState(createGame, undefined);
    console.log(state);
    return (
        <div className={style.modify}>
            <form className={style.form} action={formAction}>
                <input className={style.input} name='name' type="text" placeholder='name' />
                {state?.error1 ? (
                    <div className='text-red-600'>
                        {state?.error1}
                    </div>
                ) : ""}
                {state?.error7 ? (
                    <div className='text-red-600'>
                        {state?.error7}
                    </div>
                ) : ""}
                <input className={style.input} name='embed' type="text" placeholder='embed' />
                {state?.error2 ? (
                    <div className='text-red-600'>
                        {state?.error2}
                    </div>
                ) : ""}
                {state?.error8 ? (
                    <div className='text-red-600'>
                        {state?.error8}
                    </div>
                ) : ""}
                <input className={style.input} name='technology' type="text" placeholder='technology' />
                <input className={style.input} name='platforms' type="text" placeholder='platforms' />
                <input className={style.input} name='img' type="text" placeholder='img' />
                {state?.error3 ? (
                    <div className='text-red-600'>
                        {state?.error3}
                    </div>
                ) : ""}
                {state?.error6 ? (
                    <div className='text-red-600'>
                        {state?.error6}
                    </div>
                ) : ""}
                <input className={style.input} name='path' type="text" placeholder='path' />
                {state?.error4 ? (
                    <div className='text-red-600'>
                        {state?.error4}
                    </div>
                ) : ""}
                {state?.error5 ? (
                    <div className='text-red-600'>
                        {state?.error5}
                    </div>
                ) : ""}
                <button className={style.button}>Create</button>
            </form>
            <div className={style.stats}>Tổng có {data.length} dữ liệu</div>
        </div>
    )
}

export default Admingameform