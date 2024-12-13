'use client'
import style from './registerform.module.css'
import { useState } from 'react';
import Link from 'next/link';
import { register } from '@/lib/action';
import { useFormState } from 'react-dom';



const RegisterForm = () => {
    const [focus, setFocus] = useState(null);
    const [state, formAction] = useFormState(register, undefined);

    if (state?.success) {
        window.location.href = "/login";
    }
    const handleFocus = (field) => {
        setFocus(field);
    }
    const handleBlur = () => {
        setFocus(null);
    }
    console.log(state?.error1);

    return (
        <div>
            <form className='w-[100%]' action={formAction}>
                <div className={'flex justify-center items-start flex-col w-[100%] mt-[0.5rem]'}>
                    <div className={`${style.inputWrap} ${focus === 'userName' ? style.border : ''}`}>
                        <input className="outline-none text-[1rem] w-[350px] font-[700] text-[#f9faff] bg-transparent p-0" type="text"
                            placeholder="User Name"
                            onFocus={() => handleFocus('userName')}
                            onBlur={handleBlur}
                            name='userName'
                        />
                    </div>
                </div>
                {state?.error3 ? (
                    <div className='text-red-600'>
                        {state?.error3}
                    </div>
                ) : ""}
                {state?.error5 ? (
                    <div className='text-red-600'>
                        {state?.error5}
                    </div>
                ) : ""}
                {state?.error8 ? (
                    <div className='text-red-600'>
                        {state?.error8}
                    </div>
                ) : ""}
                {state?.error9 ? (
                    <div className='text-red-600'>
                        {state?.error9}
                    </div>
                ) : ""}
                <div className={'flex justify-center items-start flex-col w-[100%] mt-[0.5rem]'}>
                    <div className={`${style.inputWrap} ${focus === 'email' ? style.border : ''}`}>
                        <input className="outline-none text-[1rem] w-[100%] font-[700] text-[#f9faff] bg-transparent p-0" type="email"
                            placeholder="Email"
                            onFocus={() => handleFocus('email')}
                            onBlur={handleBlur}
                            name='email'
                        />
                    </div>
                </div>
                {state?.error4 ? (
                    <div className='text-red-600'>
                        {state?.error4}
                    </div>
                ) : ""}
                <div className={'flex justify-center items-start flex-col w-[100%] mt-[0.5rem]'}>
                    <div className={`${style.inputWrap} ${focus === 'password' ? style.border : ''}`}>
                        <input className="outline-none text-[1rem] w-[350px] font-[700] text-[#f9faff] bg-transparent p-0" type="password"
                            placeholder="Password"
                            onFocus={() => handleFocus('password')}
                            onBlur={handleBlur}
                            name='password'
                        />
                    </div>
                </div>
                {state?.error10 ? (
                    <div className='text-red-600'>
                        {state?.error10}
                    </div>
                ) : ""}
                <div className={'flex justify-center items-start flex-col w-[100%] mt-[0.5rem]'}>
                    <div className={`${style.inputWrap} ${focus === 'passwordRepeat' ? style.border : ''}`}>
                        <input className="outline-none text-[1rem] w-[350px] font-[700] text-[#f9faff] bg-transparent p-0" type="password"
                            placeholder="Re-enter Password"
                            onFocus={() => handleFocus('passwordRepeat')}
                            onBlur={handleBlur}
                            name='passwordRepeat'
                        />
                    </div>
                </div>
                {state?.error2 ? (
                    <div className='text-red-600'>
                        {state?.error2}
                    </div>
                ) : ""}
                <div className={'flex justify-center items-start flex-col w-[100%] mt-[0.5rem]'}>
                    <div className={`${style.inputWrap} ${focus === 'nation' ? style.border : ''}`}>
                        <input className="outline-none text-[1rem] w-[350px] font-[700] text-[#f9faff] bg-transparent p-0" type="text"
                            placeholder="Nation"
                            onFocus={() => handleFocus('nation')}
                            onBlur={handleBlur}
                            name='nation'
                        />
                    </div>
                </div>
                {state?.error1 ? (
                    <div className='text-red-600'>
                        {state?.error1}
                    </div>
                ) : ""}
                <div className="w-[100%] mt-[2rem]">
                    <button className="bg-[#6842ff] text-[#f9faff] hover:bg-[#8668ff] rounded-[30px] flex justify-center items-center font-[700] text-[1rem] px-[0.5rem] py-[1rem] w-[100%] ">Register</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm