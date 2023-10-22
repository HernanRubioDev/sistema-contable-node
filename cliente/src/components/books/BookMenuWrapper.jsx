import JournalBook from "./JournalBook";
import LedgerBook from "./LedgerBook";

const BookMenuWrapper = ({menu, loading, accounts, lines, setLines, setAccounts, setMenu, getMinorAccountsForLedger, getLedgerBook})=>{
    
    switch (menu) {
        case "ledger":
            return <LedgerBook accounts={accounts} loading={loading} lines={lines} setLines={setLines} setAccounts={setAccounts} setMenu={setMenu} getMinorAccountsForLedger={getMinorAccountsForLedger} getLedgerBook={getLedgerBook}/>

        case "journal":
            return <JournalBook setMenu={setMenu}/>
    }
}

export default BookMenuWrapper;