import { UUID } from "crypto";

export interface UserDtoResponse {
  id: UUID;
  name: string;
  email: string;
  username: string;
  password: string;
}
