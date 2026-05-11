import { Trophy, Handshake, Tent, Music, Award } from "lucide-react";

/**
 * Associations du village.
 *
 * ⚠️ Les mots de passe sont en clair ici à des fins de DÉMO uniquement.
 * En production : remplacer par un vrai système d'authentification
 * (Supabase Auth, Firebase Auth, ou backend dédié).
 */
export const ASSOCIATIONS = [
  {
    id: "tennis",
    name: "Tennis Club de Blaisy",
    icon: Trophy,
    color: "#c2410c",
    pwd: "tennis2025",
    tagline: "Le club qui sert la passion depuis 1987",
  },
  {
    id: "jumelage",
    name: "Comité de Jumelage",
    icon: Handshake,
    color: "#1e3a8a",
    pwd: "jumelage2025",
    tagline: "L'amitié sans frontières",
  },
  {
    id: "foire",
    name: "Comité de la Foire",
    icon: Tent,
    color: "#a16207",
    pwd: "foire2025",
    tagline: "Tradition et convivialité chaque année",
  },
  {
    id: "musique",
    name: "Harmonie de Blaisy",
    icon: Music,
    color: "#7c2d12",
    pwd: "musique2025",
    tagline: "La musique au cœur du village",
  },
  {
    id: "patrimoine",
    name: "Les Amis du Patrimoine",
    icon: Award,
    color: "#365314",
    pwd: "patrimoine2025",
    tagline: "Préserver hier pour demain",
  },
];

export const getAssociation = (id) => ASSOCIATIONS.find((a) => a.id === id);
