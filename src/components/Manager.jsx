import React, { useRef, useState, useEffect } from 'react'
import { Player } from '@lordicon/react'
import addIcon from '../assets/add-icon.json'
import { FaCopy } from "react-icons/fa";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Deletekey from '../assets/delete.json';
import Edit from '../assets/edit.json';
import { v4 as uuidv4 } from 'uuid';




const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const editRefs = useRef({});
    const playerRef = useRef(null);
    const deleteRefs = useRef({});
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])


    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("show.svg")) {
            ref.current.src = "public/unpreview.svg"
            passwordRef.current.type = "password"

        } else {
            ref.current.src = "public/show.svg"
            passwordRef.current.type = "text"
        }
    }

    const savePassword = () => {
               if(form.site.length >3 && form.username.length >3 &&form.password.length >3){

            setpasswordArray([...passwordArray, {...form, id: uuidv4()}])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
            console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
            toast('Password saved!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    else{
        toast('Error: Password not saved!');
    }

    }

    const deletePassword = (id) => {
        toast('Password deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        console.log('deleting the password with id:', id);
        let c = confirm("want to delete this password?")
        if (c) {

            setpasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))

        }

    }

    const editPassword = (id) => {
        console.log('editing the password with id', id);
        setform(passwordArray.filter(item => item.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id !== id))

    }


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        navigator.clipboard.writeText(text)
    }






    return (



        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}

            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
            </div>
            <div className="container overflow-auto  mx-auto text-center bg-slate-300 max-w-5xl my-10 rounded-lg p-5 h-150 hover:shadow-2xl transition-shadow duration-300">
                <div className='text-violet-500 text-center font-semibold text-lg'>
                    YouR Own PassWord Manager!
                </div>

                <div className='flex flex-col p-4 gap-5.5'>
                    <input name='site' value={form.site} onChange={handleChange} placeholder='Enter Website URL( lenght should be 3 atleast )' className='bg-white  rounded-full border-2 border-green-400 text-black px-4 py-1' type="text" />
                    <div className="flex gap-2 justify-around md:flex-row flex-col">
                        <input name='username' value={form.username} onChange={handleChange} placeholder='Enter UserName( lenght should be 3 atleast ) ' className='bg-white w-full rounded-full border-2 text-black px-4 py-1 border-green-400' type="text" />
                        <div className="relative right-0 flex">
                            <input ref={passwordRef} name='password' value={form.password} onChange={handleChange} placeholder='Enter Password' className='bg-white w-full rounded-full text-black px-4 py-1 border-2 border-green-400' type="password" />
                            <span className='absolute right-0 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className=" p-1.5 " src="public/show.svg" alt="" />
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        className="flex border-2 border-green-800 items-center text-center gap-2 bg-green-100 px-4 py-2 rounded-full hover:bg-green-200 transition-colors"
                        onMouseEnter={() => playerRef.current?.playFromBeginning()}
                        onMouseLeave={() => playerRef.current?.goToFirstFrame()}
                        onClick={savePassword}
                    >
                        <Player
                            ref={playerRef}
                            icon={addIcon}
                            size={44}
                            colorize="#00000"
                            state="hover-adding-files" // Match the marker name from JSON
                        />
                        Add Password!
                    </button>
                </div>

                <div className="passwords">
                    <h2 className='font-semibold text-xl py-3 '> Your passwords </h2>
                    {passwordArray.length === 0 && <div> No passwords to show </div>}
                    {passwordArray.length !== 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden mb-10 ">
                            <thead className='bg-violet-700 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-violet-200'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='  py-2 border-1 border-white text-center'>
                                            <div onClick={() => { copyText(item.site) }} className='copyicon flex items-center justify-center'>

                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <div className='size-5 cursor-pointer px-2.5'> <FaCopy />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='  py-2 border-1 border-white text-center '>
                                            <div onClick={() => { copyText(item.username) }} className='copyicon flex items-center justify-center'>

                                                {item.username}
                                                <div className='size-5 cursor-pointer px-2.5'> <FaCopy />
                                                </div>
                                            </div>
                                        </td>
                                        <td className=' py-2 border-1 border-white text-center '>
                                            <div onClick={() => { copyText(item.password) }} className='copyicon flex items-center justify-center'>

                                                {item.password}
                                                <div className='size-5 cursor-pointer px-2.5'> <FaCopy />
                                                </div>
                                            </div>
                                        </td>
                                        <td className=' py-2 border-1 border-white text-center '>
                                            <div className='flex items-center justify-around'>

                                                <div
                                                    className="cursor-pointer"
                                                    onMouseEnter={() => editRefs.current[index]?.playFromBeginning()}
                                                    onMouseLeave={() => editRefs.current[index]?.goToFirstFrame()}
                                                    onClick={() => { editPassword(item.id) }}
                                                >
                                                    <Player
                                                        ref={(el) => editRefs.current[index] = el}
                                                        icon={Edit}
                                                        size={32}
                                                        colorize="#00000" // Changed to green to match theme
                                                        state="hover-line"
                                                    />
                                                </div>
                                                <div
                                                    className='flex items-center justify-center cursor-pointer'

                                                    onMouseEnter={() => deleteRefs.current[index]?.playFromBeginning()}
                                                    onMouseLeave={() => deleteRefs.current[index]?.goToFirstFrame()}
                                                    onClick={() => { deletePassword(item.id) }}
                                                >
                                                    <Player
                                                        ref={(el) => deleteRefs.current[index] = el}
                                                        icon={Deletekey}
                                                        size={28}
                                                        colorize="#FF5757"
                                                        state="hover-trash" // May need adjustment based on your JSON
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>}
                </div>
            </div>
        </>
    )
}

export default Manager;