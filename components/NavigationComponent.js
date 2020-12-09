import { useState } from 'react'

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <nav className="flex justify-between items-center w-full z-50 p-5 text-md top-0 bg-white border-none px-4 uppercase">
                <button className="block lg:hidden" onClick={()=>setMobileOpen(!mobileOpen)}>
                    <img className="h-8" src="https://raw.githubusercontent.com/encharm/Font-Awesome-SVG-PNG/3cfbcdaff9818c3e2c07d755d556fe1f34d7cf0d/black/svg/bars.svg" />
                </button>
                <a href="/">
                    <h4 className="text-blue-500 font-semibold text-lg">Health Explore</h4>
                </a>
                <ul className="hidden lg:flex space-x-10 font-semibold text-sm">
                    <li> <a href="#">Profile</a></li>
                    <li> <a href="#">Jobs</a> </li>
                    <li> <a href="#">Professional Network</a> </li>
                    <li> <a href="#">Lounge</a></li>
                    <li> <a href="#">Salary</a></li>
                </ul>
                <div className="flex space-x-6 items-center">
                    <a href="#" className="hidden lg:flex btn-blue-outline p-2 border-2 rounded-lg border-opacity-100 text-opacity-100 text-sm">CREATE JOB</a>
                    <span className="inline-block relative">
                        <button className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm border-2">
                            JO  
                        </button>
                        <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-600 border-2 border-white text-xs flex items-center justify-center text-white font-thin">
                            2
                        </span>
                    </span>
                    <h4 className="hidden lg:flex text-sm font-semibold"><a href="#">Logout</a> </h4>
                </div>
            </nav>
            { mobileOpen && <ul className="flex lg:hidden flex-col bg-white items-center space-y-2 pb-4 uppercase ">
                <li className="py-2 mx-4"><a href="#"> Profile</a></li>
                <li className="py-2 mx-4"><a href="#">Jobs</a></li>
                <li className="py-2 mx-4"><a href="#"> Professional Network</a></li>
                <li className="py-2 mx-4"><a href="#"> Lounge</a></li>
                <li className="py-2 mx-4"><a href="#">Salary</a></li>
                <li className="py-2 mx-4"><a href="#" className="create-job">CREATE JOB</a></li>
                <h4 className="py-2 mx-4"><a href="#">Logout</a></h4>
            </ul>  }
        </>
    )
}