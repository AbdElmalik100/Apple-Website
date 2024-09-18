import { appleImg, bagImg, searchImg } from '../utils/index'
import { navLists } from '../constants/index'


function Navbar() {
    return (
        <header className='w-full py-5 sm:px-10 px-10 flex justify-between items-center'>
            <nav className='w-full flex items-center screen-max-width'>
                <img src={appleImg} alt="apple" width={14} height={18} />

                <ul className='flex flex-1 items-center justify-center max-sm:hidden gap-10'>
                    {
                        navLists.map((nav, index) => (
                            <li className='text-sm text-gray hover:text-white transition-all' key={index}>
                                <a href="#">
                                    {nav}
                                </a>
                            </li>
                        ))
                    }
                </ul>

                <div className='flex items-center max-sm:justify-end max-sm:flex-1 gap-8'>
                    <img className='cursor-pointer' src={searchImg} alt="search" width={18} height={18} />
                    <img className='cursor-pointer' src={bagImg} alt="bag" width={18} height={18} />
                </div>
            </nav>
        </header>
    )
}

export default Navbar