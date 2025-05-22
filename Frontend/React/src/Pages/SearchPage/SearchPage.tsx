import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import CardList from '../../Components/CardList/CardList';
import Search from '../../Components/Search/Search';
import { CompanySearch } from '../../company';
import { searchCompanies } from '../../api';
import ListPortfolio from '../../Components/portfolio/ListPortfolio/ListPortfolio';
import Hero from '../../Components/Hero/Hero';
import { PortfolioGet } from '../../Models/Portfolio';
import { portfolioAddAPI, portfolioDeleteAPI, portfolioGetAPI } from '../../Services/PortfolioService';
import { toast } from 'react-toastify';

const SearchPage = () => {
  const [search,setSearch] = useState("");
  const [searchResult,setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError,setServerError] = useState<String|null>(null);
  const [portfolioValues,setPortfolioValues] = useState<PortfolioGet[] | null>(null)
  
    const handleSearchChange = (e:ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value);
          console.log(e);
      };
    
    useEffect(()=>{
      getPortfolio();
    },[])
  
    const onSearchSubmit = async (e:SyntheticEvent) => {
      e.preventDefault();    
      const result = await searchCompanies(search);
          
          if(typeof result === "string")
            setServerError(result);
          else if(Array.isArray(result.data))
            setSearchResult(result.data);
          
          console.log(searchResult);
      }

    const getPortfolio = () => {
      portfolioGetAPI()
        .then((res)=>{
          if(res?.data){
            setPortfolioValues(res?.data);
          }
        }).catch(e=>{
          toast.warning("Could not get portfolio values!!");
        })
    }
    
    const onPortfolioCreate = (e:any) => {
      e.preventDefault();
      
      portfolioAddAPI(e.target[0].value)
        .then((res)=>{
          if(res?.status==201){
            toast.success("Stock Added to the portfolio")
            getPortfolio()
          }
        }).catch(e=>{
          toast.warning("Could not add the stock to portfolio")
        })
    }

    const onPortfolioDelete = (e:any) =>{
      e.preventDefault();
      
       portfolioDeleteAPI(e.target[0].value)
        .then((res)=>{
          if(res?.status==200){
            toast.success("Stock removed from the portfolio")
            getPortfolio()
          }
        }).catch(e=>{
          toast.warning("Could not delete the stock from portfolio")
        })
    }
  
  return (
    <div className="App dark:bg-gray-900 md:h-screen">
      <Search onSearchSubmit={onSearchSubmit} search={search} handleSearchChange={handleSearchChange}/>
      <ListPortfolio portfolioValues={portfolioValues!} onPortfolioDelete={onPortfolioDelete}/>
      <CardList searchResults = {searchResult} onPortfolioCreate={onPortfolioCreate}/>
      {serverError && <h1>{serverError}</h1>}
    </div>
  )
}

export default SearchPage
