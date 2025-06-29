import { useState } from 'react';
import { GlobalContext } from './GlobalContext';

export default function GlobalState({ children }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    const [blogList, setBlogList] = useState([]);
    const [pending, setPending] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    return (
        <GlobalContext.Provider
            value={{
                formData,
                setFormData,
                blogList,
                setBlogList,
                pending,
                setPending,
                isEdit,
                setIsEdit,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
