import React from 'react'
import { Outlet } from 'react-router-dom'

interface Props {
  children: React.ReactNode;
  ticker:string
}

const CompanyDashBoard = ({children,ticker}:Props) => {
  return (
    <div className="relative md:ml-64 dark:bg-gray-900 w-full">
            <div className="relative pt-20 pb-32 bg-lightBlue-500">
              <div className="px-4 md:px-6 mx-auto w-full">
                <div>
                  <div className="flex flex-wrap">{children}</div>
                  <div className="flex flex-wrap">{<Outlet context={ticker}/>}</div>
                </div>
              </div>
            </div>
          </div>
  )
}

export default CompanyDashBoard
