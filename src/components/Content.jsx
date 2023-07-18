import { useEffect, useRef, useState } from 'react';
import TodoItems from './TodoItems';

const getItems = () => {
    const lists = localStorage.getItem('List')
    if (lists) {
        return JSON.parse(localStorage.getItem('List'))
    } else {
        return []
    }
}

function Content() {

    const [input, setInput] = useState('');
    const [items, setItems] = useState(getItems());
    const [toggleIcon, setToggleIcon] = useState(true);
    const [updateList, setUpdateList] = useState(null);
    const inputRef = useRef(null)

    const AddItems = () => {
        if (!input) {
            alert('Please Enter a Task')
        } else if (input && !toggleIcon) {
            setItems(
                items.map((elem) => {
                    if (elem.id === updateList) {
                        return { ...elem, name: input }
                    }
                    return elem
                })
            )
            setToggleIcon(true)
            setInput('')
            setUpdateList(null)
        }
        else {
            let allData = { id: new Date().getTime().toString(), name: input }
            setItems([...items, allData])
            setInput('')
        }
    };

    const deleteItems = (index) => {
        const deletedList = items.filter((elem) => {
            return index !== elem.id
        })
        setItems(deletedList)
    }

    useEffect(() => {
        localStorage.setItem('List', JSON.stringify(items))
    }, [items])

    const editList = (id) => {
        const editedItem = items.find((elem) => {
            return elem.id === id
        })

        setToggleIcon(false)
        setInput(editedItem.name)
        setUpdateList(id)
        inputRef.current.focus();
    }

    const handleChecked = (id) => {
        setItems((prevItems) => {
            return prevItems.map((item) => {
                if (item.id === id) {
                    return { ...item, checked: !item.checked };
                }
                return item;
            });
        });
    };

    return (
        <div className='parent pt-5'>
            <div className='inp-div w-50'>
                <div className="mb-2 w-100 d-flex align-items-center">
                    <input type="Text" className="form-control border-0 border-bottom rounded-0 mb-2" placeholder="Enter Quick Task Here" value={input} onChange={(e) => setInput(e.target.value)} ref={inputRef} />
                    {toggleIcon ?
                        <span className='material-symbols-outlined rounded-5 border-0 bg-white p-2 fw-semibold fs-3' title='Add Items' onClick={AddItems}>add</span> :
                        <span className="material-symbols-outlined fs-4 edit-btn bg-white p-2 rounded-5" onClick={AddItems}>edit</span>}
                </div>
            </div>
            <div className='content w-50'>
                <div className="listitem">
                    {items.map((itemVal) => {
                        return (<TodoItems
                            key={itemVal.id}
                            id={itemVal.id}
                            todoItem={itemVal.name}
                            deleteItems={deleteItems}
                            toggleIcon={editList}
                            checked={itemVal.checked || false}
                            handleChecked={handleChecked}
                        />)
                    })}
                </div>

            </div>
        </div>
    )
}

export default Content;