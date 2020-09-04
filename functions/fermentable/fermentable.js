const fermentablesData = require("../../data/fermentables").fermentablesData;

exports.handler = async (event, context) => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify(fermentablesData),
    };
  } catch (err) {
    return {statusCode: 500, body: err.toString()};
  }
};
