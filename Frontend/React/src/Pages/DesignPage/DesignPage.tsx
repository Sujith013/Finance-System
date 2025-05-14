import React from 'react'
import Table from '../../Components/Table/Table'
import Ratio from '../../Components/Ratio/Ratio'
import { testIncomeStatementData } from '../../Components/Table/testData'

interface Props{

}

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: any) => company.marketCapTTM,
    subTitle: "Total value of all a company's shares of stock",
  }
]

const DesignPage = () => {
  return (
    <>
    <h1>FinModel Design Page</h1>
    <h2>This is the design guide of FinModel. This is where the various design aspects of the app are kept.</h2>
    <Ratio data={testIncomeStatementData} config={tableConfig}/>
    <Table data={testIncomeStatementData} config={tableConfig}/>
    </>
  )
}

export default DesignPage
