import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { CompanyProfile } from '../../company';
import { getCompanyProfile } from '../../api';
import SideBar from '../../Components/SideBar/SideBar';
import CompanyDashBoard from '../../Components/CompanyDashBoard/CompanyDashBoard';
import Tiles from '../../Components/Tiles/Tiles';
import CompanyFinder from '../../Components/CompanyFinder/CompanyFinder';
import TenKFinder from '../../Components/Tenk/TenKFinder';

const CompanyPage = () => {
  let {ticker} = useParams();
  const [company,setCompany] = useState<CompanyProfile>();
  
  useEffect(() => {
    const getProfileInit = async () => {
      const result = await getCompanyProfile(ticker!);
      setCompany(result?.data[0]);
    };
    getProfileInit();
  }, []);

  return (
    <>
    {
      company ? (
<div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
  <SideBar />
  <CompanyDashBoard ticker={ticker!}>
    <Tiles title="Company Name" subTitle={company.companyName}/>
    <Tiles title="Price" subTitle={company.price.toString()}/>
    <Tiles title="Sector" subTitle={company.sector}/>
    <Tiles title="DCF" subTitle={company.dcf.toString()}/>
    <CompanyFinder ticker={company.symbol}/>
    <TenKFinder ticker={ticker!}/>
    <p className="bg-white shadow rounded text-medium text-gray-900 p-3 mt-1 m-4">
      {company.description}
    </p>
  </CompanyDashBoard>
        </div>
      ):(
      <div>Company Not Found</div>)
    }</>
  )
}

export default CompanyPage
