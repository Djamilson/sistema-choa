import AppErrorAuth from '@shared/errors/AppErrorAuth';

function getToken(headers: any) {
  const authHeader = headers.authorization;

  if (!authHeader) {
    throw new AppErrorAuth('Token not present', 'token.invalid', 401);
  }

  const [, token] = authHeader.split(' ');
  if (!token) {
    throw new AppErrorAuth('Token not present', 'token.invalid', 401);
  }
  return token;
}

export { getToken };
