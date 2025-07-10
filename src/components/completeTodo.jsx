import '../App.css'

import { AiFillDelete } from "react-icons/ai"

function CompleteTodo({ complete, setComplete }) {

    const removetodo4 = id => {
        const del = [...complete].filter(s => s.id !== id)           //remove from complete todo
        setComplete(del)
        console.log(del)
    }
    return (


        <div >
            <div className="w-96 border-green  border-2 p-2 text-center">
                <h1 className="myanni text-green">COMPLETE</h1>

            </div>


            {
                complete.map((t, i) => (
                    <div className="w-96 border-r-2 border-green  p-3">

                        <ul className="flex justify-between text-white list-none">
                            <li key={i}>{t.title}</li>

                            <div className="flex ">
                                <AiFillDelete className="del-btn text-red  cursor-pointer " onClick={() => removetodo4(t.id)} />


                            </div>
                        </ul>
                    </div>

                ))
            }
        </div>

    )
}
export default CompleteTodo