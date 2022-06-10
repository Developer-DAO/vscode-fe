<p align="center">
    <a href="https://developerdao.com">
    <img src="https://raw.githubusercontent.com/Developer-DAO/developerdao.com/main/public/logo512.png" alt="logo" width="80" height="80"/>
    </a>
    <h2 align="center">VsCode Fe</h2>
    <p align="center">
    <a href="https://github.com/ethereum/fe">Fe</a> support for Visual Studio Code
    </p>
</p>

Adds language support for Fe to Visual Studio Code. Supports:

* code completion
* jump to definition, peek definition, find all references, symbol search
* types and documentation on hover
* code formatting
* refactoring (rename, deglob)
* build tasks

Fe support is powered by a separate [language server](https://github.com/Developer-DAO/fls) If you don't have it installed, the extension will install it for
you (with permission).

## Installation

1. Within Visual Studio Code, open the command palette (Ctrl-Shift-P / Cmd-Shift-P).
2. Select `Install Extension` and search for **Fe** or run `ext install Fe`.
3. Run `cargo install --git https://github.com/Developer-DAO/fls` if u want to install the latest build of `fls` .

## Contributing

Check out [CONTRIBUTING.md](https://github.com/zjhmale/vscode-idris/blob/master/CONTRIBUTING.md).

## Options

The following Visual Studio Code settings along with their *default* values that are available for the Idris extension. If you want to change any of these, you can do so in user preferences (`cmd+,`) or workspace settings (`.vscode/settings.json`). You don't have to copy these if you don't intend to change them.

```javascript
{
    "fe.server.path": "/usr/bin/fls", // Absolute path of the fls executable
    "fe.trace.server": "off"                    // Traces the communication between the Fe language server and Visual Studio Code
}
```

## License

[Apache 2.0](https://opensource.org/licenses/Apache-2.0)
