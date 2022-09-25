import db from "../database/db.js";
import * as linkQuery from "../database/tables/link/querys.js";
import handleResponse from "../helpers/handleResponse.js";

const controller = {};

controller.getAllLinks = (req, res) => {
  try {
    const idUser = req.token.id;

    db.query(linkQuery.selectAllLinks, [idUser], (err, data) => {
      if (err) return handleResponse(res, 500, err.message, true);
      res.json(data);
    });
  } catch (err) {
    console.log(err);
  }
};

controller.getLinkById = (req, res) => {
  try {
    const idUser = req.token.id;
    const idLink = req.params.id;

    db.query(linkQuery.selectLinkById, [idLink, idUser], (err, data) => {
      if (err) return handleResponse(res, 500, err.message, true);
      if (!data[0]) return handleResponse(res, 404, "Link not found!", true);
      res.json(data[0]);
    });
  } catch (err) {
    console.log(err);
  }
};

controller.createLink = (req, res) => {
  try {
    const dirLink = req.body.link.trim();
    const idUser = req.token.id;

    if (!dirLink) return handleResponse(res, 200, "link is empty", true);

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
  } catch (err) {
    console.log(err);
  }
};

controller.deleteLink = (req, res) => {
  try {
    const idLink = req.params.id;
    const idUser = req.token.id;

    db.query(linkQuery.deleteLink, [idLink, idUser], (err, data) => {
      if (err) return handleResponse(res, 500, err.message, true);
      if (!data.affectedRows) {
        return handleResponse(res, 404, "Link not found!", true);
      }
      handleResponse(res, 200, `link deleted: ${idLink}`);
    });
  } catch (err) {
    console.log(err);
  }
};

controller.updateLink = (req, res) => {
  try {
    const idLink = req.params.id;
    const idUser = req.token.id;
    const updatedLink = req.body.link.trim();

    db.query(linkQuery.validLink, [idLink], (err, data) => {
      if (err) return handleResponse(res, 500, err.message, true);
      if (!data[0]) return handleResponse(res, 200, "Link not found!", true);

      db.query(
        linkQuery.updateLink,
        [updatedLink, idLink, idUser],
        (err, data) => {
          if (err) return handleResponse(res, 500, err.message, true);
          if (!data.affectedRows)
            handleResponse(res, 404, "Link not found!", true);
          handleResponse(res, 200, `Link updated: ${idLink}`);
        }
      );
    });
  } catch (err) {
    console.log(err);
  }
};

export default controller;
