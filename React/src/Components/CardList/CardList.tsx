import React, { JSX, SyntheticEvent } from 'react'
import Card from '../Card/Card'
import { CompanySearch } from '../../company';
import {v4 as uuid} from "uuid";

interface Props {
  searchResults: CompanySearch[];
  onPortfolioCreate: (e:SyntheticEvent) => void;
}

const CardList : React.FC<Props> = ({searchResults,onPortfolioCreate}:Props) : JSX.Element => {
  return <>
      {searchResults.length>0?(
          searchResults.map((result)=>{
            return <div className='mb-3'><Card id={result.symbol} key={uuid()} searchResult={result} onPortfolioCreate={onPortfolioCreate}/></div>
          })
      ): <p className="mb-3 mt-3 text-xl font-semibold text-center text-white md:text-xl">
          No results!
        </p>}
    </>;
};

export default CardList
