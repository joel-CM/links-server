import db from "../database/db.js";
import * as linkQuery from "../database/tables/link/querys.js";
import handleResponse from "../helpers/handleResponse.js";

const controller = {};

controller.getAllLinks = (req, res) => {
  const idUser = req.token.id;

  db.query(linkQuery.selectAllLinks, [idUser], (err, data) => {
    if (err) return handleResponse(res, 500, err.message, true);
    res.json(data);
  });
};

controller.createLink = (req, res) => {
  const dirLink = req.body.link.trim();
  const idUser = req.token.id;

  db.query(linkQuery.createLink, [dirLink, idUser], (err, data) => {
    if (err) return handleResponse(res, 500, err.message, true);
    if (!data.affectedRows) {
      return handleResponse(
        res,
        500,
        "Link was not created: Unknown error",
        true
      );
    }
    handleResponse(res, 201, "link created!");
  });
};

controller.deleteLink = (req, res) => {
  const idLink = req.params.id;
  const idUser = req.token.id;

  try {
    db.query(linkQuery.deleteLink, [idLink, idUser], (err, data) => {
      if (err) return handleResponse(res, 500, err.message, true);
      if (!data.affectedRows) {
        return handleResponse(res, 404, "Link not found!", true);
      }
      handleResponse(res, 200, `link deleted: ${idLink}`);
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
    if (err) return handleResponse(res, 500, err.message, true);
    if (!data.affectedRows) handleResponse(res, 404, "Link not found!", true);
    handleResponse(res, 200, `Link updated: ${idLink}`);
  });
};

export default controller;
