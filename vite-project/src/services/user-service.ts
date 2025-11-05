import create from "./http-service";

export interface User {
  name: string;
  id: number;
}

export default create("/users");
