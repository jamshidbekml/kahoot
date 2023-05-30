export interface IUserSession {
  id: string;
  user_id: string;
  refresh_token: string;
  refresh_token_expires_at: Date;
}
