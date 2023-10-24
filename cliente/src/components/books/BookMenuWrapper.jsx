import JournalBook from "./JournalBook";
import LedgerBook from "./LedgerBook";

const BookMenuWrapper = ({menu, loading, accounts, lines, setLines, setAccounts, setMenu, getMinorAccountsForLedger, getLedgerBook, getJournalBook})=>{
    
    switch (menu) {
        case "ledger":
            return <LedgerBook accounts={accounts} loading={loading} lines={lines} setLines={setLines} setAccounts={setAccounts} setMenu={setMenu} getMinorAccountsForLedger={getMinorAccountsForLedger} getLedgerBook={getLedgerBook}/>

        case "journal":
            return <JournalBook loading={loading} lines={lines} setLines={setLines} setMenu={setMenu} getJournalBook={getJournalBook}/>
    }
}

export default BookMenuWrapper;