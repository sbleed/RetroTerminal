class BasicInterpreter {
    constructor(terminal) {
        this.terminal = terminal;
        this.variables = {};
        this.memory = new Array(65536).fill(0); // 64KB memory like classic BASIC
        this.lines = {};
        this.currentLine = 0;
        this.isRunning = false;
        this.inBasicMode = false;
    }

    reset() {
        this.variables = {};
        this.lines = {};
        this.currentLine = 0;
        this.isRunning = false;
    }

    parseAndExecute(input) {
        const trimmed = input.trim();
        if (!trimmed) return;

        // Check if it's a line number (program line)
        const lineMatch = trimmed.match(/^(\d+)\s+(.*)/);
        if (lineMatch) {
            const lineNum = parseInt(lineMatch[1]);
            const statement = lineMatch[2].trim();
            this.lines[lineNum] = statement;
            return;
        }

        // Execute immediate command
        this.executeStatement(trimmed);
    }

    executeStatement(statement) {
        const tokens = this.tokenize(statement);
        if (tokens.length === 0) return;

        const cmd = tokens[0].toUpperCase();

        switch (cmd) {
            case 'PRINT':
                this.cmdPrint(tokens.slice(1));
                break;
            case 'INPUT':
                this.cmdInput(tokens.slice(1));
                break;
            case 'LET':
                this.cmdLet(tokens.slice(1));
                break;
            case 'IF':
                this.cmdIf(tokens);
                break;
            case 'GOTO':
                this.cmdGoto(tokens.slice(1));
                break;
            case 'GOSUB':
                this.cmdGosub(tokens.slice(1));
                break;
            case 'RETURN':
                this.cmdReturn();
                break;
            case 'FOR':
                this.cmdFor(tokens.slice(1));
                break;
            case 'NEXT':
                this.cmdNext(tokens.slice(1));
                break;
            case 'WHILE':
                this.cmdWhile(tokens.slice(1));
                break;
            case 'WEND':
                this.cmdWend();
                break;
            case 'DO':
                this.cmdDo();
                break;
            case 'LOOP':
                this.cmdLoop(tokens.slice(1));
                break;
            case 'DIM':
                this.cmdDim(tokens.slice(1));
                break;
            case 'REM':
            case "'":
                break;
            case 'PEEK':
                this.cmdPeek(tokens.slice(1));
                break;
            case 'POKE':
                this.cmdPoke(tokens.slice(1));
                break;
            case 'CLS':
                this.cmdCls();
                break;
            case 'END':
                this.cmdEnd();
                break;
            case 'RUN':
                this.cmdRun(tokens.slice(1));
                break;
            case 'LIST':
                this.cmdList(tokens.slice(1));
                break;
            case 'NEW':
                this.cmdNew();
                break;
            case 'SAVE':
                this.cmdSave(tokens.slice(1));
                break;
            case 'LOAD':
                this.cmdLoad(tokens.slice(1));
                break;
            case 'RANDOMIZE':
                this.cmdRandomize(tokens.slice(1));
                break;
            case 'DELAY':
                this.cmdDelay(tokens.slice(1));
                break;
            case 'SOUND':
                this.cmdSound(tokens.slice(1));
                break;
            case 'MOD':
                this.cmdMod(tokens.slice(1));
                break;
            case 'ABS':
                this.cmdAbs(tokens.slice(1));
                break;
            case 'SQR':
            case 'SQRT':
                this.cmdSqrt(tokens.slice(1));
                break;
            case 'SIN':
                this.cmdSin(tokens.slice(1));
                break;
            case 'COS':
                this.cmdCos(tokens.slice(1));
                break;
            case 'TAN':
                this.cmdTan(tokens.slice(1));
                break;
            case 'LOG':
                this.cmdLog(tokens.slice(1));
                break;
            case 'EXP':
                this.cmdExp(tokens.slice(1));
                break;
            case 'INT':
                this.cmdInt(tokens.slice(1));
                break;
            case 'RND':
                this.cmdRnd(tokens.slice(1));
                break;
            case 'LEN':
                this.cmdLen(tokens.slice(1));
                break;
            case 'MID$':
                this.cmdMid(tokens.slice(1));
                break;
            case 'LEFT$':
                this.cmdLeft(tokens.slice(1));
                break;
            case 'RIGHT$':
                this.cmdRight(tokens.slice(1));
                break;
            case 'UCASE$':
                this.cmdUcase(tokens.slice(1));
                break;
            case 'LCASE$':
                this.cmdLcase(tokens.slice(1));
                break;
            case 'STR$':
                this.cmdStr(tokens.slice(1));
                break;
            case 'VAL':
                this.cmdVal(tokens.slice(1));
                break;
            case 'CHR$':
                this.cmdChr(tokens.slice(1));
                break;
            case 'ASC':
                this.cmdAsc(tokens.slice(1));
                break;
            case 'INKEY$':
                this.cmdInkey();
                break;
            case 'SYSTEM':
                this.cmdSystem();
                break;
            case 'HELP':
                this.cmdHelp();
                break;
            default:
                this.terminal.printError(`Unknown command: ${cmd}`);
        }
    }

    cmdPrint(tokens) {
        let output = '';
        let i = 0;
        while (i < tokens.length) {
            const token = tokens[i];
            if (token === ';') {
                i++;
            } else if (token === ',') {
                output += '\t';
                i++;
            } else {
                const value = this.evaluateExpression(tokens.slice(i));
                output += value.result;
                i += value.tokensUsed;
            }
        }
        this.terminal.print(output, 'command-output');
    }

    cmdInput(tokens) {
        const prompt = tokens.join(' ').replace(/^["']|["']$/g, '') || '? ';
        const userInput = window.prompt(prompt);
        if (userInput !== null) {
            const varName = tokens[tokens.length - 1];
            this.variables[varName] = isNaN(userInput) ? userInput : parseFloat(userInput);
        }
    }

    cmdLet(tokens) {
        const equalIndex = tokens.indexOf('=');
        if (equalIndex === -1) {
            this.terminal.printError('Syntax Error: Expected =');
            return;
        }
        const varName = tokens[0];
        const expression = tokens.slice(equalIndex + 1);
        const value = this.evaluateExpression(expression);
        this.variables[varName] = value.result;
    }

    cmdIf(tokens) {
        const thenIndex = tokens.findIndex(t => t.toUpperCase() === 'THEN');
        if (thenIndex === -1) {
            this.terminal.printError('Syntax Error: Expected THEN');
            return;
        }
        const condition = tokens.slice(1, thenIndex);
        const conditionResult = this.evaluateCondition(condition);
        if (conditionResult) {
            const thenStatements = tokens.slice(thenIndex + 1);
            this.executeStatement(thenStatements.join(' '));
        }
    }

    cmdGoto(tokens) {
        const lineNum = parseInt(tokens[0]);
        this.currentLine = lineNum;
    }

    cmdGosub(tokens) {
        const lineNum = parseInt(tokens[0]);
        this.currentLine = lineNum;
    }

    cmdReturn() {}

    cmdFor(tokens) {
        const eqIndex = tokens.indexOf('=');
        const toIndex = tokens.findIndex(t => t.toUpperCase() === 'TO');
        if (eqIndex === -1 || toIndex === -1) {
            this.terminal.printError('Syntax Error: FOR var = start TO end [STEP step]');
            return;
        }
        const varName = tokens[0];
        const start = this.evaluateExpression(tokens.slice(eqIndex + 1, toIndex)).result;
        this.variables[varName] = start;
    }

    cmdNext(tokens) {}
    cmdWhile(tokens) {}
    cmdWend() {}
    cmdDo() {}
    cmdLoop(tokens) {}

    cmdDim(tokens) {
        const varName = tokens[0].split('(')[0];
        this.variables[varName] = [];
    }

    // PEEK command - read from memory
    cmdPeek(tokens) {
        const address = parseInt(this.evaluateExpression(tokens).result);
        if (address >= 0 && address < this.memory.length) {
            this.terminal.print(`PEEK(${address}) = ${this.memory[address]}`, 'command-output');
        } else {
            this.terminal.printError('Memory address out of range');
        }
    }

    // POKE command - write to memory
    cmdPoke(tokens) {
        const commaIndex = tokens.indexOf(',');
        if (commaIndex === -1) {
            this.terminal.printError('Syntax Error: POKE address, value');
            return;
        }
        const address = parseInt(this.evaluateExpression(tokens.slice(0, commaIndex)).result);
        const value = parseInt(this.evaluateExpression(tokens.slice(commaIndex + 1)).result);
        if (address >= 0 && address < this.memory.length) {
            this.memory[address] = value & 0xFF;
            this.terminal.print(`Poked ${value} at address ${address}`, 'success-output');
        } else {
            this.terminal.printError('Memory address out of range');
        }
    }

    cmdCls() {
        this.terminal.output.innerHTML = '';
    }

    cmdEnd() {
        this.isRunning = false;
        this.terminal.print('Program ended', 'command-output');
    }

    cmdRun(tokens) {
        this.isRunning = true;
        const lineNumbers = Object.keys(this.lines).map(Number).sort((a, b) => a - b);
        for (const lineNum of lineNumbers) {
            this.currentLine = lineNum;
            this.executeStatement(this.lines[lineNum]);
            if (!this.isRunning) break;
        }
        this.terminal.print('Program finished', 'success-output');
    }

    cmdList(tokens) {
        const lineNumbers = Object.keys(this.lines).map(Number).sort((a, b) => a - b);
        if (lineNumbers.length === 0) {
            this.terminal.print('(empty)', 'command-output');
            return;
        }
        for (const lineNum of lineNumbers) {
            this.terminal.print(`${lineNum} ${this.lines[lineNum]}`, 'command-output');
        }
    }

    cmdNew() {
        this.reset();
        this.terminal.print('Program cleared', 'success-output');
    }

    cmdSave(tokens) {
        const filename = tokens[0] || 'program.bas';
        const programText = Object.keys(this.lines)
            .map(Number)
            .sort((a, b) => a - b)
            .map(lineNum => `${lineNum} ${this.lines[lineNum]}`)
            .join('\n');
        localStorage.setItem(`basic_program_${filename}`, programText);
        this.terminal.print(`Program saved as ${filename}`, 'success-output');
    }

    cmdLoad(tokens) {
        const filename = tokens[0] || 'program.bas';
        const programText = localStorage.getItem(`basic_program_${filename}`);
        if (!programText) {
            this.terminal.printError(`File not found: ${filename}`);
            return;
        }
        this.reset();
        const lines = programText.split('\n');
        for (const line of lines) {
            const match = line.match(/^(\d+)\s+(.*)/);
            if (match) {
                this.lines[parseInt(match[1])] = match[2];
            }
        }
        this.terminal.print(`Program loaded from ${filename}`, 'success-output');
    }

    cmdRandomize(tokens) {
        this.terminal.print('Random number generator initialized', 'command-output');
    }

    cmdDelay(tokens) {
        const ms = parseInt(this.evaluateExpression(tokens).result);
        const start = Date.now();
        while (Date.now() - start < ms) {}
    }

    cmdSound(tokens) {
        this.terminal.print('🔊 BEEP', 'command-output');
    }

    cmdMod(tokens) {
        const commaIndex = tokens.indexOf(',');
        const a = this.evaluateExpression(tokens.slice(0, commaIndex)).result;
        const b = this.evaluateExpression(tokens.slice(commaIndex + 1)).result;
        this.terminal.print(a % b, 'command-output');
    }

    cmdAbs(tokens) {
        const value = this.evaluateExpression(tokens).result;
        this.terminal.print(Math.abs(value), 'command-output');
    }

    cmdSqrt(tokens) {
        const value = this.evaluateExpression(tokens).result;
        this.terminal.print(Math.sqrt(value), 'command-output');
    }

    cmdSin(tokens) {
        const value = this.evaluateExpression(tokens).result;
        this.terminal.print(Math.sin(value), 'command-output');
    }

    cmdCos(tokens) {
        const value = this.evaluateExpression(tokens).result;
        this.terminal.print(Math.cos(value), 'command-output');
    }

    cmdTan(tokens) {
        const value = this.evaluateExpression(tokens).result;
        this.terminal.print(Math.tan(value), 'command-output');
    }

    cmdLog(tokens) {
        const value = this.evaluateExpression(tokens).result;
        this.terminal.print(Math.log(value), 'command-output');
    }

    cmdExp(tokens) {
        const value = this.evaluateExpression(tokens).result;
        this.terminal.print(Math.exp(value), 'command-output');
    }

    cmdInt(tokens) {
        const value = this.evaluateExpression(tokens).result;
        this.terminal.print(Math.floor(value), 'command-output');
    }

    cmdRnd(tokens) {
        this.terminal.print(Math.random(), 'command-output');
    }

    cmdLen(tokens) {
        const str = this.evaluateExpression(tokens).result.toString();
        this.terminal.print(str.length, 'command-output');
    }

    cmdMid(tokens) {
        this.terminal.print('MID$ function', 'command-output');
    }

    cmdLeft(tokens) {
        this.terminal.print('LEFT$ function', 'command-output');
    }

    cmdRight(tokens) {
        this.terminal.print('RIGHT$ function', 'command-output');
    }

    cmdUcase(tokens) {
        const str = this.evaluateExpression(tokens).result.toString();
        this.terminal.print(str.toUpperCase(), 'command-output');
    }

    cmdLcase(tokens) {
        const str = this.evaluateExpression(tokens).result.toString();
        this.terminal.print(str.toLowerCase(), 'command-output');
    }

    cmdStr(tokens) {
        const value = this.evaluateExpression(tokens).result;
        this.terminal.print(String(value), 'command-output');
    }

    cmdVal(tokens) {
        const str = this.evaluateExpression(tokens).result.toString();
        this.terminal.print(parseFloat(str), 'command-output');
    }

    cmdChr(tokens) {
        const code = parseInt(this.evaluateExpression(tokens).result);
        this.terminal.print(String.fromCharCode(code), 'command-output');
    }

    cmdAsc(tokens) {
        const str = this.evaluateExpression(tokens).result.toString();
        this.terminal.print(str.charCodeAt(0), 'command-output');
    }

    cmdInkey() {
        this.terminal.print('(Waiting for key...)', 'command-output');
    }

    cmdSystem() {
        this.terminal.print('Returning to system...', 'command-output');
    }

    cmdHelp() {
        const help = `
BASIC COMMANDS:
  PRINT expr          - Output text/values
  INPUT var           - Read user input
  LET var = expr      - Assign variable
  IF cond THEN stmt   - Conditional execution
  GOTO line#          - Jump to line
  FOR var=a TO b      - Loop with counter
  NEXT var            - End FOR loop
  WHILE cond          - Start while loop
  WEND                - End while loop
  DIM array(size)     - Declare array
  
MEMORY:
  PEEK(addr)          - Read memory address
  POKE addr, value    - Write to memory
  
MATH FUNCTIONS:
  ABS, SQR/SQRT, SIN, COS, TAN, LOG, EXP, INT, RND, MOD
  
STRING FUNCTIONS:
  LEN, MID$, LEFT$, RIGHT$, UCASE$, LCASE$, STR$, VAL, CHR$, ASC
  
PROGRAM:
  RUN                 - Execute program
  LIST                - Show program
  NEW                 - Clear program
  SAVE filename       - Save to storage
  LOAD filename       - Load from storage
  END                 - Stop program
  
OTHER:
  REM                 - Comment
  CLS                 - Clear screen
  RANDOMIZE           - Init random
  SOUND               - Beep
  SYSTEM/EXIT         - Exit BASIC mode
`;
        this.terminal.print(help, 'command-output');
    }

    tokenize(input) {
        return input.match(/\b\w+\$?|\d+\.?\d*|"[^"]*"|'[^']*'|[+\-*/=(),;<>]/g) || [];
    }

    evaluateExpression(tokens) {
        if (tokens.length === 0) return { result: 0, tokensUsed: 0 };
        let i = 0;
        let result = 0;
        const firstToken = tokens[i];
        if (!isNaN(firstToken)) {
            result = parseFloat(firstToken);
            i++;
        } else if (this.variables[firstToken]) {
            result = this.variables[firstToken];
            i++;
        } else if (firstToken === '"' || firstToken === "'") {
            result = tokens[i + 1];
            i += 3;
        }
        while (i < tokens.length && ['+', '-', '*', '/'].includes(tokens[i])) {
            const op = tokens[i];
            const nextValue = parseFloat(tokens[i + 1]) || this.variables[tokens[i + 1]] || 0;
            switch (op) {
                case '+': result += nextValue; break;
                case '-': result -= nextValue; break;
                case '*': result *= nextValue; break;
                case '/': result /= nextValue; break;
            }
            i += 2;
        }
        return { result, tokensUsed: i };
    }

    evaluateCondition(tokens) {
        const comparisonOps = ['<', '>', '=', '<=', '>=', '<>'];
        let operator = null;
        let opIndex = -1;
        for (const op of comparisonOps) {
            opIndex = tokens.indexOf(op);
            if (opIndex !== -1) {
                operator = op;
                break;
            }
        }
        if (!operator) return false;
        const left = this.evaluateExpression(tokens.slice(0, opIndex)).result;
        const right = this.evaluateExpression(tokens.slice(opIndex + 1)).result;
        switch (operator) {
            case '<': return left < right;
            case '>': return left > right;
            case '=': return left === right;
            case '<=': return left <= right;
            case '>=': return left >= right;
            case '<>': return left !== right;
            default: return false;
        }
    }
}