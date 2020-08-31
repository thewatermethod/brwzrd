import {useEffect, useState} from "react";
import {FermentableInterface} from "../interfaces/Fermentable";
import {find} from "lodash";
import {freemem} from "os";

interface FermentableData {
  id: number;
  potential: number;
  name: string;
}

const useGravity = (
  recipe: FermentableInterface[] | [],
  size: number = 5,
  efficiency: number = 75
) => {
  const [fermentables, setFermentables] = useState<[FermentableData] | []>([]);
  const [gravity, setGravity] = useState(0);

  const calculateGravity = (
    points: number,
    size: number,
    efficiency: number
  ) => {
    console.log(`Points: ${points}`);

    const pts = points * (efficiency / 100);

    console.log(`Points (after eff.): ${pts}`);

    const ptsPerGal = pts / size;

    console.log(`Points per gallon: ${ptsPerGal}`);

    const og = ptsPerGal / 1000 + 1;

    return og;
  };

  useEffect(() => {
    async function fetchMentables() {
      const r = await fetch(`http://localhost:3001/fermentable`);
      const h = r.json();

      return h;
    }

    if (recipe && recipe.length > 0) {
      if (fermentables.length === 0) {
        fetchMentables()
          .then((f) => {
            setFermentables(f);
          })

          .catch((err) => {
            console.log(err);
          });
      }
    }

    if (recipe && recipe.length > 0) {
      let points = 0;
      // for each fermentable
      recipe.forEach((fermentable) => {
        //find it
        const data = find(fermentables, {id: fermentable.fermentable});

        // if it exists,
        if (data) {
          if (data.potential) {
            // print out the potential gravity
            console.log(`${data.name} Potential: ${data.potential}`);

            // and calculate it
            // if we have a potential in the API of 1.038, we are looking for 380 * amount
            const prePoints = (data.potential - 1) * 1000; // first the conversion of the 1.038 number
            const amountInPounds = fermentable.amount / 16; // and then we take our ounces and turn that into pounds

            points += amountInPounds * prePoints;
          }
        }
      });

      const newGravity = calculateGravity(points, size, efficiency);

      console.log(`OG: ${newGravity}`);

      setGravity(newGravity);
    }
  }, [recipe, fermentables]);
  return gravity;
};

export {useGravity};
