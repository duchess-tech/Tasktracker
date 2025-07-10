import { AiFillDelete } from "react-icons/ai"
function SuspendTodo({ complete, start, suspend, setsuspend, todo }) {


    const removetodo3 = id => {
        const del = [...suspend].filter(s => s.id !== id)           //remove from suspend todo
        setsuspend(del)
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
        <div className='sm:mb-9'>
            <div className="w-96 border-sky  border-2 p-2 text-center ">
                <h1 className="myanni text-sky"> SUSPENDED</h1>
            </div>
            {
                suspend.map((t, i) => (
                    <div className="w-96 border-r-2 border-sky p-3 ">

                        <ul className="flex justify-between text-white list-none">
                            <li key={i}>{t.title}</li>


                            <div className="flex">
                                <AiFillDelete className="del-btn text-red  cursor-pointer" onClick={() => removetodo3(t.id)} />
                                <button className="bg-blueop   mr-2  rounded-full p-2" onClick={() => startsuspend(t.id)}> </button>
                                <button className="bg-green rounded-full p-2" onClick={() => completesuspend(t.id)}> </button>

                            </div>
                        </ul>
                    </div>

                ))
            }

        </div>)
}
export default SuspendTodo
