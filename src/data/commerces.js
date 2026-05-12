import { Wheat, TreePine, Wrench, Store } from "lucide-react";

export const COMMERCES = [
  { name: "Logis Hôtel l'Orée des Charmes", type: "Hôtel", hours: "12h00 – 13h30 / 19h15 – 21h (fermé le lundi et mardi)", icon: Wheat },
  { name: "Restaurant l'evYdenCe", type: "Restaurant", hours: "12h00 – 13h30 / 19h15 – 21h (fermé le lundi et mardi)", icon: Wheat },
  { name: "Ferme des Coteaux", type: "Producteur fermier", hours: "Mardi & vendredi", icon: TreePine },
  { name: "Garage Mécanique 21", type: "Garage", hours: "8h – 18h", icon: Wrench },
  { name: "Café de la Place", type: "Bar-restaurant", hours: "7h – 22h", icon: Store },
];
