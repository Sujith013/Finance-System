import React, { useEffect, useState } from 'react'
import { CompanyTenK } from '../../company';
import { getTenK } from '../../api';
import TenKFinderItem from './TenKFinderItem';

interface Props{
    ticker:string;
}

const TenKFinder = ({ticker}:Props) => {
  const [companyData,setCompanyData] = useState<CompanyTenK[]>();
  
  useEffect(()=>{
    const getTenKData = async () => {
        const value = await getTenK(ticker);
        setCompanyData(value?.data);
    }
    getTenKData();
  },[ticker])

    return (
    <div className='inline-flex rounded-md shadow-sm m-8 mx-auto'>
      {companyData ? (
        companyData?.slice(0,5).map((tenK)=>{
            return <TenKFinderItem tenK={tenK}/>
        })
      ):(<>Loading...</>)}
    </div>
  )
}

export default TenKFinder
