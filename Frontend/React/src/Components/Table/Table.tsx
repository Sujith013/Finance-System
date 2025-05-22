import React from 'react'

interface Props{
    config:any;
    data:any;
}

const Table = ({config,data}:Props) => {
    const renderedRows = data.map((company:any)=>{
        return(
            <tr key={company.cik}>
            {config.map((val:any)=>{
                return(
                    <td className='p-4 whitespace-nowrap text-sm font-normal text-white'>
                        {val.render(company)}
                    </td>
                );
                })}
            </tr>
        )
    });

    const renderedHeaders = config.map((config:any)=>{
        return(
            <th
        className="p-4 text-left text-xs font-bold text-white uppercase tracking-wider"
        key={config.label}
      >
        {config.label}
      </th>
        )
    })

  return (
   <div className="dark:bg-gray-800 shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
      <table className="min-w-full divide-y divide-gray-200 m-5">
        <thead>{renderedHeaders}</thead>
        <tbody>{renderedRows}</tbody>
      </table>
    </div>
  )
}

export default Table
