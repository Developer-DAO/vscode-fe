import * as os from 'os';
import * as vscode from 'vscode';

/**
 * User-defined configuration values, such as those specified in VS Code settings.
 *
 * This provides a more strongly typed interface to the configuration values specified in this
 * extension's `package.json`, under the key `"contributes.configuration.properties"`.
 */
export class Configuration {
    private readonly configuration: vscode.WorkspaceConfiguration;

    constructor() {
        this.configuration = vscode.workspace.getConfiguration('fe');
    }

    toString(): string {
        return JSON.stringify(this.configuration);
    }

    get serverPath(): string {
        const defaultName = 'fls';
        const path = this.configuration.get<string>('server.path', defaultName);
        if (path.length === 0) {
            return defaultName;
        }
        if (path.startsWith('~/')) {
            return os.homedir() + path.slice('~'.length);
        }
        return path;
    }
}
