import { Listbox, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

export default function Dropdown({currentData,className, list, chooseData}:{currentData?:any,className?:String, list:any[], chooseData:(selected:string) => void}) {
  const [selected, setSelected] = useState(list[0]);
  useEffect(() => {
    chooseData(selected.label)
  }, [selected])
  
  useEffect(() => {
    console.log(currentData, 'currentData');
    if (currentData) {
      setSelected(() => (currentData))
    }
  }, [])
  

  return (
    <div className="top-16 w-56">
      <Listbox as="div" onChange={setSelected} className={`relative inline-block text-left ${className}`}>
        <div>
          <Listbox.Button className="inline-flex w-full justify-center rounded-md bg-white border-2 border-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {selected.label}
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Listbox.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Listbox.Options className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {list.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  )
}
