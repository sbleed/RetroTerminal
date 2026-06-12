class RetroTerminal {
    constructor() {
        this.input = document.getElementById('input');
        this.output = document.getElementById('output');
        this.terminalContainer = document.getElementById('terminal-container');
        this.commandHistory = [];
        this.historyIndex = -1;
        this.currentDirectory = '/';
        this.fileSystem = {};
        this.basicMode = false;
        this.basicInterpreter = null;
        this.theme = {
            textColor: '#00ff00',
            bgColor: '#000000',
            promptColor: '#00ff00'
        };

        this.init();
    }

    init() {
        this.loadTheme();
        this.applyTheme();
        this.setupEventListeners();
        this.setupFileSystem();
        this.basicInterpreter = new BasicInterpreter(this);
        this.printWelcome();
        this.input.focus();
    }

    setupEventListeners() {
        this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));
        this.input.addEventListener('keyup', (e) => this.handleKeyUp(e));

        // Settings panel
        document.getElementById('settings-toggle').addEventListener('click', () => {
            const content = document.getElementById('settings-content');
            content.classList.toggle('hidden');
        });

        document.getElementById('close-settings').addEventListener('click', () => {
            document.getElementById('settings-content').classList.add('hidden');
        });

        document.getElementById('reset-theme').addEventListener('click', () => {
            this.resetTheme();
        });

        document.getElementById('text-color').addEventListener('change', (e) => {
            this.theme.textColor = e.target.value;
            this.saveTheme();
            this.applyTheme();
        });

        document.getElementById('bg-color').addEventListener('change', (e) => {
            this.theme.bgColor = e.target.value;
            this.saveTheme();
            this.applyTheme();
        });

        document.getElementById('prompt-color').addEventListener('change', (e) => {
            this.theme.promptColor = e.target.value;
            this.saveTheme();
            this.applyTheme();
        });
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = this.input.value.trim();
            if (command) {
                this.executeCommand(command);
                this.commandHistory.push(command);
                this.historyIndex = -1;
                this.input.value = '';
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.historyIndex = Math.min(this.historyIndex + 1, this.commandHistory.length - 1);
            if (this.historyIndex >= 0) {
                this.input.value = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.historyIndex = Math.max(this.historyIndex - 1, -1);
            if (this.historyIndex >= 0) {
                this.input.value = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
            } else {
                this.input.value = '';
            }
        }
    }

    handleKeyUp(e) {
        // Allow standard copy/paste behavior
        if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'v')) {
            e.preventDefault();
            if (e.key === 'c') {
                // Copy selected text
                if (this.input.selectionStart !== this.input.selectionEnd) {
                    document.execCommand('copy');
                }
            }
        }
    }

    executeCommand(command) {
        // Handle BASIC mode
        if (this.basicMode) {
            if (command.toUpperCase() === 'EXIT' || command.toUpperCase() === 'SYSTEM') {
                this.basicMode = false;
                this.print('Exiting BASIC mode', 'success-output');
                return;
            }
            this.basicInterpreter.parseAndExecute(command);
            return;
        }

        this.echo(command);

        const parts = command.split(/\s+/);
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        switch (cmd) {
            case 'help':
                this.cmdHelp();
                break;
            case 'clear':
            case 'cls':
                this.cmdClear();
                break;
            case 'echo':
                this.cmdEcho(args);
                break;
            case 'dir':
                this.cmdDir(args);
                break;
            case 'ls':
                this.cmdLs(args);
                break;
            case 'cd':
                this.cmdCd(args);
                break;
            case 'pwd':
                this.cmdPwd();
                break;
            case 'mkdir':
                this.cmdMkdir(args);
                break;
            case 'rmdir':
                this.cmdRmdir(args);
                break;
            case 'touch':
                this.cmdTouch(args);
                break;
            case 'rm':
                this.cmdRm(args);
                break;
            case 'cat':
                this.cmdCat(args);
                break;
            case 'type':
                this.cmdType(args);
                break;
            case 'time':
                this.cmdTime();
                break;
            case 'date':
                this.cmdDate();
                break;
            case 'ver':
                this.cmdVer();
                break;
            case 'basic':
                this.cmdBasicMode();
                break;
            case 'history':
                this.cmdHistory();
                break;
            case 'exit':
            case 'quit':
                this.cmdExit();
                break;
            case '':
                break;
            default:
                this.printError(`'${cmd}' is not recognized as an internal or external command.`);
        }
    }

    cmdHelp() {
        const help = `
RetroTerminal - Vintage Terminal Emulator
Supported Commands:

DOS Commands:
  DIR          - List directory contents
  CD <path>    - Change directory
  MD/MKDIR     - Create directory
  RD/RMDIR     - Remove directory
  TYPE <file>  - Display file contents
  DEL/RM       - Delete file
  CLS/CLEAR    - Clear screen
  TIME         - Display current time
  DATE         - Display current date
  VER          - Display version info

Linux Commands:
  LS           - List files
  PWD          - Print working directory
  TOUCH <file> - Create empty file
  CAT <file>   - Display file contents
  RM <file>    - Remove file

BASIC Mode:
  BASIC        - Enter BASIC interpreter
  EXIT/SYSTEM  - Exit BASIC mode

Other:
  ECHO <text>  - Echo text
  HISTORY      - Show command history
  HELP         - Show this help
  EXIT/QUIT    - Exit terminal
`;
        this.print(help, 'command-output');
    }

    cmdClear() {
        this.output.innerHTML = '';
    }

    cmdEcho(args) {
        this.print(args.join(' '), 'command-output');
    }

    cmdDir(args) {
        const path = args.length > 0 ? args[0] : this.currentDirectory;
        const items = this.getDirectoryContents(path);
        if (items === null) {
            this.printError(`Directory '${path}' not found.`);
            return;
        }

        let output = `\n Volume in drive C has no label.\n Directory of ${path}\n\n`;
        for (const [name, type] of Object.entries(items)) {
            if (type === 'dir') {
                output += `<DIR>          ${name}\n`;
            } else {
                output += `         ${name}\n`;
            }
        }
        output += `\n`;
        this.print(output, 'command-output');
    }

    cmdLs(args) {
        const path = args.length > 0 ? args[0] : this.currentDirectory;
        const items = this.getDirectoryContents(path);
        if (items === null) {
            this.printError(`Directory '${path}' not found.`);
            return;
        }

        const names = Object.keys(items).join('  ');
        this.print(names || '(empty)', 'command-output');
    }

    cmdCd(args) {
        if (args.length === 0) {
            this.currentDirectory = '/';
            return;
        }

        const path = args[0];
        if (path === '..') {
            const parts = this.currentDirectory.split('/').filter(p => p);
            if (parts.length > 0) {
                parts.pop();
                this.currentDirectory = '/' + parts.join('/');
            }
        } else if (path === '/') {
            this.currentDirectory = '/';
        } else {
            const newPath = path.startsWith('/') ? path : this.currentDirectory + (this.currentDirectory === '/' ? '' : '/') + path;
            if (this.pathExists(newPath)) {
                this.currentDirectory = newPath;
            } else {
                this.printError(`Directory '${path}' not found.`);
            }
        }
    }

    cmdPwd() {
        this.print(this.currentDirectory, 'command-output');
    }

    cmdMkdir(args) {
        if (args.length === 0) {
            this.printError('Syntax: MKDIR <directory>');
            return;
        }
        this.createDirectory(args[0]);
        this.print(`Created directory '${args[0]}'`, 'success-output');
    }

    cmdRmdir(args) {
        if (args.length === 0) {
            this.printError('Syntax: RMDIR <directory>');
            return;
        }
        this.removeDirectory(args[0]);
        this.print(`Removed directory '${args[0]}'`, 'success-output');
    }

    cmdTouch(args) {
        if (args.length === 0) {
            this.printError('Syntax: TOUCH <filename>');
            return;
        }
        this.createFile(args[0], '');
        this.print(`Created file '${args[0]}'`, 'success-output');
    }

    cmdRm(args) {
        if (args.length === 0) {
            this.printError('Syntax: RM <filename>');
            return;
        }
        this.removeFile(args[0]);
        this.print(`Deleted file '${args[0]}'`, 'success-output');
    }

    cmdCat(args) {
        if (args.length === 0) {
            this.printError('Syntax: CAT <filename>');
            return;
        }
        const content = this.readFile(args[0]);
        if (content !== null) {
            this.print(content, 'command-output');
        } else {
            this.printError(`File '${args[0]}' not found.`);
        }
    }

    cmdType(args) {
        if (args.length === 0) {
            this.printError('Syntax: TYPE <filename>');
            return;
        }
        const content = this.readFile(args[0]);
        if (content !== null) {
            this.print(content, 'command-output');
        } else {
            this.printError(`File '${args[0]}' not found.`);
        }
    }

    cmdTime() {
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { hour12: true });
        this.print(`Current time is ${time}`, 'command-output');
    }

    cmdDate() {
        const now = new Date();
        const date = now.toLocaleDateString('en-US');
        this.print(`Current date is ${date}`, 'command-output');
    }

    cmdVer() {
        this.print('RetroTerminal v1.0.0 - Vintage Terminal Emulator', 'command-output');
    }

    cmdBasicMode() {
        this.basicMode = true;
        this.print('Entering BASIC mode. Type "SYSTEM" or "EXIT" to return.', 'success-output');
        this.print('Type "HELP" in BASIC mode for available commands.', 'command-output');
    }

    cmdHistory() {
        if (this.commandHistory.length === 0) {
            this.print('(No command history)', 'command-output');
            return;
        }
        this.commandHistory.forEach((cmd, i) => {
            this.print(`${i + 1}  ${cmd}`, 'command-output');
        });
    }

    cmdExit() {
        this.print('Thank you for using RetroTerminal!', 'command-output');
    }

    // File system operations
    setupFileSystem() {
        this.fileSystem = {
            '': {
                'README.txt': { type: 'file', content: 'Welcome to RetroTerminal!' },
                'DOCS': { type: 'dir', content: {} },
                'PROGRAMS': { type: 'dir', content: {} }
            }
        };
    }

    pathExists(path) {
        const parts = path.split('/').filter(p => p);
        let current = this.fileSystem[''];

        for (const part of parts) {
            if (current[part] && current[part].type === 'dir') {
                current = current[part].content;
            } else {
                return false;
            }
        }
        return true;
    }

    getDirectoryContents(path) {
        const parts = path.split('/').filter(p => p);
        let current = this.fileSystem[''];

        for (const part of parts) {
            if (current[part] && current[part].type === 'dir') {
                current = current[part].content;
            } else {
                return null;
            }
        }

        const items = {};
        for (const [name, item] of Object.entries(current)) {
            items[name] = item.type;
        }
        return items;
    }

    createDirectory(name) {
        const parts = this.currentDirectory.split('/').filter(p => p);
        let current = this.fileSystem[''];

        for (const part of parts) {
            current = current[part].content;
        }

        current[name] = { type: 'dir', content: {} };
    }

    removeDirectory(name) {
        const parts = this.currentDirectory.split('/').filter(p => p);
        let current = this.fileSystem[''];

        for (const part of parts) {
            current = current[part].content;
        }

        if (current[name]) {
            delete current[name];
        }
    }

    createFile(name, content) {
        const parts = this.currentDirectory.split('/').filter(p => p);
        let current = this.fileSystem[''];

        for (const part of parts) {
            current = current[part].content;
        }

        current[name] = { type: 'file', content: content };
    }

    readFile(name) {
        const parts = this.currentDirectory.split('/').filter(p => p);
        let current = this.fileSystem[''];

        for (const part of parts) {
            if (current[part] && current[part].type === 'dir') {
                current = current[part].content;
            } else {
                return null;
            }
        }

        if (current[name] && current[name].type === 'file') {
            return current[name].content;
        }
        return null;
    }

    removeFile(name) {
        const parts = this.currentDirectory.split('/').filter(p => p);
        let current = this.fileSystem[''];

        for (const part of parts) {
            if (current[part] && current[part].type === 'dir') {
                current = current[part].content;
            } else {
                return;
            }
        }

        if (current[name]) {
            delete current[name];
        }
    }

    // Output methods
    echo(text) {
        const line = document.createElement('div');
        line.className = 'output-line command-echo';
        line.textContent = (this.basicMode ? '> ' : 'C:\\> ') + text;
        this.output.appendChild(line);
        this.scrollToBottom();
    }

    print(text, className = 'command-output') {
        const line = document.createElement('div');
        line.className = `output-line ${className}`;
        line.textContent = text;
        this.output.appendChild(line);
        this.scrollToBottom();
    }

    printError(text) {
        this.print(text, 'error-output');
    }

    printWelcome() {
        this.print('╔════════════════════════════════════════╗', 'command-output');
        this.print('║  RetroTerminal v1.0.0                  ║', 'command-output');
        this.print('║  Vintage Terminal Emulator             ║', 'command-output');
        this.print('║  Type "HELP" for command list          ║', 'command-output');
        this.print('║  Type "BASIC" to enter BASIC mode      ║', 'command-output');
        this.print('╚════════════════════════════════════════╝', 'command-output');
        this.print('', 'command-output');
    }

    scrollToBottom() {
        this.output.scrollTop = this.output.scrollHeight;
    }

    // Theme management
    loadTheme() {
        const saved = localStorage.getItem('retroTerminalTheme');
        if (saved) {
            this.theme = JSON.parse(saved);
        }
        this.updateColorInputs();
    }

    saveTheme() {
        localStorage.setItem('retroTerminalTheme', JSON.stringify(this.theme));
    }

    applyTheme() {
        document.documentElement.style.setProperty('--text-color', this.theme.textColor);
        document.documentElement.style.setProperty('--bg-color', this.theme.bgColor);
        document.documentElement.style.setProperty('--prompt-color', this.theme.promptColor);

        this.terminalContainer.style.color = this.theme.textColor;
        this.terminalContainer.style.backgroundColor = this.theme.bgColor;
        this.input.style.color = this.theme.textColor;

        const style = document.createElement('style');
        style.textContent = `
            .terminal-container { background-color: ${this.theme.bgColor} !important; color: ${this.theme.textColor} !important; }
            .terminal { background-color: ${this.theme.bgColor} !important; color: ${this.theme.textColor} !important; }
            .terminal-output { color: ${this.theme.textColor} !important; }
            .terminal-input { color: ${this.theme.textColor} !important; caret-color: ${this.theme.textColor} !important; }
            .prompt { color: ${this.theme.promptColor} !important; }
            .command-echo { color: ${this.theme.promptColor} !important; }
            .command-output { color: ${this.theme.textColor} !important; }
        `;
        document.head.appendChild(style);
    }

    updateColorInputs() {
        document.getElementById('text-color').value = this.theme.textColor;
        document.getElementById('bg-color').value = this.theme.bgColor;
        document.getElementById('prompt-color').value = this.theme.promptColor;
    }

    resetTheme() {
        this.theme = {
            textColor: '#00ff00',
            bgColor: '#000000',
            promptColor: '#00ff00'
        };
        this.saveTheme();
        this.applyTheme();
        this.updateColorInputs();
        this.print('Theme reset to default', 'success-output');
    }
}

// Initialize terminal when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new RetroTerminal();
});
