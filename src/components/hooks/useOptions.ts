import {Dispatch, SetStateAction, useEffect, useState} from "react";

import {ResourceValue} from "../interfaces/ResourceValue";

const useOptions = (
  resource: string,
  loaded: boolean,
  setLoaded: Dispatch<SetStateAction<boolean>>
) => {
  const [options, setOptions] = useState<ResourceValue[] | []>([]);

  useEffect(() => {
    async function fetchResource(resource: string) {
      console.log(`loading ${resource} from api...\n`);
      const r = await fetch(`/.netlify/functions/${resource}`);
      const d = r.json();

      return d;
    }

    if (!loaded) {
      fetchResource(resource).then((d) => {
        if (resource === "fermentable") {
          d = d.filter((o: ResourceValue) => o.potential);
        }

        if (resource === "hops") {
          d = d.filter((o: ResourceValue) => o.alphaAcidMin);
        }

        const f = d.map((o: ResourceValue) => {
          return {
            name: o.name,
            id: o.id,
            alphaAcidMin: o.alphaAcidMin,
            srmPrecise: o.srmPrecise,
            attenuationMax: o.attenuationMax,
          };
        });

        let res = [{name: "---", id: 0}, ...f];

        setLoaded(true);
        setOptions(res);
      });
    }
  });

  return options;
};

export {useOptions};
