const hopsData = require("../../data/hops").hopsData;

exports.handler = async (event, context) => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify(hopsData),
    };
  } catch (err) {
    return {statusCode: 500, body: err.toString()};
  }
};
