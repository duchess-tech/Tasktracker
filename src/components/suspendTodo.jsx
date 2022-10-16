
import { AiFillDelete } from "react-icons/ai"
function SuspendTodo({ complete, start, suspend, setsuspend, todo }) {


    const removetodo3 = id => {
        const del = [...suspend].filter(s => s.id !== id)           //remove from suspend todo
        props.setsuspend(del)
        console.log(del)
    }

    const startsuspend = (id) => {
        const sort = suspend.find((sr) => sr.id === id)
        start.push(sort)                                                    // from suspend to start
        const delsort = [...suspend].filter(todos => todos.id !== id)
        setsuspend(delsort)

    }
    const completesuspend = (id) => {
        const sort = suspend.find((sr) => sr.id === id)
        complete.push(sort)
        const delsort = [...suspend].filter(todos => todos.id !== id)           // from suspend to complete
        setsuspend(delsort)

    }
    return (

        <div className="suspend-todo">
            <h1 className="myanni suspend-l"> SUSPENDED</h1>


            {
                suspend.map((t, i) => (
                    <ul className="action-div">
                        <li key={i}>{t.title}</li>


                        <div className="action">
                            <AiFillDelete className="delete-icon" onClick={() => removetodo3(t.id)} />
                            <button className="start" onClick={() => startsuspend(t.id)}> </button>
                            <button className="complete" onClick={() => completesuspend(t.id)}> </button>

                        </div>
                    </ul>
                ))
            }
        </div>

    )
}
export default SuspendTodo