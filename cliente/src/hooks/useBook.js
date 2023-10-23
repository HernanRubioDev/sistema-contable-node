import { useState } from "react";
import { helpHttp } from "../helpers/helpHttp";

const useBook = ()=>{
  const api = helpHttp();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [lines, setLines] = useState([]);
	const infoToast = new bootstrap.Toast(document.getElementById("infoToast"))

	const getLedgerBook = async(form)=>{
    const {account, dateFrom, dateTo} = form;
    const username = localStorage.getItem("username");
    const auth_token = localStorage.getItem("auth_token");
    const user_role = localStorage.getItem("user_role");
    const ledgerBookUrl = `http://localhost:3000/movement/getLineByForLedger/${username}/${user_role}/${auth_token}/?account=${account}&dateFrom=${dateFrom}&dateTo=${dateTo}`
    setLoading(true)
    try {
      const res = await api.get(ledgerBookUrl);
      switch (true) {
        case res.status === 200:
          setLines(calculateLedgerBoook(res.lines));
          break;

        case res.status === 400:
          setResponse(res);
          infoToast.show()
          break;

        case res.status === 404:
          setResponse(res);
          infoToast.show()
          setLines([])
          break;

        case res.status === 500:
          setResponse(res);
          infoToast.show()
          break;

        default:
          setResponse({title:"Error", body:"Ha ocurrindo un error. Intentelo mas tarde", success: false})
          infoToast.show()
          break;
      }
    } catch (error) {
        setResponse({title:"Error", body:"Ha ocurrindo un error. Intentelo mas tarde", success: false})
        infoToast.show()
    }
    setLoading(false)
  }
	return {loading, response, lines, setLines, getLedgerBook}
}

const calculateLedgerBoook = (lines)=>{
  let saldo = 0.00;
	const newLines = []
  for (let i = 0; i < lines.length; i++) {
    if(i === 0){
      switch (true) {
        case parseFloat(lines[i].debit) !== 0:
          saldo = parseFloat(lines[i].debit)
          lines[i].saldo=saldo
          break;

        case parseFloat(lines[i].credit) !== 0:
          saldo = parseFloat(lines[i].credit)
          lines[i].saldo=saldo
          break;
      }
    }
    else{
      if(lines[i].code[0] === "1"){
        switch (true) {
          case lines[i].debit !== "0.00":
            saldo += parseFloat(lines[i].debit)
            lines[i].saldo=saldo
            break;
            
            
          case lines[i].credit !== "0.00":
            saldo -= parseFloat(lines[i].credit)
            lines[i].saldo=saldo
            break;
        }
      }
      if(lines[i].code[0] === "2"){
        switch (true) {
          case lines[i].debit !== "0.00":
            saldo -= parseFloat(lines[i].debit)
            lines[i].saldo=saldo
            break;
            
          case lines[i].credit !== "0.00":
            saldo += parseFloat(lines[i].credit)
            lines[i].saldo=saldo
            break;
        }
      }
    }
    newLines.push(lines[i])
  }
  return newLines
}

export default useBook;