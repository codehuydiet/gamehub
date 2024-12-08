import StaticGame from '@/components/staticgame/staticgame';
import style from './home.module.css'
import ListGame from '@/components/listgame/listgame';

const Home = () => {
  return (
    <div className={style.container}>
      <div className={style.staticGame}>
        <StaticGame />
      </div>
      <div className={style.contentContainer}>
        <ListGame />
      </div>
    </div >
  );
}

export default Home
