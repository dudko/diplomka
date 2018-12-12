const request = require("request");

const search = (req, res) =>
  request(
    `https://www.materialsproject.org/rest/v1/materials/${
      req.query.keyword
    }/vasp?API_KEY=${process.env.MATERIAL_PROJECT_API}`,
    (error, response, rawBody) => {
      const body = JSON.parse(rawBody);
      return res.send(
        (body.response && body.response.filter(result => result.elasticity)) ||
          []
      );
    }
  );

module.exports = {
  search
};
