# RetroTerminal - Vintage Terminal Emulator

A browser-based terminal emulator that emulates classic MS-DOS 6.22, Linux, and BASIC command environments with authentic CRT monitor aesthetics.

## Features

### Command Support
- **MS-DOS Commands**: DIR, CD, MD, RD, TYPE, DEL, CLS, TIME, DATE, VER
- **Linux Commands**: LS, PWD, TOUCH, CAT, RM
- **BASIC Commands**: Full BASIC interpreter with 50+ commands
- **Utility Commands**: ECHO, HELP, HISTORY, EXIT

### User Experience
- **Command History**: Navigate previous commands with UP/DOWN arrow keys
- **Copy & Paste**: Full support for copying and pasting commands and text
- **Smooth Scrolling**: Fast, smooth output streaming for authentic feel
- **CRT Scanlines**: Animated scanline effect every other line for vintage monitor appearance

### Customization
- **Themeable**: Easy customization through settings panel
  - Text color
  - Background color
  - Prompt color
- **Default Theme**: Classic green monochrome (#00ff00 on #000000)
- **Persistent Settings**: Theme preferences saved to browser localStorage

### File System
- Virtual file system with directory and file support
- Create, read, delete files and directories
- Navigate the file system with CD command
- View directory contents with DIR/LS

## Getting Started

1. Open `index.html` in a web browser (Chrome, Firefox, Safari, Edge)
2. Start typing commands
3. Press Enter to execute
4. Use UP/DOWN arrows to recall previous commands

## Controls

| Key/Action | Function |
|-----------|----------|
| Enter | Execute command |
| UP Arrow | Previous command in history |
| DOWN Arrow | Next command in history |
| Ctrl+C / Cmd+C | Copy selected text |
| Ctrl+V / Cmd+V | Paste text |
| ⚙️ Button | Open settings panel |

## Available Commands

### Navigation & Directories
```
dir [path]          - List directory contents (DOS)
ls [path]           - List files (Linux)
cd [directory]      - Change directory
cd ..               - Go to parent directory
pwd                 - Print working directory
mkdir <name>        - Create directory
rmdir <name>        - Remove directory
```

### File Operations
```
type <filename>     - Display file contents (DOS)
cat <filename>      - Display file contents (Linux)
touch <filename>    - Create empty file
rm <filename>       - Delete file
del <filename>      - Delete file (DOS)
```

### System Commands
```
cls                 - Clear screen (DOS)
clear               - Clear screen (Linux)
time                - Show current time
date                - Show current date
ver                 - Show version information
echo <text>         - Echo text to screen
help                - Show help menu
history             - Show command history
basic               - Enter BASIC interpreter mode
```

## BASIC Interpreter

### Entering BASIC Mode
```
BASIC
```

### Control Flow
```
IF condition THEN statement     - Conditional execution
GOTO line_number                - Jump to line
GOSUB line_number               - Call subroutine
RETURN                          - Return from subroutine
FOR var = start TO end [STEP n] - Loop with counter
NEXT var                        - Next iteration
WHILE condition                 - Start while loop
WEND                            - End while loop
DO                              - Start do loop
LOOP [UNTIL/WHILE condition]    - End loop
```

### Variables & Arrays
```
LET var = expression    - Assign variable
DIM array(size)         - Declare array
```

### Input/Output
```
PRINT expression        - Output to screen
INPUT var              - Read from user
INKEY$                 - Get keyboard input
```

### Memory Operations (PEEK/POKE)
```
PEEK(address)          - Read byte from memory address
POKE address, value    - Write byte to memory address
```

Memory space is 64KB (0-65535), emulating classic BASIC systems.

### Math Functions
```
ABS(x)              - Absolute value
SQR(x) or SQRT(x)   - Square root
SIN(x), COS(x), TAN(x) - Trigonometry (radians)
LOG(x)              - Natural logarithm
EXP(x)              - Exponential (e^x)
INT(x)              - Integer conversion
RND                 - Random number (0-1)
MOD(a, b)           - Modulo (remainder)
```

### String Functions
```
LEN(string)         - String length
MID$(string, start, len) - Extract substring
LEFT$(string, len)  - Get left portion
RIGHT$(string, len) - Get right portion
UCASE$(string)      - Convert to uppercase
LCASE$(string)      - Convert to lowercase
STR$(number)        - Convert number to string
VAL(string)         - Convert string to number
CHR$(code)          - Get character from ASCII code
ASC(char)           - Get ASCII code of character
```

### Program Management
```
RUN                 - Execute loaded program
LIST                - Show program listing
NEW                 - Clear current program
SAVE filename       - Save program to storage
LOAD filename       - Load program from storage
END                 - Stop program execution
```

### Other BASIC Commands
```
REM text            - Comment (ignored)
CLS                 - Clear screen
RANDOMIZE           - Initialize random number generator
DELAY ms            - Wait milliseconds
SOUND               - Play beep sound
SYSTEM or EXIT      - Exit BASIC mode
HELP                - Show BASIC help
```

## Example BASIC Programs

### Hello World
```
10 PRINT "Hello, World!"
20 END
```

### Multiplication Table
```
10 PRINT "*** MULTIPLICATION TABLE ***"
20 FOR I = 1 TO 10
30 FOR J = 1 TO 10
40 PRINT I * J;
50 NEXT J
60 PRINT
70 NEXT I
80 END
```

### Memory Test
```
10 PRINT "Testing POKE and PEEK"
20 POKE 1024, 65
30 PEEK 1024
40 END
```

### Input and Calculation
```
10 PRINT "Enter two numbers:"
20 INPUT A
30 INPUT B
40 PRINT "Sum: "; A + B
50 PRINT "Product: "; A * B
60 END
```

## Customization Guide

### Changing Theme Colors

Click the **⚙️ Settings** button in the bottom-right corner:

1. **Text Color**: Choose the color of text output
2. **Background Color**: Choose the terminal background
3. **Prompt Color**: Choose the color of the command prompt
4. **Reset to Default**: Restore original green/black theme

Themes are automatically saved to your browser's localStorage.

### Modifying CSS

Edit `styles.css` to customize:
- Font size: Change `font-size: 14px`
- Scanline intensity: Adjust `rgba(0, 0, 0, 0.3)` opacity
- Scanline animation speed: Change `animation: scanline-move 8s`

## Browser Compatibility

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Technical Details

### Technologies Used
- Vanilla JavaScript (ES6+)
- CSS3 (Animations, Flexbox, Grid)
- HTML5

### Architecture
- **basic.js**: BASIC interpreter with 50+ commands including PEEK/POKE
- **terminal.js**: Terminal shell with DOS/Linux commands
- **styles.css**: CRT effects and theming
- **index.html**: UI layout and structure

### Features
- Virtual file system in memory
- 64KB virtual memory for PEEK/POKE operations
- Command history with keyboard navigation
- Theme persistence using localStorage
- Smooth scroll animations
- CRT scanline animation
- Full copy/paste support

## Future Enhancements

- [ ] File upload/download functionality
- [ ] Multi-window support
- [ ] Advanced BASIC control structures
- [ ] Sound effects (beep tones)
- [ ] Screen saver mode
- [ ] Additional DOS/Linux commands
- [ ] Dark/light theme presets
- [ ] Keyboard shortcuts customization
- [ ] Assembly language mode
- [ ] Graphics commands (PLOT, LINE, CIRCLE)

## License

MIT License - Feel free to use and modify as needed.

## Feedback

For issues, suggestions, or contributions, please create an issue or pull request on GitHub.

---

**RetroTerminal** - A modern take on retro computing! 🖥️💚