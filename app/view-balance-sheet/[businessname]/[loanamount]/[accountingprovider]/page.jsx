"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { connectToDB } from "@utils/database";
import BalanceSheet from "@components/BalanceSheet";
import Link from "next/link";

const ViewBalanceSheet = () => {

  const params = useParams();

  const [ balanceSheet, setBalanceSheet ] = useState([]);
  const [ preAssessment, setPreAssesment ] = useState(20);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ preAssessmentLoaded, setPreAssesmentLoaded ] = useState(false);
  const [ yearEndProfit , setYearEndProfit ] = useState();

  const requestBalanceSheet = async (e) => {
    const response = await fetch(`/api/getbalancesheet/${params.businessname}/${params.loanamount}/${params.accountingprovider}`);
    const data = await response.json();

    setBalanceSheet(data);
    setIsLoading(false);
  }

  const calcPreAssessment = async () => {

    const monthlySheet = balanceSheet.balanceSheet;
    // const [month1, month2, month3, month4, month5, month6, month7, month8, month9, month10, month11, month12] = monthlySheet;
    // const totalProfitOrLoss = month1.profitOrLoss + month2.profitOrLoss + month3.profitOrLoss + month4.profitOrLoss
    //   + month5.profitOrLoss + month6.profitOrLoss + month7.profitOrLoss + month8.profitOrLoss + month9.profitOrLoss 
    //   + month10.profitOrLoss + month11.profitOrLoss + month12.profitOrLoss

    const totalProfitOrLoss = monthlySheet?.map(element => element.profitOrLoss).reduce((a, b) => a + b, 0);
    setYearEndProfit(totalProfitOrLoss);
    console.log("hello");
    console.log(totalProfitOrLoss);

    const totalAssetValue = monthlySheet?.map(element => element.assetsValue).reduce((a, b) => a + b, 0);
    const averageAssetValue = totalAssetValue / 12;
    // const averageAssetValue = (month1.assetsValue + month2.assetsValue + month3.assetsValue + month4.assetsValue
    //   + month5.assetsValue + month6.assetsValue + month7.assetsValue + month8.assetsValue + month9.assetsValue 
    //   + month10.assetsValue + month11.assetsValue + month12.assetsValue) / 12
    
    if(totalProfitOrLoss > 0){
      setPreAssesment(60);
    }
    if(averageAssetValue > params.loanamount){
      setPreAssesment(100);
    }

    setPreAssesmentLoaded(true);
  }

  useEffect(() => {
    requestBalanceSheet();
  }, [])

  useEffect(() => {
    calcPreAssessment();
  }, [balanceSheet])

  return (
    <div>
      {isLoading ? (
        <div>Fetching balance sheet</div>
      ) : (
        <div>
          <div className="text-center">
            <BalanceSheet 
              balanceSheet = {balanceSheet}
            />
          </div>
          <div>
            {preAssessmentLoaded && (
              <div>
                <br/>
                <Link 
                  href={`/decision-engine/${params.businessname}/${yearEndProfit}/${preAssessment}/${params.loanamount}/`}
                  className="px-5 py-3 text-sm bg-blue-500 rounded-full text-white"
                >
                  Submit Application        
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      
    </div>
  )
}

export default ViewBalanceSheet;
