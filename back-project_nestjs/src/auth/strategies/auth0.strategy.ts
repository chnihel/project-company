import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy,VerifiedCallback } from 'passport-auth0';


@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'auth0') {
  constructor(configService: ConfigService) {
    console.log('AUTH0_DOMAIN:', configService.get<string>('AUTH0_DOMAIN'));
    console.log('AUTH0_CLIENT_ID:', configService.get<string>('AUTH0_CLIENT_ID'));
    console.log('AUTH0_CLIENT_SECRET:', configService.get<string>('AUTH0_CLIENT_SECRET'));

    super({
      domain: configService.get<string>('AUTH0_DOMAIN'),
      clientID: configService.get<string>('AUTH0_CLIENT_ID'),
      clientSecret: configService.get<string>('AUTH0_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3001/auth/callback',
      responseType: 'code',
      scope: 'openid profile email',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifiedCallback) {
    try {
      console.log('Access Token:', accessToken);
      console.log('Profile:', profile);

      const user = {
        id: profile.id,
        email: profile.emails?.[0]?.value,
        name: profile.displayName,
        picture: profile.photos?.[0]?.value,
      };
      done(null, user);
    } catch (err) {
      console.error('Error in validation:', err);
      done(err, false);
    }
  }
}

