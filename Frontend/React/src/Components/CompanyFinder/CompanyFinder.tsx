import React, { useEffect, useState } from 'react'
import { CompanyCompData } from '../../company';
import { getComparableData } from '../../api';
import CompFinderItem from './CompFinderItem/CompFinderItem';

interface Props{
    ticker:string;
}

const CompanyFinder = ({ticker}:Props) => {
  const [companyData,setCompanyData] = useState<CompanyCompData>();
  
  useEffect(()=>{
    const getData = async () => {
        const value = await getComparableData(ticker);
        setCompanyData(value?.data[0]);
    }
    getData();
  },[ticker])
  
  return (
    <div className='inline-flex rounded-md shadow-sm m-4'>
      {companyData?.peersList.map((ticker)=>{
        return <CompFinderItem ticker={ticker}/>
      })}
    </div>
  )
}

export default CompanyFinder
