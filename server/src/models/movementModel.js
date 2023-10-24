const {pool} = require("../../db");

const getMovementQuantity = async()=>{
    const query = "SELECT COUNT(*)+1 AS count FROM accounts_moves";
    try {
        const res =  await pool.query(query);
        return res
    } catch (error) {
        return null;
    }
}

const getMovementByDates = async(dateFrom, dateTo)=>{
    const query = "SELECT *, to_char(move_date, 'DD/MM/YYYY') AS move_date FROM accounts_moves WHERE move_date BETWEEN $1 AND $2"
    try {
        const res = await pool.query(query,[dateFrom, dateTo]);
        return res
    } catch (error) {
        return null;
    }
}

const getLineById = async (id_move)=>{
    const query = "SELECT name, accounts_moves_lines.credit, debit FROM accounts_moves_lines LEFT JOIN accounts ON accounts_moves_lines.id_account = accounts.id_account WHERE accounts_moves_lines.id_move = $1 ORDER BY num_line ASC"
    try {
        const res = await pool.query(query, [id_move]);
        return res
    } catch (error) {
        return null
    }
}

const getLineFormLedger = async(account, dateFrom, dateTo)=>{
    const query = `SELECT
    acc.code,
    aml.num_line,
    to_char(am.move_date, 'DD/MM/YYYY') AS move_date,
    am.description,
    aml.credit,
    aml.debit
  FROM accounts_moves_lines AS aml
  INNER JOIN accounts_moves AS am ON aml.id_move = am.id_move
  INNER JOIN accounts AS acc ON aml.id_account = acc.id_account
  WHERE acc.name = '${account}'AND move_date BETWEEN '${dateFrom}' AND '${dateTo}'`
  try {
    const res = await pool.query(query)
    return res
  } catch (error) {
    return null;
  }
}

const getLinesForJournal = async(dateFrom, dateTo)=>{
    const query = "SELECT am.id_move, to_char(am.move_date, 'DD/MM/YYYY') AS move_date, am.description, acc.name, aml.debit, aml.credit from accounts_moves AS am INNER JOIN accounts_moves_lines AS aml ON am.id_move = aml.id_move INNER JOIN accounts AS acc ON acc.id_account = aml.id_account WHERE aml.date BETWEEN $1 AND $2";
    try {
      const res = await pool.query(query, [dateFrom, dateTo]);
      return res
    } catch (error) {
      return null
    }
  }

module.exports={getMovementQuantity, getMovementByDates, getLineById, getLineFormLedger, getLinesForJournal}
