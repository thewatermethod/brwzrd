const faunadb = require("faunadb");
const q = faunadb.query;

//TODO - needs better sanitization

exports.handler = async (event, context, callback) => {
  try {
    var client = new faunadb.Client({
      secret: process.env.FAUNA_TOKEN,
    });

    const hops = [];
    const hopTypes = [];
    const hopTimes = [];

    const brew = JSON.parse(event.body);

    brew.hops.forEach((hop) => {
      hops.push(hop.name);
      hopTypes.push(hop.type);
      hopTimes.push(hop.time);
    });

    const fermentables = [];
    const fermentableAmounts = [];

    brew.fermentables.forEach((f) => {
      fermentableAmounts.push(f.amount);
      fermentables.push(f.name);
    });

    const yeast = brew.yeast.map((y) => {
      return y.label;
    });

    const others = [];
    const otherAmounts = [];
    const otherTimes = [];

    brew.others.forEach((o) => {
      otherAmounts.push(o.amount);
      others.push(o.name);
      otherTimes.push(o.time);
    });

    return client
      .query(
        q.Create(q.Collection("Brew"), {
          data: {
            yeast: yeast,
            name: brew.name,
            author: brew.author,
            style: brew.style,
            method: brew.method,
            boilSize: brew.boilSize,
            boilTime: brew.boilTime,
            efficiency: brew.efficiency,
            hops: hops,
            hopTypes: hopTypes,
            hopTimes: hopTimes,
            fermentables: fermentables,
            fermentableAmounts: fermentableAmounts,
            others: others,
            otherAmounts: otherAmounts,
            otherTimes: otherTimes,
            og: brew.og,
            srm: brew.srm.srm,
            hex: brew.srm.hex,
            ibus: brew.ibus,
            notes: brew.notes,
            image: brew.image ? brew.image : "",
          },
        })
      )
      .then((ret) => {
        return callback(null, {
          statusCode: 200,
          body: JSON.stringify(ret),
        });
      });
  } catch (err) {
    return callback(null, {statusCode: 500, body: err.toString()});
  }
};
