export interface DatabaseTokenType {
  id: number;
  tokenHash: string;
  userId: number;
  purpose: DatabaseTokenPurpose;
  expiresAt: Date;
}

export type DatabaseTokenPurpose = "PATCH" | "DELETE";
