/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { UserModule } from 'src/user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PassportModule } from '@nestjs/passport';
import { Auth0Strategy } from './strategies/auth0.strategy';

@Module({
  imports: [ PassportModule.register({ defaultStrategy: 'auth0' }),JwtModule.register({}),
        MailerModule.forRoot({  
      transport: {  
        host: 'sandbox.smtp.mailtrap.io',  
        port: Number('2525'),  
        secure: false,  
        auth: {  
          user: '1cdfa48932d388',  
          pass: '9e2bd47f271a60',  
        },  
        
      },  
      defaults: {  
        from: '"Yosr ben salem" <yousrbensalem@gmail.com>',  
      },  
    
    }),  
    UserModule
  ],

  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy,Auth0Strategy],
})
export class AuthModule {}
