import React from 'react'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent z-20 ">
      <div className="h-20 flex items-center justify-center">
        <h1 className="text-white text-base font-bold cursor-pointer lg:mr-24"
            style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.25)' }}
        >
          Drake Related
        </h1>
      </div>
    </nav>
  )
}

export default Navbar
