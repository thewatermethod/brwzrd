import {useEffect, useState} from "react";
import {find} from "lodash";
import {HopInterface} from "../interfaces/Hop";
import {Option} from "../interfaces/Option";
import {FermentableInterface} from "../interfaces/Fermentable";

const useIBU = (
  recipe: [] | HopInterface[],
  og: number,
  volume: number,
  yeast: [] | Option[],
  fermentables: [] | FermentableInterface[]
) => {
  const [ibus, setIBUs] = useState(0);

  // master formula
  //IBU = AAU x U x 75 / Vrecipe

  useEffect(() => {
    recipe.forEach((hop) => {
      let AAU = 0;
      AAU += hop.amount * hop.alphaAcidMin;

      const utilization = calcUtilization(hop.time, og);

      setIBUs(ibus + (AAU * utilization * 75) / volume);
    });
  }, [recipe, fermentables, yeast, og, volume]); // eslint-disable-line react-hooks/exhaustive-deps

  return ibus;
};

const calcUtilization = (boilTime: number, og: number) => {
  const utes = [
    {minutes: 5, gravity: 1.03, u: 0.055},
    {minutes: 5, gravity: 1.04, u: 0.05},
    {minutes: 5, gravity: 1.05, u: 0.046},
    {minutes: 5, gravity: 1.06, u: 0.042},
    {minutes: 5, gravity: 1.07, u: 0.038},
    {minutes: 5, gravity: 1.08, u: 0.035},
    {minutes: 5, gravity: 1.09, u: 0.032},
    {minutes: 5, gravity: 1.1, u: 0.029},
    {minutes: 5, gravity: 1.11, u: 0.027},
    {minutes: 5, gravity: 1.12, u: 0.025},
    /** */
    {minutes: 10, gravity: 1.03, u: 0.1},
    {minutes: 10, gravity: 1.04, u: 0.091},
    {minutes: 10, gravity: 1.05, u: 0.084},
    {minutes: 10, gravity: 1.06, u: 0.076},
    {minutes: 10, gravity: 1.07, u: 0.07},
    {minutes: 10, gravity: 1.08, u: 0.064},
    {minutes: 10, gravity: 1.09, u: 0.058},
    {minutes: 10, gravity: 1.1, u: 0.053},
    {minutes: 10, gravity: 1.11, u: 0.049},
    {minutes: 10, gravity: 1.12, u: 0.045},
    /**  */
    {minutes: 15, gravity: 1.03, u: 0.137},
    {minutes: 15, gravity: 1.04, u: 0.125},
    {minutes: 15, gravity: 1.05, u: 0.114},
    {minutes: 15, gravity: 1.06, u: 0.105},
    {minutes: 15, gravity: 1.07, u: 0.096},
    {minutes: 15, gravity: 1.08, u: 0.087},
    {minutes: 15, gravity: 1.09, u: 0.08},
    {minutes: 15, gravity: 1.1, u: 0.073},
    {minutes: 15, gravity: 1.11, u: 0.067},
    {minutes: 15, gravity: 1.12, u: 0.061},
    /**  */
    {minutes: 20, gravity: 1.03, u: 0.167},
    {minutes: 20, gravity: 1.04, u: 0.153},
    {minutes: 20, gravity: 1.05, u: 0.14},
    {minutes: 20, gravity: 1.06, u: 0.128},
    {minutes: 20, gravity: 1.07, u: 0.117},
    {minutes: 20, gravity: 1.08, u: 0.107},
    {minutes: 20, gravity: 1.09, u: 0.098},
    {minutes: 20, gravity: 1.1, u: 0.089},
    {minutes: 20, gravity: 1.11, u: 0.081},
    {minutes: 20, gravity: 1.12, u: 0.074},
    /** */
    {minutes: 25, gravity: 1.03, u: 0.192},
    {minutes: 25, gravity: 1.04, u: 0.175},
    {minutes: 25, gravity: 1.05, u: 0.16},
    {minutes: 25, gravity: 1.06, u: 0.147},
    {minutes: 25, gravity: 1.07, u: 0.134},
    {minutes: 25, gravity: 1.08, u: 0.122},
    {minutes: 25, gravity: 1.09, u: 0.112},
    {minutes: 25, gravity: 1.1, u: 0.102},
    {minutes: 25, gravity: 1.11, u: 0.094},
    {minutes: 25, gravity: 1.12, u: 0.085},
    /** */
    {minutes: 30, gravity: 1.03, u: 0.212},
    {minutes: 30, gravity: 1.04, u: 0.194},
    {minutes: 30, gravity: 1.05, u: 0.177},
    {minutes: 30, gravity: 1.06, u: 0.162},
    {minutes: 30, gravity: 1.07, u: 0.148},
    {minutes: 30, gravity: 1.08, u: 0.135},
    {minutes: 30, gravity: 1.09, u: 0.124},
    {minutes: 30, gravity: 1.1, u: 0.113},
    {minutes: 30, gravity: 1.11, u: 0.103},
    {minutes: 30, gravity: 1.12, u: 0.094},
    /** */
    {minutes: 35, gravity: 1.03, u: 0.229},
    {minutes: 35, gravity: 1.04, u: 0.209},
    {minutes: 35, gravity: 1.05, u: 0.191},
    {minutes: 35, gravity: 1.06, u: 0.175},
    {minutes: 35, gravity: 1.07, u: 0.16},
    {minutes: 35, gravity: 1.08, u: 0.146},
    {minutes: 35, gravity: 1.09, u: 0.133},
    {minutes: 35, gravity: 1.1, u: 0.122},
    {minutes: 35, gravity: 1.11, u: 0.111},
    {minutes: 35, gravity: 1.12, u: 0.102},
    /** */
    {minutes: 40, gravity: 1.03, u: 0.242},
    {minutes: 40, gravity: 1.04, u: 0.221},
    {minutes: 40, gravity: 1.05, u: 0.202},
    {minutes: 40, gravity: 1.06, u: 0.185},
    {minutes: 40, gravity: 1.07, u: 0.169},
    {minutes: 40, gravity: 1.08, u: 0.155},
    {minutes: 40, gravity: 1.09, u: 0.141},
    {minutes: 40, gravity: 1.1, u: 0.129},
    {minutes: 40, gravity: 1.11, u: 0.118},
    {minutes: 40, gravity: 1.12, u: 0.108},
    /** */
    {minutes: 45, gravity: 1.03, u: 0.253},
    {minutes: 45, gravity: 1.04, u: 0.232},
    {minutes: 45, gravity: 1.05, u: 0.212},
    {minutes: 45, gravity: 1.06, u: 0.194},
    {minutes: 45, gravity: 1.07, u: 0.177},
    {minutes: 45, gravity: 1.08, u: 0.162},
    {minutes: 45, gravity: 1.09, u: 0.148},
    {minutes: 45, gravity: 1.1, u: 0.135},
    {minutes: 45, gravity: 1.11, u: 0.123},
    {minutes: 45, gravity: 1.12, u: 0.113},
    /** */
    {minutes: 50, gravity: 1.03, u: 0.263},
    {minutes: 50, gravity: 1.04, u: 0.24},
    {minutes: 50, gravity: 1.05, u: 0.219},
    {minutes: 50, gravity: 1.06, u: 0.2},
    {minutes: 50, gravity: 1.07, u: 0.183},
    {minutes: 50, gravity: 1.08, u: 0.168},
    {minutes: 50, gravity: 1.09, u: 0.153},
    {minutes: 50, gravity: 1.1, u: 0.14},
    {minutes: 50, gravity: 1.11, u: 0.128},
    {minutes: 50, gravity: 1.12, u: 0.117},
    /** */
    {minutes: 55, gravity: 1.03, u: 0.27},
    {minutes: 55, gravity: 1.04, u: 0.247},
    {minutes: 55, gravity: 1.05, u: 0.226},
    {minutes: 55, gravity: 1.06, u: 0.206},
    {minutes: 55, gravity: 1.07, u: 0.188},
    {minutes: 55, gravity: 1.08, u: 0.172},
    {minutes: 55, gravity: 1.09, u: 0.157},
    {minutes: 55, gravity: 1.1, u: 0.144},
    {minutes: 55, gravity: 1.11, u: 0.132},
    {minutes: 55, gravity: 1.12, u: 0.12},
    /** */
    {minutes: 60, gravity: 1.03, u: 0.276},
    {minutes: 60, gravity: 1.04, u: 0.252},
    {minutes: 60, gravity: 1.05, u: 0.231},
    {minutes: 60, gravity: 1.06, u: 0.211},
    {minutes: 60, gravity: 1.07, u: 0.193},
    {minutes: 60, gravity: 1.08, u: 0.176},
    {minutes: 60, gravity: 1.09, u: 0.161},
    {minutes: 60, gravity: 1.1, u: 0.147},
    {minutes: 60, gravity: 1.11, u: 0.135},
    {minutes: 60, gravity: 1.12, u: 0.123},
    /** */
    {minutes: 70, gravity: 1.03, u: 0.285},
    {minutes: 70, gravity: 1.04, u: 0.261},
    {minutes: 70, gravity: 1.05, u: 0.238},
    {minutes: 70, gravity: 1.06, u: 0.218},
    {minutes: 70, gravity: 1.07, u: 0.199},
    {minutes: 70, gravity: 1.08, u: 0.182},
    {minutes: 70, gravity: 1.09, u: 0.166},
    {minutes: 70, gravity: 1.1, u: 0.152},
    {minutes: 70, gravity: 1.11, u: 0.139},
    {minutes: 70, gravity: 1.12, u: 0.127},
    /** */
    {minutes: 80, gravity: 1.03, u: 0.291},
    {minutes: 80, gravity: 1.04, u: 0.266},
    {minutes: 80, gravity: 1.05, u: 0.243},
    {minutes: 80, gravity: 1.06, u: 0.222},
    {minutes: 80, gravity: 1.07, u: 0.203},
    {minutes: 80, gravity: 1.08, u: 0.186},
    {minutes: 80, gravity: 1.09, u: 0.17},
    {minutes: 80, gravity: 1.1, u: 0.155},
    {minutes: 80, gravity: 1.11, u: 0.142},
    {minutes: 80, gravity: 1.12, u: 0.13},
    /** */
    {minutes: 90, gravity: 1.03, u: 0.295},
    {minutes: 90, gravity: 1.04, u: 0.27},
    {minutes: 90, gravity: 1.05, u: 0.247},
    {minutes: 90, gravity: 1.06, u: 0.226},
    {minutes: 90, gravity: 1.07, u: 0.206},
    {minutes: 90, gravity: 1.08, u: 0.188},
    {minutes: 90, gravity: 1.09, u: 0.172},
    {minutes: 90, gravity: 1.1, u: 0.157},
    {minutes: 90, gravity: 1.11, u: 0.144},
    {minutes: 90, gravity: 1.12, u: 0.132},
    /** */
    {minutes: 100, gravity: 1.03, u: 0.298},
    {minutes: 100, gravity: 1.04, u: 0.272},
    {minutes: 100, gravity: 1.05, u: 0.249},
    {minutes: 100, gravity: 1.06, u: 0.228},
    {minutes: 100, gravity: 1.07, u: 0.208},
    {minutes: 100, gravity: 1.08, u: 0.19},
    {minutes: 100, gravity: 1.09, u: 0.174},
    {minutes: 100, gravity: 1.1, u: 0.159},
    {minutes: 100, gravity: 1.11, u: 0.145},
    {minutes: 100, gravity: 1.12, u: 0.133},
    /** */
    {minutes: 110, gravity: 1.03, u: 0.3},
    {minutes: 110, gravity: 1.04, u: 0.274},
    {minutes: 110, gravity: 1.05, u: 0.251},
    {minutes: 110, gravity: 1.06, u: 0.229},
    {minutes: 110, gravity: 1.07, u: 0.209},
    {minutes: 110, gravity: 1.08, u: 0.191},
    {minutes: 110, gravity: 1.09, u: 0.175},
    {minutes: 110, gravity: 1.1, u: 0.16},
    {minutes: 110, gravity: 1.11, u: 0.146},
    {minutes: 110, gravity: 1.12, u: 0.134},
    /** */
    {minutes: 120, gravity: 1.03, u: 0.301},
    {minutes: 120, gravity: 1.04, u: 0.275},
    {minutes: 120, gravity: 1.05, u: 0.252},
    {minutes: 120, gravity: 1.06, u: 0.23},
    {minutes: 120, gravity: 1.07, u: 0.21},
    {minutes: 120, gravity: 1.08, u: 0.192},
    {minutes: 120, gravity: 1.09, u: 0.176},
    {minutes: 120, gravity: 1.1, u: 0.161},
    {minutes: 120, gravity: 1.11, u: 0.147},
    {minutes: 120, gravity: 1.12, u: 0.134},
  ];

  const ute = find(utes, {
    gravity: parseFloat(og.toFixed(2)),
    minutes: boilTime,
  });
  if (ute) {
    return ute?.u;
  }
  return 0;
};

export {useIBU};
