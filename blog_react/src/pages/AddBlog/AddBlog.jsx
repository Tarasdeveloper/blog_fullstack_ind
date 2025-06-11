import { useContext, useEffect } from 'react';
import styles from './AddBlog.module.css';
import { GlobalContext } from '../../context/GlobalContext';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AddBlog() {
    const { formData, setFormData, isEdit, setIsEdit } =
        useContext(GlobalContext);
    const navigate = useNavigate();
    const location = useLocation();

    async function saveBlogToDB(e) {
        e.preventDefault();
        const response = isEdit
            ? await axios.put(
                  `http://localhost:5000/api/blogs/update/${location.state.currentItem._id}`,
                  {
                      title: formData.title,
                      description: formData.description,
                  }
              )
            : await axios.post('http://localhost:5000/api/blogs/add', {
                  title: formData.title,
                  description: formData.description,
              });

        const result = await response.data;
        console.log(result);

        if (result) {
            setIsEdit(false);
            setFormData({ title: '', description: '' });
            navigate('/');
        }
    }

    useEffect(() => {
        console.log(location);
        if (location.state) {
            const { currentItem } = location.state;
            setIsEdit(true);
            setFormData({
                title: currentItem.title || '',
                description: currentItem.description || '',
            });
        }
    }, [location]);

    return (
        <div className={styles.addWrapper}>
            <h1>{isEdit ? 'Edit a Blog' : 'Add New Blog'}</h1>
            <form className={styles.formWrapper}>
                <input
                    className={styles.inputField}
                    type="text"
                    name="title"
                    placeholder="Enter Blog Title"
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                    }
                />
                <textarea
                    className={styles.textareaField}
                    name="description"
                    id="description"
                    placeholder="Enter Blog Description"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value,
                        })
                    }
                ></textarea>
                <button onClick={saveBlogToDB} className={styles.formButton}>
                    {isEdit ? 'Update Blog' : 'Add New Blog'}
                </button>
            </form>
        </div>
    );
}
