import { AiFillDelete } from "react-icons/ai"
function StartTodo({ complete, suspend, start, setStart, todo }) {


    const removetodo2 = id => {
        const del = [...start].filter(s => s.id !== id)            //remove from start todo
        setStart(del)
        console.log(del)
    }
    const suspendstart = (id) => {
        const sort = start.find((ss) => ss.id === id)
        suspend.push(sort)
        const del = [...todo].filter(todos => todos.id !== id)
        setStart(del)
    }
    const completestart = (id) => {
        const sort = start.find((cs) => cs.id === id)
        console.log(sort)

        complete.push(sort)
        const del = [...todo].filter(todos => todos.id !== id)
        setStart(del)
    }


    return (

        <div className="start-todo ">
            <h1 className="myanni start-l" >START</h1>
            {
                start.map((t, i) => (
                    <ul className="action-div">
                        <li key={i}>{t.title}</li>


                        <div className="action">
                            <AiFillDelete className="delete-icon" onClick={() => removetodo2(t.id)} />

                            <button className="suspend" onClick={() => suspendstart(t.id)}></button>
                            <button className="complete" onClick={() => completestart(t.id)}> </button>
                        </div>
                    </ul>
                ))
            }
        </div>

    )
}
export default StartTodo