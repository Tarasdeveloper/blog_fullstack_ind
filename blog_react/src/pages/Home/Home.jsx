import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import axios from 'axios';
import styles from './Home.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const { blogList, setBlogList, pending, setPending } =
        useContext(GlobalContext);
    const navigate = useNavigate();

    async function fetchListOfBlogs() {
        setPending(true);
        try {
            const response = await axios.get('http://localhost:5000/api/blogs');
            const result = response.data;

            console.log(result);

            if (result && result.blogList && result.blogList.length > 0) {
                setBlogList(result.blogList);
            } else {
                setBlogList([]);
            }
        } catch (error) {
            console.error('Ошибка при получении блогов:', error);
            setBlogList([]);
        } finally {
            setPending(false);
        }
    }

    useEffect(() => {
        fetchListOfBlogs();
    }, []);

    async function handleDelete(currentId) {
        const response = await axios.delete(
            `http://localhost:5000/api/blogs/delete/${currentId}`
        );
        const result = await response.data;

        if (result?.message) {
            fetchListOfBlogs();
        }
    }
    async function handleEdit(currentItem) {
        console.log(currentItem);
        navigate('/addBlog', { state: { currentItem } });
    }

    return (
        <div className={styles.wrapper}>
            <h1>Blog List</h1>
            {pending ? (
                <h1>Loading Blogs! Please wait</h1>
            ) : (
                <div className={styles.blogList}>
                    {blogList && blogList.length ? (
                        blogList.map((item) => (
                            <div className={styles.blogItem} key={item._id}>
                                <p>{item.title}</p>
                                <p>{item.description}</p>
                                <button
                                    onClick={() => handleEdit(item)}
                                    type="button"
                                >
                                    <FaEdit size={25} />
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    type="button"
                                >
                                    <FaTrash size={25} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <h3>No Blogs Added</h3>
                    )}
                </div>
            )}
        </div>
    );
}
