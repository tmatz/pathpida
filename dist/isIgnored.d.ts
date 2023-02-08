import { Ignore } from 'ignore';
export declare const createIg: (ignorePath: string | undefined) => Ignore | undefined;
export declare const isIgnored: (ig: Ignore | undefined, ignorePath: string | undefined, targetDir: string, file: string) => boolean;
//# sourceMappingURL=isIgnored.d.ts.map