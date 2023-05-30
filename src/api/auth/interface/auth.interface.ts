export interface ISignin {
  login: string;
  password: string;
}

export interface ITokenPayload {
  user_id: number;
}

export interface IDecodedToken {
  user_id: number;
  token_type: string;
}

export interface IRefreshToken {
  token: string;
}
