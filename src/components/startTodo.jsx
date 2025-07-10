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

        <div className='sm:mb-9'>
            <div className="w-96 p-2 border-2 border-blueop text-center">
                <h1 className="myanni text-blueop  border-blueop" >START</h1>
            </div>            {
                start.map((t, i) => (
                    <div className="w-96 border-r-2 border-blueop  p-3 ">

                        <ul className="flex justify-between text-white  list-none">
                            <li key={i}>{t.title}</li>


                            <div className="flex">
                                <AiFillDelete className="del-btn text-red cursor-pointer" onClick={() => removetodo2(t.id)} />

                                <button className="bg-blue mr-2 rounded-full p-2" onClick={() => suspendstart(t.id)}></button>
                                <button className="bg-green  rounded-full p-2" onClick={() => completestart(t.id)}> </button>
                            </div>
                        </ul>
                    </div>

                ))
            }

        </div>)
}
export default StartTodo
