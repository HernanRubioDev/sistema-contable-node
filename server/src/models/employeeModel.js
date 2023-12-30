const {pool} = require("../../db");

const setEmployee = async (employee) => {
  const {name, surname, birth, salary, cuil, childrens, entry_date, category, city} = employee;
  const query = "INSERT INTO employees (name, surname, birth, salary, cuil, childrens, entry_date, id_city, id_category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";

  try {
    const res = await pool.query(query,[name, surname, birth, salary, cuil, childrens, entry_date, city, category])
    return res;

  } catch (error) {
    console.log(error)
    return null
    
  }
};

const getEmployeeById = async(employee)=>{
 try {

 } catch (error) {
  return null;
 }
}

const getEmployee = async(employee)=>{
  const {name, surname, city} = employee
  const query = `
  SELECT e.name, e.surname, e.cuil, c.city, ca.category, to_char(e.entry_date, 'DD/MM/YYYY') as entry_date
  FROM employees e
  INNER JOIN cities c ON e.id_city=c.id_city
  INNER JOIN categories ca ON e.id_category = ca.id_category
  WHERE e.name LIKE $1 AND surname LIKE $2 AND c.city=$3
`;
  try {
    const res = await pool.query(query, [name + '%', surname + '%', city]);
    return res
  } catch (error) {
    return null;
  }
}

const getCities = async()=>{
  const query = "SELECT * FROM cities";
  try {
    const res = await pool.query(query);
    return res;
  } catch (error) {
    return null;
  }
}

const getCategories = async()=>{
  const query = "SELECT * FROM categories";
  try {
    const res = await pool.query(query);
    return res;
  } catch (error) {
    return null;
  }
}

module.exports={setEmployee, getEmployeeById, getEmployee, getCities, getCategories}