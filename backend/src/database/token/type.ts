import { EmailTokenPurpose } from "../../../generated/prisma/enums";

export interface DatabaseTokenType {
  id: number;
  tokenHash: string;
  userId: number;
  purpose: EmailTokenPurpose;
  expiresAt: Date;
}
