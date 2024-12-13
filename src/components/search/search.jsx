'use client'
import { useState, useRef } from 'react';
import { getGame } from '../../lib/action'; // Import the getGame function
import style from './search.module.css';
import Link from 'next/link';

const Search = () => {
    const [results, setResults] = useState([]);
    const [searching, setSearching] = useState(false)
    const [value, setValue] = useState('') // State to hold search results

    const resultsRef = useRef(null); // Create a ref for the results container

    const handleSearch = async (e) => {
        const query = e.target.value;
        setValue(query)
        if (query.length < 1) {
            setResults([]); 
            return;
        }
        try {
            const games = await getGame(query); 
            setResults(games);
        } catch (error) {
            console.error("Error fetching games:", error);
        }
    };

    const handleFocus = () => {
        setSearching(true)
    };

    const handleBlur = (e) => {
        // Check if the click is outside the results container
        if (resultsRef.current && !resultsRef.current.contains(e.relatedTarget)) {
            setSearching(false);
        }
    };

    return (
        <div className={style.inputContainer}>
            <div className={style.inputWrap}>
                <div className='flex'>
                    <input
                        type="text"
                        className={style.input}
                        placeholder="Search"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleSearch}
                    />
                    <div className={style.searchContainer}>
                        <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" className={style.search}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.5 4C6.91015 4 4 6.91015 4 10.5C4 14.0899 6.91015 17 10.5 17C14.0899 17 17 14.0899 17 10.5C17 6.91015 14.0899 4 10.5 4ZM2 10.5C2 5.80558 5.80558 2 10.5 2C15.1944 2 19 5.80558 19 10.5C19 15.1944 15.1944 19 10.5 19C5.80558 19 2 15.1944 2 10.5Z"></path>
                            <path fillRule="evenodd" clipRule="evenodd" d="M15.2929 15.2929C15.6834 14.9024 16.3166 14.9024 16.7071 15.2929L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L15.2929 16.7071C14.9024 16.3166 14.9024 15.6834 15.2929 15.2929Z"></path>
                        </svg>
                    </div>
                </div>
                {searching ? (
                    value ? (
                        <div ref={resultsRef} onFocus={handleFocus} onBlur={handleBlur} className='bg-[#373952] flex flex-col p-6 gap-4 rounded-xl min-h-[400px] overflow-auto'>
                            {results.length > 0 && (
                                <ul>
                                    {results.map(game => (
                                        <li key={game._id}>
                                            <div className='flex gap-2 hover:bg-[#42445e] p-2'>
                                                <img src={game.img} alt="" width={70} height={70} />
                                                <Link href={game.path} onClick={() => setSearching(false)}>{game.name}</Link>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ) : (
                        <div ref={resultsRef} onFocus={handleFocus} onBlur={handleBlur} className='bg-[#373952] flex justify-center items-center p-6 gap-4 rounded-xl min-h-[400px] overflow-auto'>
                            <p>No result found</p>
                        </div>
                    )
                ) : ''}
            </div>
        </div >
    );
};

export default Search;