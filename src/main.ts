import { Configuration } from './configuration';
import { Context } from './context';
import { Extension } from './extension';
import { log } from './log';
import * as childProcess from 'child_process';
import * as vscode from 'vscode';

async function serverVersion(context: Readonly<Context>): Promise<void> {
    const version = childProcess.spawnSync(
        context.configuration.serverPath, ['--version'], { encoding: 'utf8' },
    );
    if (version.stdout) {
        await vscode.window.showInformationMessage(version.stdout);
    } else if (version.error) {
        await vscode.window.showErrorMessage(
            `Could not execute fls: ${version.error.message}.`,
        );
    } else {
        await vscode.window.showErrorMessage(
            `A problem occurred when executing '${context.configuration.serverPath}'.`,
        );
    }
}

export function activate(extensionContext: Readonly<vscode.ExtensionContext>): void {
    const extension = new Extension();
    log.info(`${extension.identifier} version ${extension.version}`);

    const configuration = new Configuration();
    log.info(`configuration: ${configuration.toString()}`);

    const context = Context.create(extensionContext, configuration);
    if (context instanceof Error) {
        void vscode.window.showErrorMessage(
            `Could not activate fls: ${context.message}.`,
        );
        return;
    }

    // Register handlers for VS Code commands that the user explicitly issues.
    context.registerCommand('serverVersion', serverVersion);

    // All other utilities provided by this extension occur via the language server.
    context.startClient();
}
