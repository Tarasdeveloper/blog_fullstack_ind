import { Link } from 'react-router-dom';
import style from './Header.module.css';

export default function Header() {
    return (
        <div className={style.header}>
            <h3>Mern Blog App</h3>
            <ul>
                <li className={style.item}>
                    <Link to={'/'}>Home</Link>
                </li>
                <li className={style.item}>
                    <Link to={'/addBlog'}>Add Blog</Link>
                </li>
            </ul>
        </div>
    );
}
