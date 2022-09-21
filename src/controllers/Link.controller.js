import db from "../database/db.js";
import * as linkQuery from "../database/tables/link/querys.js";
import handleResponse from "../helpers/handleResponse.js";

const controller = {};

controller.getAllLinks = (_, res) => {
  db.query(userQuery.selectAllLinks, (err, data) => {
    if (err) handleResponse(res, err.message, true);
    res.json(data);
  });
};

controller.createLink = (req, res) => {
  const dirLink = req.body.link.trim();
  const idUser = req.token.id;

  db.query(linkQuery.createLink, [dirLink, idUser], (err, data) => {
    if (err) handleResponse(res, err.message, true);
    if (!data.affectedRows) {
      handleResponse(res, "Link was not created: Unknown error", true);
    }
    handleResponse(res, "link created!");
  });
};

controller.deleteLink = (req, res) => {
  const idLink = req.params.id;
  const idUser = req.token.id;

  try {
    db.query(linkQuery.deleteLink, [idLink, idUser], (err, data) => {
      if (err) handleResponse(res, err.message, true);
      if (!data.affectedRows) handleResponse(res, "Link not found!", true);
      handleResponse(res, `link deleted: ${idLink}`);
    });
  } catch (e) {
    console.log(e);
  }
};

controller.updateLink = (req, res) => {
  const idLink = req.params.id;
  const idUser = req.token.id;
  const updatedLink = req.body.link.trim();

  db.query(linkQuery.updateLink, [updatedLink, idLink, idUser], (err, data) => {
    if (err) handleResponse(res, err.message, true);
    if (!data.affectedRows) handleResponse(res, "Link not found!", true);
    handleResponse(res, `Link updated: ${idLink}`);
  });
};

export default controller;
