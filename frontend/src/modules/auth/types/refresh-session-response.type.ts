import { UserDto } from "./user.type";

export interface RefreshSessionResponse {

success: boolean;

data: {

  accessToken: string;

  user: UserDto;

};

message?: string;

}