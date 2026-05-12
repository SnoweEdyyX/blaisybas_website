/**
 * Informations générales sur la commune.
 * Sources : annuaire-mairie.fr, ouche-montagne.fr, echodescommunes.fr
 */
export const VILLAGE = {
  name: "Blaisy-Bas",
  postcode: "21540",
  inseeCode: "21080",
  department: "Côte-d'Or",
  region: "Bourgogne-Franche-Comté",
  intercom: "Communauté de communes Ouche et Montagne",
  population: 647,
  area: 13.37, // km²
  altitudeMin: 381,
  altitudeMax: 585,
  altitudeBourg: 410,
  distanceDijon: 23,
  inhabitants: { male: "Blaisois", female: "Blaisoises" },
  river: "L'Oze",

  mairie: {
    address: "Rue du Presbytère",
    phone: "03 80 33 21 04",
    email: "secretariat.mairie@blaisy-bas.fr",
    hours: [
      ["Lundi", "15h00 – 18h00"],
      ["Mardi", "Fermée"],
      ["Mercredi", "15h00 – 19h00"],
      ["Jeudi", "Fermée"],
      ["Vendredi", "9h00 – 12h30"],
      ["Samedi", "Fermée"],
      ["Dimanche", "Fermée"],
    ],
  },

  mayor: {
    name: "Monsieur Alain Lamy",
    since: 2026,
    term: "Mandat de 7 ans",
  },

  blason: {
    blazon:
      "D'azur, à la colombe d'argent essorante au vol étendu, mouvante d'un nuage du même, tenant en son bec un foudre de sable, et au lion léopardé d'or, armé et lampassé de gueules.",
  },
};
