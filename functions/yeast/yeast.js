const yeastData = require("../../data/yeast").yeastData;

exports.handler = async (event, context) => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify(yeastData),
    };
  } catch (err) {
    return {statusCode: 500, body: err.toString()};
  }
};
