const sgMail = require("@sendgrid/mail");
const faunadb = require("faunadb");
const q = faunadb.query;

const sendMail = (author, ref, name) => {
  // api key injected at build stored on netlify
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const link = `https://www.brwzrd.com/brew/${ref}`;

  // html template string for the html version of the email
  const template = `
    <table style="max-width: 600px">
      <tr style="max-width: 600px">
        <td style="max-width: 600px">
          <img src="https://www.brwzrd.com/static/media/BRWZRD1.0695c88e.jpg" alt="Brew Wizard Logo" style="max-width: 600px" />
        </td>
      </tr>
      
      <tr style="max-width: 600px">
        <td style="max-width: 600px">
          <p style="font-size: 18px">Hey there! <a href="${link}">The link to your new brew is ${link}</a></p>
          <p style="font-size: 18px"><small>(This can't be recovered so save this email or bookmark your link)</small></p>
        </td>        
      </tr>
      
    </table>
  `;

  // this is the object format the send grid api requests
  const msg = {
    to: author,
    from: "wizard@brwzrd.com",
    subject: `Link to Your New Brew ${name}`,
    text: `Hey there! The link to your new brew is ${link}. (This can't be recovered so save this email or bookmark your link)`,
    html: template,
  };

  sgMail.send(msg); // and off we go!!!!!!
};

//TODO - needs better sanitization

exports.handler = async (event, context, callback) => {
  try {
    // event is basically where you find everything in the lambda function

    // in this case, storing it as brew to make the following code more concise and readable
    const brew = JSON.parse(event.body);

    // and then we're off
    const hops = [];
    const hopTypes = [];
    const hopTimes = [];
    const hopAmounts = [];

    brew.hops.forEach((hop) => {
      hops.push(hop.name);
      hopTypes.push(hop.type);
      hopTimes.push(hop.time);
      hopAmounts.push(hop.amount);
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

    // todo we should have return statements above if the various things aren't valid and we should be sanitizing these as we go

    // we need a fauna client
    var client = new faunadb.Client({
      secret: process.env.FAUNA_TOKEN,
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
            batchSize: q.ToDouble(brew.batchSize),
            boilSize: q.ToDouble(brew.boilSize),
            boilTime: brew.boilTime,
            efficiency: brew.efficiency,
            hops: hops,
            hopTypes: hopTypes,
            hopTimes: hopTimes,
            hopAmounts: hopAmounts.map((a) => q.ToDouble(a)),
            fermentables: fermentables,
            fermentableAmounts: fermentableAmounts.map((a) => q.ToDouble(a)),
            others: others,
            otherAmounts: otherAmounts.map((a) => q.ToDouble(a)),
            otherTimes: otherTimes,
            og: q.ToDouble(brew.og),
            srm: q.ToDouble(brew.srm.srm),
            hex: brew.srm.hex,
            ibus: q.ToDouble(brew.ibus),
            notes: brew.notes,
            image: brew.image ? brew.image : "",
          },
        })
      )
      .then((ret) => {
        // just some quick string replace magic to make the final product look right
        let ref = ret.ref;

        ref = String(ref);
        ref = ref.replace('Ref(Collection("Brew"), "', "");
        ref = ref.replace('")', "");

        sendMail(brew.author, ref, brew.name);

        return callback(null, {
          statusCode: 200,
          body: JSON.stringify(ret),
        });
      });
  } catch (err) {
    return callback(null, {statusCode: 500, body: err.toString()});
  }
};
