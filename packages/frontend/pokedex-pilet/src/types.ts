export interface Pokemon {
  id: number;
  name: string;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: string;
    stat: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  moves: Array<{
    move: {
      name: string;
    };
  }>;
  weight: number;
  height: number;
  base_experience: number;
}

export interface PokemonMove {
  id: number;
  name: string;
  accuracy: number;
  damage_class: {
    name: string;
  };
  power: number;
  pp: number;
  type: {
    name: string;
  };
}

export interface PokemonSpecies {
  id: number;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: { name: string };
    version: { name: string };
  }>;
}
