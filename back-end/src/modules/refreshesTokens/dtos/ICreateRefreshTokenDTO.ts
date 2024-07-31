export default interface ICreateRefreshTokenDTO {
  user_id: string;
  software: string;
  expires_date: Date;
  refresh_token: string;
  device: string;
}
