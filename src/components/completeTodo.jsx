import '../App.css'

import { AiFillDelete } from "react-icons/ai"

function CompleteTodo({ complete, setComplete }) {

    const removetodo4 = id => {
        const del = [...complete].filter(s => s.id !== id)           //remove from complete todo
        setComplete(del)
        console.log(del)
    }
    return (
        <div className="complete-todo">
            <h1 className="myanni complete-l">COMPLETE</h1>


            {
                complete.map((t, i) => (
                    <ul className="action-div">
                        <li key={i}>{t.title}</li>


                        <div className="action">
                            <AiFillDelete className="delete-icon" onClick={() => removetodo4(t.id)} />


                        </div>
                    </ul>
                ))
            }
        </div>

    )
}
export default CompleteTodo