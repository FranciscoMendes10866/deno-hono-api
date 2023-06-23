import { DataTypes, Model } from "denodb";
import { z } from "zod";

export class Book extends Model {
  static table = "books";
  static timestamps = true;

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 25,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 100,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  };

  static defaults = {
    isAvailable: true,
  };
}

export const bookSchema = z.object({
  title: z.string(),
  description: z.string(),
  isAvailable: z.boolean(),
});
