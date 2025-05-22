import React from 'react'
import { TestDataCompany } from '../Table/testData'

interface Props{
    config:any;
    data:any;
}

const RatioList = ({ config, data }: Props) => {
  const renderedCells = config.map((row: any) => {
    return (
      <li className="py-6 sm:py-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white font-semibold truncate">
              {row.label}
            </p>
            <p className="text-sm text-gray-400 truncate">
              <a
                href="/cdn-cgi/l/email-protection"
                className="__cf_email__"
                data-cfemail="17727a767e7b57607e7973646372653974787a"
              >
                {row.subTitle && row.subTitle}
              </a>
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-white">
            {row.render(data)}
          </div>
        </div>
      </li>
    );
  });
  return (
    <div className="dark:bg-gray-800 shadow rounded-lg ml-4 mt-4 mb-4 p-4 sm:p-6 w-full">
      <ul className="divide-y divide-gray-200">{renderedCells}</ul>
    </div>
  );
};

export default RatioList;