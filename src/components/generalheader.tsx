import { Disclosure } from '@headlessui/react'
import { BellIcon, XMarkIcon, UserIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import GroundUp from '../assets/GroundUp.png'

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Alerts', href: '#', current: false }
]

function classNames(...classes:String[]) {
  return classes.filter(Boolean).join(' ')
}

export default function GeneralHeader({children}:{children?:JSX.Element}) {
  return (
    <Disclosure as="nav" className="bg-white shadow-lg fixed w-full z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start min-h-full">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src={GroundUp}
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src={GroundUp}
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex min-h-full">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-sky-100 border-b-4 border-b-sky-700' : ' hover:bg-sky-600 hover:text-white',
                          'text-gray-600 font-light px-3 py-2 place-self-center self-stretch flex flex-col justify-center'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full p-1 text-black hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <Cog6ToothIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="rounded-full p-1 text-black hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <UserIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="rounded-full p-1 text-black hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              {/* slash here */}
              <div className="w-0.5 h-2/6 bg-black mx-3"></div>
              <div> <span className='text-gray-600'> Welcome Admin! </span></div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-sky-100 text-black border-b-2 border-b-sky-400' : 'text-black hover:bg-sky-400 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
