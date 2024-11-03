import ApiService from "../../apiService/ApiService";
import JSEncrypt from "jsencrypt";
import { PasswordValidationRequest } from "../../models/PasswordValidationRequest";

class LoginHelper {
  private apiService: ApiService = new ApiService(
    process.env.REACT_APP_BASEAPI_URL || ""
  );
  private storageKey: string = "userCredentials";

  public async validateCredentials(
    username: string,
    password: string
  ): Promise<boolean> {
    const isValid = await this.checkUserCred(username, password); // Await the asynchronous call

    if (isValid) {
      this.storeCredentials(username, password);
    }
    return isValid;
  }

  private async checkUserCred(
    username: string,
    password: string
  ): Promise<boolean> {
    const RSAPublicKey: string = await this.apiService.get<string>(
      "Keys/GetRSAPublicKey"
    );
    const encryptedPassword = this.encryptPassword(password, RSAPublicKey);
    const isValid = await this.apiService.post<boolean>(
        `UserSecret/PasswordValidation`,
        {
            userName: username,
            enPwd: encryptedPassword 
        } as PasswordValidationRequest )
    return isValid;
  }

  private storeCredentials(username: string, password: string): void {
    const credentials = { username, password };
    localStorage.setItem(this.storageKey, JSON.stringify(credentials));
  }

  public getStoredCredentials(): { username: string; password: string } | null {
    const storedCredentials = localStorage.getItem(this.storageKey);
    return storedCredentials ? JSON.parse(storedCredentials) : null;
  }

  public clearStoredCredentials(): void {
    localStorage.removeItem(this.storageKey);
  }

  public async checkUserValidation(): Promise<boolean> {
    const storedCredentials = this.getStoredCredentials();
    if (storedCredentials == null) return false;

    return await this.validateCredentials(
      storedCredentials.username,
      storedCredentials.password
    );
  }

  private encryptPassword(password: string, publicKey: string): string {
    const jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(publicKey);

    return jsEncrypt.encrypt(password) || "";
  }
}

export default LoginHelper;
