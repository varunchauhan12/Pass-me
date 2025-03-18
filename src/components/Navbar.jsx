import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-yellow-500 h-14 items-center '>
            <span className=' 
logo font-bold mx-3 inline-flex animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-xl text-transparent'>
      PassME
    </span>
        <div className="navbarlist flex">
            <button className='text-white bg-green-700 my-5 mx-2 rounded-full flex  justify-between items-center ring-white ring-1'> 
                    <img className='invert  w-10 p-1' src="github.svg" alt="github logo" />
                    <span className='font-bold px-2'>GitHub</span>
                    
                </button>

        </div>
    </nav>
  )
}

export default Navbar;
