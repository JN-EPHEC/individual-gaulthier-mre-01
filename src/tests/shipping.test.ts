import { calculateShipping } from "../utils/shipping";

type ShippingType = "standard" | "express";

type ShippingCase = [
  string, // description
  number, // distance
  number, // weight
  ShippingType, // type
  number | Error, // expected result or error
];

const shippingCases: ShippingCase[] = [
  // Cas normaux
  ["distance courte, poids léger, standard", 10, 5, "standard", 10],
  ["distance courte, poids léger, express", 10, 5, "express", 20],

  // Bordures distance
  ["distance 0 km, poids 5kg, standard", 0, 5, "standard", 10],
  ["distance 50 km, poids 5kg, standard", 50, 5, "standard", 10],
  ["distance 51 km, poids 5kg, standard", 51, 5, "standard", 25],
  ["distance 500 km, poids 5kg, standard", 500, 5, "standard", 25],
  ["distance 501 km, poids 5kg, standard", 501, 5, "standard", 50],

  // Bordures poids
  ["poids 10kg, standard", 10, 10, "standard", 15],
  ["poids 50kg, standard", 10, 50, "standard", 15],

  // Hors limites distance
  ["distance négative => erreur", -1, 10, "standard", new Error("Invalid distance")],

  // Hors limites poids
  ["poids 0 => erreur", 10, 0, "standard", new Error("Invalid weight")],
  ["poids > 50 => erreur", 10, 51, "standard", new Error("Invalid weight")],
];

describe("calculateShipping - catalogue de tests", () => {
  test.each(shippingCases)(
    "%s",
    (_description, distance, weight, type, expected) => {
      if (expected instanceof Error) {
        expect(() => calculateShipping(distance, weight, type)).toThrow(
          expected.message,
        );
      } else {
        expect(calculateShipping(distance, weight, type)).toBe(expected);
      }
    },
  );
}
);


