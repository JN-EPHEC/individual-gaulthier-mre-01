import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class User extends Model {
  declare nom: string;
  declare prenom: string;
}

User.init(
  {
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;
