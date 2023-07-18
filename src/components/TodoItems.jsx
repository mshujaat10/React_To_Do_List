import { useState } from "react";

function TodoItems(props) {
    const [checked,setChecked] = useState(props.checked);

    const doneItems = ()=>{
        setChecked(!checked)
        props.handleChecked(props.id);
    }

    return (
        <>
            <div className="d-flex justify-content-between my-3 align-items-end">
                <li className={`list-unstyled itemlists px-2-sm px-4 py-2 ${checked?"text-decoration-line-through opacity-75":""}`}>
                    <span className="material-symbols-outlined border rounded-5 bg-success fs-6 text-white me-2" onClick={doneItems}>
                        check
                    </span>
                    {props.todoItem}
                </li>
                <div className="d-flex align-items-center">
                    <span className={`material-symbols-outlined fs-4 edit-btn ${checked?"d-none":""}`} onClick={() => props.toggleIcon(props.id)}>edit</span>
                    <span className="material-symbols-outlined delete" onClick={() => { props.deleteItems(props.id) }}>delete</span>
                </div>
            </div>
        </>
    )
}

export default TodoItems;