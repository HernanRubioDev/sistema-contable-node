import JournalBook from "./JournalBook";
import LedgerBook from "./LedgerBook";

const BookMenuWrapper = ({menu, setMenu})=>{
    
    switch (menu) {
        case "ledger":
            return <LedgerBook setMenu={setMenu}/>

        case "journal":
            return <JournalBook setMenu={setMenu}/>
    }
}

export default BookMenuWrapper;