const {pool} = require("../../db");

const setEmployee = async (employee) => {
  const {name, surname, birth, salary, cuil, childrens, entry_date, category, city, bank} = employee;
  const query = "INSERT INTO employees (name, surname, birth, salary, cuil, childrens, entry_date, id_city, id_category, id_bank) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";

  try {
    const res = await pool.query(query,[name, surname, birth, salary, cuil, childrens, entry_date, city, category, bank])
    return res;

  } catch (error) {
    return null
  }
};

const getEmployeeById = async(id_employee)=>{
 const query = "SELECT * FROM employees WHERE id_employee = $1"
 try {
  const res = await pool.query(query,[id_employee]);
  return res
 } catch (error) {
  return null;
 }
}

const getEmployee = async(employee)=>{
  const {name, surname, city} = employee
  const query = `
  SELECT e.id_employee, e.name, e.surname, e.cuil, c.city, ca.category, ca.id_category, e.salary, e.childrens, to_char(e.birth, 'DD/MM/YYYY') as birth,  to_char(e.entry_date, 'DD/MM/YYYY') as entry_date, b.bank, b.id_bank 
  FROM employees e
  INNER JOIN cities c ON e.id_city=c.id_city
  INNER JOIN categories ca ON e.id_category = ca.id_category
  INNER JOIN banks b ON e.id_bank = b.id_bank
  WHERE e.name LIKE $1 AND surname LIKE $2 AND c.city=$3
`;
  try {
    const res = await pool.query(query, [name + '%', surname + '%', city]);
    return res
  } catch (error) {
    return null;
  }
}

const setNewPayment = async (recipt)=>{
  const {id_employee, payment_date, salary, net_total, deposite_date, bank, file, city, name, surname, cuil} = recipt
  const client = await pool.connect();
  const payCheckQuery = "INSERT INTO pay_checks (id_employee, payment_date, remuneration, net_total, deposit_date, bank, file, city, name, surname, cuil) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id_pay_check"
  const payCheckConceptQuery = "INSERT INTO pay_checks_rows (ammount, concept_type, concept_name, id_pay_check) VALUES ($1, $2, $3, $4)";
  try {
    await client.query('BEGIN')
    const payCheckQueryRes = await client.query(payCheckQuery,[id_employee, payment_date, salary, net_total, deposite_date, bank, file, city, name, surname, cuil])
    const id_pay_check = payCheckQueryRes.rows[0].id_pay_check
    recipt.concepts.forEach(async c => {
      await client.query(payCheckConceptQuery, [c.ammount, c.concept_type, c.concept_name, id_pay_check])
    });
    await client.query('COMMIT')
    return payCheckQueryRes;
  } catch (error) {
    await client.query('ROLLBACK')
    return null 
  }
  finally{
    client.release()
  }
}

const getReciptByDatesAndName = async (data) => {
  const { name, surname, date_from, date_to } = data;

  const payCheckQuery = `
    SELECT *, 
    to_char(payment_date, 'DD/MM/YYYY') AS payment_date, 
    to_char(deposit_date, 'DD/MM/YYYY') AS deposit_date 
    FROM pay_checks 
    WHERE name LIKE $1 
    AND surname LIKE $2 
    AND payment_date BETWEEN $3 AND $4
  `;

  const payCheckConceptsQuery = 'SELECT * FROM pay_checks_rows WHERE id_pay_check = $1';

  try {
    const res = await pool.query(payCheckQuery, ['%' + name + '%', '%' + surname + '%', date_from, date_to]);
    const recipts = await Promise.all(res.rows.map(async r => {
      const id_pay_check = r.id_pay_check;
      const concepts = await pool.query(payCheckConceptsQuery, [id_pay_check]);
      r.concepts = concepts.rows
      return { ...r};
    }));
    return res;
  } catch (error) {
    return null;
  }
};

module.exports={setEmployee, getEmployeeById, getEmployee, setNewPayment, getReciptByDatesAndName}