export const createTableUsers =
  "CREATE TABLE IF NOT EXISTS users (id int not null auto_increment primary key, name varchar(20), lastname varchar(20), email varchar(40) not null, password varchar(100) not null)";

export const validUser = "SELECT id FROM users WHERE email = ?";
export const createUser =
  "insert into users (name, lastname, email, password) values (?, ?, ?, ?)";
export const validEmail = "SELECT id, name, lastname, email, password FROM users WHERE BINARY email = ?";
