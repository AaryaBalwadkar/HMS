import { userContext } from '@/App'
import React, { useContext, useState } from 'react'
import UserNavigationPanel from './UserNavigationPanel'

const NavbarComponent = () => {
    const { userAuth, setUserAuth } = useContext(userContext)
    const [userNavPanel, setUserNavPanel] = useState(false)

    return (
        <nav className='flex w-[100vw] h-[70px] z-50'>
            {userAuth.access_token ?
                (<>
                    <div className='flex w-[50vw] place-items-center ml-6'>
                        logo
                    </div>

                    <div className='flex w-[100vw] place-content-end place-items-center' onClick={() => setUserNavPanel(currentVal => !currentVal)} onBlur={() => setTimeout(() => {setUserNavPanel(false)}, 300)}>
                        <button className='mr-[30px] w-10 h-10 bg-red-400 rounded-full'>
                        <img src={userAuth.profile_img} className="w-full h-full object-cover rounded-full"/>
                        </button>
                    </div>

                    { userNavPanel ? <UserNavigationPanel /> : ""}
                </>) 
                : ""
            }
        </nav>
    )
}

export default NavbarComponent
