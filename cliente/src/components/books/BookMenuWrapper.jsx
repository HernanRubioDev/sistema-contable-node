import JournalBook from "./JournalBook";
import LedgerBook from "./LedgerBook";

const BookMenuWrapper = ({menu, accounts, setAccounts, setMenu, getMinorAccounts})=>{
    
    switch (menu) {
        case "ledger":
            return <LedgerBook accounts={accounts} setAccounts={setAccounts} setMenu={setMenu} getMinorAccounts={getMinorAccounts}/>

        case "journal":
            return <JournalBook setMenu={setMenu}/>
    }
}

export default BookMenuWrapper;