import { Wheat, TreePine, Wrench, Store } from "lucide-react";

export const COMMERCES = [
  { name: "Logis Hôtel l'Orée des Charmes", type: "Hôtel", hours: "12h00 – 13h30 / 19h15 – 21h (fermé le lundi et mardi)", icon: Wheat },
  { name: "Restaurant l'evYdenCe", type: "Restaurant", hours: "12h00 – 13h30 / 19h15 – 21h (fermé le lundi et mardi)", icon: Wheat },
  { name: "Chapeau Plume", type: "Création de chapeaux", hours: "Mardi & vendredi", icon: TreePine },
  { name: "Gite Blaisy-Bas", type: "Gite", hours: "", icon: Wrench },
  { name: "Une petite touche de bois", type: "Menuisier", hours: "", icon: Store },
  { name: "En developement", type: "Autre", hours: "", icon: Store },
];
