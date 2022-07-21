import { Injectable, Logger } from '@nestjs/common';
import { isDevelopment, isProduction, isTest } from '@packages/essentials';
import config from 'config';
import { PackageJson } from 'type-fest';

@Injectable()
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);
  private readonly package: PackageJson;
  private readonly processRoot: string;

  constructor() {
    this.processRoot = process.cwd();
    this.package = require(`${this.processRoot}/package.json`);

    // Ensure any local.js file performs an override of objects (config module does a deepmerge)
    // This approach is possible because the config module only renders the config object immutable after the first call to get
    try {
      const localFile = `${this.processRoot}/config/local`;
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const local = require(localFile);
      Object.keys(local).forEach((key) => {
        // @ts-ignore
        config[key] = local[key];
      });
      this.logger.log(`Using local override located at ${localFile}`);
    } catch (e) {
      // No additional action required as no local configuration file provided
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getAppRootPath(): string {
    return this.processRoot;
  }

  getPackageName() {
    return this.package.name;
  }

  getPackageVersion() {
    return this.package.version;
  }

  getPackage() {
    return this.package;
  }

  get isDevelopment(): boolean {
    return isDevelopment();
  }

  get isTest(): boolean {
    return isTest();
  }

  get isProduction(): boolean {
    return isProduction();
  }

  // eslint-disable-next-line class-methods-use-this
  public has(key: string): boolean {
    return config.has(key);
  }

  // eslint-disable-next-line class-methods-use-this
  public get<T = string>(key: string, dft?: T): T {
    return config.has(key) ? config.get(key) : <T>dft;
  }

  public getNumber(key: string, dftVal?: number): number {
    return +this.get(key) || dftVal || 0;
  }

  get nodeEnv(): string {
    return this.get('NODE_ENV');
  }

  get fallbackLanguage(): string {
    return this.get('fallbackLanguage').toLowerCase();
  }
}
