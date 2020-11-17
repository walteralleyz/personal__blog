import { createHmac } from 'crypto';
import JWT from 'jsonwebtoken';
import { config } from 'dotenv';
import { Request, Response } from 'express';

config();

const defineHmac = () => createHmac('sha256', process.env.KEY_SECRET || 'teste');

let hmac = defineHmac();

export const JWTEncoded = (obj: object) => JWT.sign(obj, process.env.KEY_SECRET || 'teste', { expiresIn: 9999 });

export const JWTDecode = (rq: Request, rp: Response, next: any) => {
    if(rq.headers['access-control-allow-headers'] 
    && rq.headers['access-control-allow-headers'].indexOf('Bearer') !== -1) {
        const token = rq.headers['access-control-allow-headers'].split(' ')[1];
        const decoded = JWT.verify(token, process.env.KEY_SECRET || 'teste');

        if(Object.keys(decoded).indexOf('email') !== -1)
            return next();
    }

    rp.status(403).json({ error: 'Sem permissão!' });
}

export const encrypt = (text: string) => {
    hmac.update(text);
    const secret = hmac.digest('hex');

    hmac = defineHmac();

    return secret;
}