import { UUID } from "crypto";

export interface UserDtoRequest {
  id: string;
  name?: string;
  email?: string;
  username?: string;
  password?: string;
}
