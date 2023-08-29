import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../types";

@Injectable()
export class AcccessTokenStrategy extends PassportStrategy(
    Strategy,
    'access-jwt'
) {
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.ACCESS_TOKEN_KEY
        })
    }
    validate(payload: JwtPayload): JwtPayload{
        console.log("payload:", payload);
        return payload
    }
}