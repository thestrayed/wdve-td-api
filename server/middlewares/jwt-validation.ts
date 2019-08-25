import config from 'config';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

export function jwtValidation(): jwt.RequestHandler {
    return jwt({
        secret: jwks.expressJwtSecret(config.get('wdve-td.authentication.secret')),
        audience: config.get('wdve-td.authentication.audience'),
        issuer: config.get('wdve-td.authentication.issuer'),
        algorithms: ['RS256'],
    });
}
