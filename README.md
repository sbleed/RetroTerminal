# RetroTerminal - Vintage Terminal Emulator

A browser-based terminal emulator that emulates classic MS-DOS 6.22, Linux/Unix, and BASIC command environments with authentic CRT monitor aesthetics.

## Features

### Triple Operating System Support
- **MS-DOS 6.22**: Full command set with 60+ authentic DOS commands
- **Linux/Unix**: 80+ Linux/Unix commands including networking and system tools
- **BASIC**: Complete BASIC interpreter with memory operations (PEEK/POKE)

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

---

# MS-DOS 6.22 Commands

## File Management Commands

```
COPY [/Y | /-Y] source destination
  - Copy files
  - /Y suppress prompts
  - /-Y ask before overwrite

DEL [drive:][path]filename [/P]
ERASE filename
  - Delete file
  - /P Prompt before deletion

DIR [drive:][path] [/P] [/W] [/S] [/B] [/L]
  - List directory contents
  - /P Pause after each screen
  - /W Wide format
  - /S Include subdirectories
  - /B Bare format
  - /L Lowercase

TYPE [drive:][path]filename
  - Display file contents

ATTRIB [+R | -R] [+A | -A] [+S | -S] [+H | -H] [[drive:][path]filename]
  - Change file attributes
  - R Read-only
  - A Archive
  - S System
  - H Hidden

XCOPY source destination [/S] [/E] [/V] [/R] [/P] [/D] [/Y]
  - Copy directory tree
  - /S Copy subdirectories
  - /E Copy empty subdirectories
  - /Y Suppress prompts

MOVE source destination
  - Move or rename files

REN [drive:][path]oldname newname
  - Rename files

REPLACE source [destination] [/A] [/P] [/R] [/W]
  - Replace files
```

## Directory Commands

```
CD [drive:][path]
CHDIR [drive:][path]
  - Change directory

MD [drive:][path]directory
MKDIR [drive:][path]directory
  - Create directory

RD [drive:][path]directory
RMDIR [drive:][path]directory
  - Remove directory

TREE [drive:][/F] [/A]
  - Show directory tree structure
  - /F Show files
  - /A Use ASCII characters
```

## System Commands

```
CLS
  - Clear screen

VER
  - Display MS-DOS version (6.22)

TIME
  - Show or set system time

DATE
  - Show or set system date

ECHO [text]
  - Display text or turn echo on/off

PROMPT [text]
  - Set command prompt (e.g., $P$G)

PATH [[drive:][path][;...]]
  - Show or set command search path

SET [variable=[value]]
  - Show or set environment variables

MEM [/CLASSIFY] [/FREE] [/MODULE] [/DEBUG]
  - Show memory status
  - Displays conventional, extended, and expanded memory

VOL [drive:]
  - Show volume label and serial number

LABEL [drive:][newlabel]
  - Show or change volume label
```

## Disk Commands

```
CHKDSK [drive:] [/F] [/V]
  - Check disk for errors
  - /F Fix errors found

FORMAT drive: [/S] [/U] [/Q]
  - Format disk
  - /S Transfer system files
  - /U Unconditional format
  - /Q Quick format

DEFRAG [drive:] [/F] [/S]
  - Defragment hard drive

FDISK
  - Partition fixed disk

DISKCOMP [drive1:] [drive2:]
  - Compare floppy disks

DISKCOPY source destination [/1] [/V]
  - Copy floppy disk
```

## Utility Commands

```
EDIT [drive:][path][filename]
  - MS-DOS text editor

FIND [/V] [/C] [/N] [/I] "string" [file1 file2...]
  - Search for text in files
  - /V Display lines NOT containing string
  - /C Count matching lines
  - /N Show line numbers
  - /I Ignore case

SORT [/R] [/+n]
  - Sort lines
  - /R Reverse sort
  - /+n Sort starting at column n

MODE [CO80 | CO40 | BW80 | BW40 | MONO]
  - Set display mode
  - CO Coloring
  - BW Black and white
  - 80/40 80 or 40 column

PRINT [/D:device] filename
  - Print file to device

FC [/A] [/C] [/L] [/LBn] [/N] [/T] [/W] [/nnnn] file1 file2
  - File compare
```

## Device Drivers & Hardware

```
DEVICE=[drive:][path]filename [device parameters]
  - Load device driver (in CONFIG.SYS)

DEVICEHIGH=[drive:][path]filename [device parameters]
  - Load device driver in Upper Memory

LH [/L:region1,minsize] [/S] [/U] command [parameters]
LOADHIGH [/L:region1,minsize] [/S] [/U] command [parameters]
  - Load program into upper memory

SETVER program version
  - Set DOS version for specific program

GRAPHICS [type] [/R] [/B] [/LCD] [/PRINTBOX:STD]
  - Enable graphics screen capture

KEYB [code [codepage] [/E] [/ID:keyb_id]]
  - Select keyboard layout
```

## Batch File Commands

```
CALL [drive:][path]filename [batch-parameters]
  - Call another batch file

GOTO label
  - Jump to label in batch file

IF [NOT] [ERRORLEVEL number | string1==string2 | EXIST filename] command
  - Conditional execution

REM [comment]
  - Comment line

PAUSE [text]
  - Pause batch file

SHIFT
  - Shift batch file parameters

FOR %%variable IN (set) DO command
  - Loop through set
```

## Advanced Commands

```
CHCP [code page]
  - Show or change code page

EXPAND source.Z destination
  - Expand compressed file

CTTY device
  - Set default terminal device

BREAK [ON | OFF]
  - Set/show Ctrl+C check

FASTOPEN [drive:] [/X]
  - Improve file access speed

SHARE [/F:space] [/L:locks]
  - Enable file sharing

UNDELETE [drive:] [/LIST] [/ALL] [/DS] [/DT]
  - Recover deleted files

UNFORMAT drive: [/J]
  - Unformat disk
```

---

# Linux/Unix Commands

## File System Navigation

```
ls [options] [path]
  - List directory contents
  - ls -l Long format
  - ls -a Show hidden files
  - ls -R Recursive listing
  - ls -h Human readable sizes

cd [directory]
  - Change directory
  - cd .. Parent directory
  - cd ~ Home directory
  - cd - Previous directory

pwd
  - Print working directory

mkdir [-p] directory
  - Create directory
  - -p Create parent directories

rmdir directory
  - Remove empty directory

rm [-r] [-f] file
  - Remove file
  - -r Recursive (for directories)
  - -f Force removal

touch filename
  - Create empty file or update timestamp
```

## File Operations

```
cat [file1 file2...]
  - Display file contents
  - cat > file Create file
  - cat >> file Append to file

cp [-r] [-v] source destination
  - Copy files
  - -r Recursive copy
  - -v Verbose

mv [-v] [-f] source destination
  - Move/rename file
  - -v Verbose
  - -f Force overwrite

grep [options] pattern [file...]
  - Search for pattern
  - grep -i Case insensitive
  - grep -n Show line numbers
  - grep -r Recursive search
  - grep -v Invert match

find path [options]
  - Find files
  - find -name pattern
  - find -type f/d
  - find -size +10M
  - find -mtime -7

locate filename
  - Find file by name (faster than find)
```

## File Content Inspection

```
head [-n lines] file
  - Show first N lines (default 10)

tail [-n lines] file
  - Show last N lines (default 10)
  - tail -f Follow file changes

wc [-l] [-w] [-c] file
  - Word/line count
  - -l Line count
  - -w Word count
  - -c Byte count

file filename
  - Identify file type

sort [options] file
  - Sort lines
  - sort -r Reverse
  - sort -n Numeric sort
  - sort -u Unique lines only

uniq [options] file
  - Show unique lines
  - uniq -c Count occurrences
  - uniq -d Only duplicates

diff file1 file2
  - Show differences between files
```

## User & Permissions

```
whoami
  - Show current user

id [username]
  - Show user/group IDs

who [options]
  - Show logged-in users
  - who -b Boot time
  - who -r Run level

w [username]
  - Show logged-in users with details

sudo command
  - Execute as superuser

chmod mode file
  - Change file permissions
  - chmod 755 file
  - chmod u+x file

chown user:group file
  - Change file owner
  - chown -R Recursive

chgrp group file
  - Change file group
```

## Process Management

```
ps [options]
  - Show processes
  - ps aux All processes
  - ps -ef Full format
  - ps -f Full listing

top [-d seconds]
  - Interactive process monitor

kill [-signal] PID
  - Terminate process
  - kill -9 Force kill
  - kill -TERM Graceful shutdown

bg [job]
  - Background job

fg [job]
  - Foreground job

jobs [-l]
  - List jobs
  - -l Show PIDs

nice [-n priority] command
  - Run with priority
```

## System Information

```
uname [options]
  - Show system information
  - uname -a All information
  - uname -r Kernel release
  - uname -m Machine type

hostname
  - Show system hostname
  - hostname [name] Set hostname

uptime
  - Show system uptime and load

df [options]
  - Show disk space usage
  - df -h Human readable

du [options] directory
  - Show directory size
  - du -sh Summary human readable

free [-m] [-g]
  - Show memory usage
  - -m Megabytes
  - -g Gigabytes
```

## Package Management

```
apt [subcommand] [package]
  - Debian/Ubuntu package manager
  - apt update Update package list
  - apt install package
  - apt remove package
  - apt upgrade Update packages

yum [subcommand] [package]
  - RedHat/CentOS package manager
  - yum install package
  - yum remove package
  - yum update Update packages
```

## Text Processing

```
echo [options] text
  - Print text
  - echo -n No newline
  - echo -e Interpret escapes

printf format [arguments]
  - Formatted output

sed [options] 'command' file
  - Stream editor
  - sed 's/old/new/' file Substitute
  - sed '10d' file Delete line

awk [options] 'pattern {action}' file
  - Pattern scanning and processing

cut [options] file
  - Cut columns from file
  - cut -d: -f1 field 1 using :

paste [-d delim] file1 file2
  - Merge lines from files

tr [options] set1 [set2]
  - Translate characters
```

## Archives & Compression

```
tar [options] archive.tar [files]
  - Tape archive utility
  - tar -cf Create archive
  - tar -xf Extract archive
  - tar -tf List contents
  - tar -czf Create gzipped

zip [-r] archive.zip file
  - Create zip archive
  - zip -r Recursive

unzip archive.zip
  - Extract zip archive

gzip filename
  - Compress file

gunzip filename.gz
  - Decompress file
```

## Networking

```
ifconfig [interface]
  - Show/configure network interfaces

ping [-c count] host
  - Test network connectivity
  - ping -c 4 host Send 4 packets

netstat [options]
  - Show network statistics
  - netstat -an All connections
  - netstat -lt Listening TCP ports

ssh [options] user@host
  - Secure shell login

scp [-r] source destination
  - Secure copy
  - scp -r Recursive

ftp [host]
  - File transfer protocol

curl [options] URL
  - Data transfer utility
  - curl -O Download file
  - curl -X POST POST request

wget [options] URL
  - Web downloader
  - wget -r Recursive
  - wget -O filename Save as
```

## Documentation

```
man [section] command
  - Manual pages

info command
  - GNU Info documentation

help [command]
  - Shell help
```

---

# BASIC Interpreter

## Entering BASIC Mode

```
BASIC
```

Type this command to enter the BASIC mode. Exit with `SYSTEM` or `EXIT`.

## Control Flow

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

## Variables & Arrays

```
LET var = expression    - Assign variable
DIM array(size)         - Declare array
```

## Input/Output

```
PRINT expression        - Output to screen
INPUT var              - Read from user
INKEY$                 - Get keyboard input
```

## Memory Operations (PEEK/POKE)

```
PEEK(address)          - Read byte from memory address
POKE address, value    - Write byte to memory address
```

Memory space is 64KB (0-65535), emulating classic BASIC systems like Commodore 64 and Apple II.

### Examples:
```
POKE 1024, 65         - Write ASCII 65 ('A') to address 1024
X = PEEK(1024)        - Read value from address 1024 into variable X
```

## Math Functions

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

## String Functions

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

## Program Management

```
RUN                 - Execute loaded program
LIST                - Show program listing
NEW                 - Clear current program
SAVE filename       - Save program to storage
LOAD filename       - Load program from storage
END                 - Stop program execution
```

## Other BASIC Commands

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
RUN
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
RUN
```

### Memory Operations
```
10 PRINT "Testing POKE and PEEK"
20 POKE 1024, 65
30 X = PEEK(1024)
40 PRINT "Value at 1024: "; X
50 END
RUN
```

### Input and Calculation
```
10 PRINT "Enter two numbers:"
20 INPUT A
30 INPUT B
40 PRINT "Sum: "; A + B
50 PRINT "Product: "; A * B
60 PRINT "Difference: "; A - B
70 END
RUN
```

### Loop and Conditions
```
10 FOR N = 1 TO 5
20 IF N MOD 2 = 0 THEN PRINT N; " is even"
30 IF N MOD 2 = 1 THEN PRINT N; " is odd"
40 NEXT N
50 END
RUN
```

---

# Customization Guide

## Changing Theme Colors

Click the **⚙️ Settings** button in the bottom-right corner:

1. **Text Color**: Choose the color of text output
2. **Background Color**: Choose the terminal background
3. **Prompt Color**: Choose the color of the command prompt
4. **Reset to Default**: Restore original green/black theme

Themes are automatically saved to your browser's localStorage.

## Modifying CSS

Edit `styles.css` to customize:
- **Font size**: Change `font-size: 14px`
- **Scanline intensity**: Adjust `rgba(0, 0, 0, 0.3)` opacity
- **Scanline animation speed**: Change `animation: scanline-move 8s`
- **Font family**: Change `font-family: 'Courier New', monospace`

## Color Themes

Preset color combinations you can use:

**Classic DOS (Amber)**
- Text: #FFAA00
- Background: #000000
- Prompt: #FFAA00

**Classic DOS (Green)**
- Text: #00AA00
- Background: #000000
- Prompt: #00AA00

**Monochrome**
- Text: #FFFFFF
- Background: #000000
- Prompt: #FFFFFF

**Retro Cyan**
- Text: #00FFFF
- Background: #000000
- Prompt: #00FFFF

---

# Architecture

- **index.html**: Main HTML structure and UI layout
- **styles.css**: CRT scanline effects and theming
- **terminal.js**: Core terminal shell with basic file operations
- **basic.js**: Complete BASIC interpreter with PEEK/POKE memory access
- **dos622.js**: MS-DOS 6.22 command emulator (60+ commands)
- **linux.js**: Linux/Unix command emulator (80+ commands)

---

# Browser Compatibility

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

# Technical Details

## Technologies Used
- Vanilla JavaScript (ES6+)
- CSS3 (Animations, Flexbox)
- HTML5

## Features
- Virtual file system in memory
- 64KB virtual memory for PEEK/POKE operations
- Command history with keyboard navigation
- Theme persistence using localStorage
- Smooth scroll animations
- CRT scanline animation
- Full copy/paste support
- Multi-OS command compatibility

---

# Future Enhancements

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
- [ ] Networking simulation
- [ ] Script recording and playback

---

# License

MIT License - Feel free to use and modify as needed.

---

# Feedback

For issues, suggestions, or contributions, please create an issue or pull request on GitHub.

---

**RetroTerminal** - A modern take on retro computing! 🖥️💚

Experience MS-DOS 6.22, Linux/Unix, and BASIC all in one vintage terminal!
