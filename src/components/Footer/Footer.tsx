import { Link } from "../../i18n/routing";


export default function Footer() {
  return (
    <>
      <footer className='bg-darkGray w-full z-40 relative text-light dark:bg-light dark:text-darkGray'>
        <div className="w-4/5 items-center max-w-screen-xl mx-auto py-3 flex justify-around">
          <div>
            <ul className='flex gap-3'>
              <li>
                <Link
                  className='block font-medium leading-6 transition-all hover:text-red underline'
                  href="/">Home</Link>
              </li>
              <li>
                <Link
                  className='block font-medium leading-6 transition-all hover:text-red underline'
                  href="/about">About Us</Link>
              </li>
              <li>
                <Link
                  className='block font-medium leading-6 transition-all hover:text-red underline'
                  href="/contact">Contact Us</Link>
              </li>              
              <li>
                <Link
                  className='block font-medium leading-6 transition-all hover:text-red underline'
                  href='/blogs'>Blogs</Link>
              </li>
            </ul>

          </div>
          <button className='bg-mediumGray text-light p-2 rounded-md min-w-20 text-center hover:border-light hover:border transition-all'>Get in Touch</button>
        </div>
      </footer>
    </>
  )
}
