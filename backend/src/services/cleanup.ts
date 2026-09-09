import EmailTokenService from "./database/tokens";

class CleanupService {
  static start() {
    setInterval(async () => {
      try {
        const deleted = await EmailTokenService.deleteExpiredTokens();

        console.log(`Deleted ${deleted.count} expired tokens`);
      } catch (error) {
        console.error("Token cleanup failed:", error);
      }
    }, 60 * 60 * 1000);
  }
}
export default CleanupService;
