import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { OcrModule } from './modules/ocr/ocr.module';
import { AuthModule } from './modules/auth/auth.module';
import { DisputeModule } from './modules/dispute/dispute.module';
import { EscalationModule } from './modules/escalation/escalation.module';
import { BillingModule } from './modules/billing/billing.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET || 'defaultSecretForDevelopment',
        signOptions: { expiresIn: '1d' },
      }),
    }),
    OcrModule,
    AuthModule,
    DisputeModule,
    EscalationModule,
    BillingModule,
    AdminModule,
  ],
})
export class AppModule {}
