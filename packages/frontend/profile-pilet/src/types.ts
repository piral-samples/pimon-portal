export interface Profile {
  userId: string;
  displayName: string | null;
  motd: string | null;
  favoritePokemon: Array<number>;
  badges: Array<number>;
  imageBase64Url: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileUpdate {
  displayName: string | null;
  motd: string | null;
  favoritePokemon: Array<number>;
  badges: Array<number>;
  imageBase64Url: string | null;
}
