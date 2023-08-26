'use client'

import { BiEdit } from 'react-icons/bi'
import { BiTrash } from 'react-icons/bi'
import Modal from './Modal'
import { useState } from 'react'
import { useRouter } from "next/navigation"
import { deleteTodo, editTodo } from '../../../api'


const Task = ({ task }) => {
    const router = useRouter();
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDeleted, setOpenModalDeleted] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(task.text);


    const handleSubmitEditTodo = async (e) => {
        e.preventDefault();
        await editTodo({
            id: task.id,
            text: taskToEdit,
        });
        setOpenModalEdit(false);
        router.refresh();
    };

    const handleDeleteTask = async (id) => {
        await deleteTodo(id)
        setOpenModalDeleted(false)
        router.refresh();

    }

    return (
        <tr key={task.id}>
            <td className=' w-full'>{task.text}</td>
            <td className='flex gap-5'>
                <BiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className=' text-blue-800' size={20} />
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handleSubmitEditTodo}>
                        <h3 className='font-bold text-lg'>Edit task</h3>
                        <div className='modal-action'>
                            <input
                                value={taskToEdit}
                                onChange={(e) => setTaskToEdit(e.target.value)}
                                type='text'
                                placeholder='Type here'
                                className='input input-bordered w-full'
                            />
                            <button type='submit' className='btn'>
                                Submit
                            </button>
                        </div>
                    </form>
                </Modal>

                <BiTrash onClick={() => setOpenModalDeleted(true)} cursor="pointer" className=' text-red-600' size={20} />
                <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
                    <h3 className='text-lg'>Are you sure?</h3>
                    <div className='modal-action'>
                        <button
                        onClick={() => handleDeleteTask(task.id)}
                        className='btn'>
                            Yes
                        </button>
                    </div>
                </Modal>
            </td>
        </tr>
    )
}
export default Task