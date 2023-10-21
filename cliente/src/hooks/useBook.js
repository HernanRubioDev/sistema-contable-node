import { useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import useUser from "./useUser";

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
    
    try {
      const res = await api.get(ledgerBookUrl);
      switch (true) {
        case res.status === 200:
					console.log(res.lines)
          setLines(res.lines);
          break;

        case res.status === 500:
          setResponse(res);
          //infoToast.show()
          break;

        default:
					console.log("entro a default")
          setResponse({title:"Error", body:"No se han encontrado los movimientos asociados.", success: false})
          //infoToast.show()
          break;
      }
    } catch (error) {
			console.log(error)
        setResponse({title:"Error", body:"No se han encontrado los movimientos asociados.", success: false})
        //infoToast.show()
    }
  }
	return {loading, response, lines, getLedgerBook}
}

export default useBook;