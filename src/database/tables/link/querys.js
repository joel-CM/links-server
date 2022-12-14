import dotenv from "dotenv";
dotenv.config();

export const createTableLinks =
  "CREATE TABLE IF NOT EXISTS links (id int not null auto_increment primary key, link varchar(255), user_id int, FOREIGN KEY(user_id) REFERENCES users(id))";
export const selectAllLinks = "SELECT * FROM links WHERE user_id = ?";
export const selectLinkById =
  "SELECT id, link FROM links WHERE id = ? AND user_id = ?";
export const createLink = "INSERT INTO links (link, user_id) VALUES (?, ?)";
export const deleteLink = "DELETE FROM links WHERE id = ? AND user_id = ?";
export const updateLink = `UPDATE ${
  process.env.prod_db_name || process.env.dev_db_name
}.links SET link = ? WHERE id = ? AND user_id = ?`;
export const validLink = "SELECT id FROM links WHERE id = ?";
