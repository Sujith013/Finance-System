import { createBrowserRouter } from "react-router";
import HomePage from "../Pages/HomePage/HomePage";
import App from "../App";
import CompanyPage from "../Pages/CompanyPage/CompanyPage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile";
import IncomeStatement from "../Components/incomeStatement/IncomeStatement";
import DesignPage from "../Pages/DesignPage/DesignPage";
import BalanceSheet from "../Components/BalanceSheet/BalanceSheet";
import CashFlowStatement from "../Components/CashFlowStatment/CashFlowStatement";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/SignUpPage/RegisterPage";
import ProtectedRoutes from "./ProtectedRoutes";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<App />,
        children:[
            { path:"",element:<HomePage /> },
            { path:"/signup",element:<RegisterPage /> },
            { path:"/login",element:<LoginPage /> },
            { path:"search",element:<ProtectedRoutes><SearchPage/></ProtectedRoutes>},
            { path:"design-guide",element:<DesignPage /> },
            { path:"company/:ticker",
              element:<ProtectedRoutes><CompanyPage/></ProtectedRoutes>,
              children: [
                { path:"company-profile",element:<CompanyProfile /> },
                { path:"income-statement",element:<IncomeStatement /> },
                { path:"balance-sheet",element:<BalanceSheet /> },
                { path:"cashflow-statement",element:<CashFlowStatement /> },
              ]
            },
        ]
    },
])