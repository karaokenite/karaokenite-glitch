import { UserCamera } from "./UserCamera";

export const Users = () => {
  return new Array(5).fill("x").map((x, i) => <UserCamera key={i} />);
};
