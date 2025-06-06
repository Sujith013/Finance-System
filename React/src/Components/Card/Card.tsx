import React, { JSX, SyntheticEvent } from 'react'
import './Card.css'
import cardLogo1 from '../../images/card_logo1.jpeg'
import { CompanySearch } from '../../company';
import AddPortfolio from '../portfolio/addPortfolio/AddPortfolio';
import { Link } from 'react-router-dom';

interface Props  {
    id:string;
    searchResult: CompanySearch;
    onPortfolioCreate: (e:SyntheticEvent) => void;
}

const Card:React.FC<Props> = ({id,searchResult,onPortfolioCreate}:Props) : JSX.Element => {
  return (
     <div
      className="flex flex-col items-center justify-between w-full p-6 bg-slate-100 rounded-lg md:flex-row dark:bg-gray-700 w-3/4 mx-auto"
      key={id}
      id={id}
    >
      <Link to={'/company/'+searchResult.symbol+"/company-profile"} className="font-bold text-center text-white md:text-left">
        {searchResult.name} ({searchResult.symbol})
      </Link>
      <p className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{searchResult.currency}</p>
      <p className="font-bold text-white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{searchResult.exchangeShortName}-{searchResult.stockExchange}</p>
      <AddPortfolio onPortfolioCreate={onPortfolioCreate} symbol={searchResult.symbol}/>
    </div>
  )
}

export default Card
