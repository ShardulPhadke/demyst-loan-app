"use client"

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useNavigation, useRouter } from 'next/navigation';

import Form from '@components/Form';

const ApplyLoan = () => {

  const router = useRouter();
  const { data: session } = useSession();  
  
  const [submitting, setSubmitting] = useState(false);
  const [details, setDetails] = useState({
    bussinessName: "",
    loanAmount: "",
    accountingProvider: ""
  })

  const [balanceSheet, setBalanceSheet] = useState([]);

//   const requestBalanceSheet = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     try {
//         const response = await fetch(`api/getbalancesheet?${details.bussinessName}`);
//         const data = await response.json();

//         setBalanceSheet(data);

//         if(response.ok) {
//             router.push('/view-balance-sheet');
//         }

//     } catch(error) {
//         console.log(error);
//     } finally {
//         setSubmitting(false);
//     }
//   }

  return (
    <Form 
        details={details}
        setDetails={setDetails}
        submitting={submitting}
    />
  )
}

export default ApplyLoan;