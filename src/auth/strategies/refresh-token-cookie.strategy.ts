import { ForbiddenException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload, JwtPayloadWithRefreshToken } from "../types";
import {Request} from 'express'


export const cookieExtractor= ()=> {

}
@Injectable()
export class RefreshTokenCookieStrategy extends PassportStrategy(
    Strategy,
    'refresh-jwt'
) {
    constructor(){
        super({
            jwtFromRequest: cookieExtractor,
            secretOrKey: process.env.REFRESH_TOKEN_KEY,
            passReqToCallBack: true
        })
    }
    validate(req: Request, payload: JwtPayload): JwtPayloadWithRefreshToken{
        const authHeader = req.headers.authorization
        const refreshToken = authHeader.split(' ')[1]
        console.log('Hello from authHeader');

        if(!refreshToken) throw new ForbiddenException("Refresh token noto'g'ri")

        return {
            ...payload,
            refreshToken
        }
    }
}