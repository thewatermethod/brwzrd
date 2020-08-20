import {useEffect, useState} from "react";
import {FermentableInterface} from "../interfaces/Fermentable";
import {find} from "lodash";

interface FermentableData {
  id: number;
  potential: number;
  name: string;
}

const useGravity = (recipe: FermentableInterface[] | []) => {
  const [fermentables, setFermentables] = useState<[FermentableData] | []>([]);
  const [gravity, setGravity] = useState(0);

  const calculateGravity = (
    points: number,
    size: number = 5,
    efficiency: number = 75
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
      // for each hop
      recipe.forEach((fermentable) => {
        const data = find(fermentables, {id: fermentable.fermentable});

        if (data) {
          if (data.potential) {
            console.log(`${data.name} Potential: ${data.potential}`);
            points += fermentable.amount * (data.potential - 1) * 1000;
          }
        }
      });

      const newGravity = calculateGravity(points);

      console.log(`OG: ${newGravity}`);

      setGravity(newGravity);
    }
  }, [recipe, fermentables]);
  return gravity;
};

export {useGravity};
