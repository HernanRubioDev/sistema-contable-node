const JournalTableSubRow = ({data, align})=>{
  return(
    <div className={`d-flex ${align} border-bottom py-1`}>
      <span className={data==="-" ? "transparent" : ""}>{data}</span>
    </div>
  );
}

export default JournalTableSubRow