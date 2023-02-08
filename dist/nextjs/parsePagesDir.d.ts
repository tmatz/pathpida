import { SuffixMethod } from '../getConfig';
export type Slugs = string[];
export declare const createMethods: (indent: string, importName: string | undefined, slugs: Slugs, pathname: string) => string;
export declare const parsePagesDir: (input: string, output: string, ignorePath: string | undefined, pageExtensions: string[] | undefined, suffix: SuffixMethod, appDirQueryLength: number) => {
    imports: string[];
    text: string;
};
//# sourceMappingURL=parsePagesDir.d.ts.map