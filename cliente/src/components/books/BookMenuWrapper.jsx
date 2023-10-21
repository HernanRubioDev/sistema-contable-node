import JournalBook from "./JournalBook";
import LedgerBook from "./LedgerBook";

const BookMenuWrapper = ({menu, accounts, lines, setAccounts, setMenu, getMinorAccountsForLedger, getLedgerBook})=>{
    
    switch (menu) {
        case "ledger":
            return <LedgerBook accounts={accounts} lines={lines} setAccounts={setAccounts} setMenu={setMenu} getMinorAccountsForLedger={getMinorAccountsForLedger} getLedgerBook={getLedgerBook}/>

        case "journal":
            return <JournalBook setMenu={setMenu}/>
    }
}

export default BookMenuWrapper;