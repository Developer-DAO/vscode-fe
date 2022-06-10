import type { Configuration } from './configuration';
import * as fs from 'fs';
import * as vscode from 'vscode';
import * as lc from 'vscode-languageclient';
import { log } from './log';

export class Context {
    private constructor(
        private readonly extensionContext: Readonly<vscode.ExtensionContext>,
        readonly configuration: Readonly<Configuration>,
    ) { }

    static create(
        extensionContext: Readonly<vscode.ExtensionContext>,
        configuration: Readonly<Configuration>,
    ): Context | Error {
        if (!fs.existsSync(configuration.serverPath)) {
            return new Error(
                `language server executable '${configuration.serverPath}' could not be found, so ` +
                'most extension features will be unavailable to you. Follow the instructions in ' +
                'the vscode-fe Visual Studio Code extension README to install the language ' +
                'server.',
            );
        }
        return new Context(extensionContext, configuration);
    }

    registerCommand(
        name: Readonly<string>,
        command: (context: Readonly<Context>) => Promise<void>,
    ): void {
        const disposable = vscode.commands.registerCommand(`fe.${name}`, async () => {
            const com = await command(this);
            return com;
        });
        this.extensionContext.subscriptions.push(disposable);
    }

    startClient(): void {
        const executable: lc.Executable = {
            command: this.configuration.serverPath,
        };
        const serverOptions: lc.ServerOptions = {
            run: executable,
            debug: executable,
        };

        const traceOutputChannel = vscode.window.createOutputChannel(
            'Fe Language Server Trace',
        );
        const clientOptions: lc.LanguageClientOptions = {
            documentSelector: [{ scheme: 'file', language: 'fe' }],
            traceOutputChannel,
        };

        const client = new lc.LanguageClient(
            'vscode-fe',
            'Fe Language Server',
            serverOptions,
            clientOptions,
        );
        log.info('Starting client...');
        const disposable = client.start();
        this.extensionContext.subscriptions.push(disposable);
    }
}
