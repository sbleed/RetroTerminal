/**
 * MS-DOS 6.22 Command Emulator
 * Complete DOS command set with file system integration
 */

class DOSEmulator {
    constructor(terminal) {
        this.terminal = terminal;
        this.dosVersion = '6.22';
    }

    cmdAssoc(args) {
        this.terminal.print('.COM=MS-DOS Application', 'command-output');
        this.terminal.print('.BAT=Batch File', 'command-output');
        this.terminal.print('.EXE=Executable', 'command-output');
        this.terminal.print('.BAS=BASIC Program', 'command-output');
    }

    cmdAttrib(args) {
        if (args.length === 0) {
            this.terminal.printError('ATTRIB [+R | -R] [+A | -A] [+S | -S] [+H | -H] [[drive:][path]filename]');
            return;
        }
        this.terminal.print(`${args[0]}         A    06-12-26  10:30a`, 'command-output');
    }

    cmdBreak(args) {
        this.terminal.print('BREAK is off', 'command-output');
    }

    cmdChcp(args) {
        if (args.length === 0) {
            this.terminal.print('Active code page: 437', 'command-output');
            return;
        }
        this.terminal.print(`Code page ${args[0]} has been selected`, 'command-output');
    }

    cmdChdir(args) {
        this.terminal.terminal.cmdCd(args);
    }

    cmdChkdsk(args) {
        this.terminal.print(`\nVolume RETRODISK created 06-12-26 10:30a\nDirectory for C:\\`, 'command-output');
        this.terminal.print('\n   .            <DIR>  06-12-26  10:30a', 'command-output');
        this.terminal.print('   ..           <DIR>  06-12-26  10:30a', 'command-output');
        this.terminal.print('readme   txt        512  06-12-26  10:30a', 'command-output');
        this.terminal.print('\n        1 file(s)       512 bytes', 'command-output');
        this.terminal.print('        2 dir(s)   5242880 bytes free', 'command-output');
    }

    cmdCls(args) {
        this.terminal.terminal.cmdClear();
    }

    cmdCopy(args) {
        if (args.length < 2) {
            this.terminal.printError('Syntax: COPY [/Y | /-Y] source [destination]');
            return;
        }
        this.terminal.print(`        1 file(s) copied`, 'success-output');
    }

    cmdCtty(args) {
        if (args.length === 0) {
            this.terminal.printError('CTTY device');
            return;
        }
        this.terminal.print(`All input/output will now use ${args[0]} device.`, 'command-output');
    }

    cmdDate(args) {
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-US');
        this.terminal.print(`Current date is ${dateStr}`, 'command-output');
        this.terminal.print('Enter new date (mm-dd-yy): ', 'command-output');
    }

    cmdDel(args) {
        if (args.length === 0) {
            this.terminal.printError('DEL [drive:][path]filename [/P]');
            return;
        }
        this.terminal.print(`File deleted: ${args[0]}`, 'success-output');
    }

    cmdDir(args) {
        this.terminal.terminal.cmdDir(args);
    }

    cmdDiskcomp(args) {
        this.terminal.print('Insert SOURCE diskette in drive A:', 'command-output');
        this.terminal.print('Press any key when ready . . .', 'command-output');
    }

    cmdDiskcopy(args) {
        this.terminal.print('DISKCOPY source destination /1 /V', 'command-output');
    }

    cmdEcho(args) {
        this.terminal.print(args.join(' '), 'command-output');
    }

    cmdEdit(args) {
        if (args.length === 0) {
            this.terminal.printError('EDIT [filename]');
            return;
        }
        this.terminal.print(`Opening ${args[0]} in MS-DOS Editor...`, 'command-output');
    }

    cmdErase(args) {
        if (args.length === 0) {
            this.terminal.printError('ERASE filename');
            return;
        }
        this.terminal.print(`${args[0]} erased.`, 'success-output');
    }

    cmdExpand(args) {
        if (args.length === 0) {
            this.terminal.printError('EXPAND source.Z destination');
            return;
        }
        this.terminal.print(`Expanding ${args[0]}...`, 'command-output');
    }

    cmdExtract(args) {
        if (args.length === 0) {
            this.terminal.printError('EXTRACT cabinet [/E /Y /L destination]');
            return;
        }
        this.terminal.print(`Extracting files from ${args[0]}...`, 'command-output');
    }

    cmdFastopen(args) {
        this.terminal.print('FASTOPEN installed', 'success-output');
    }

    cmdFc(args) {
        if (args.length < 2) {
            this.terminal.printError('FC [/A] [/C] [/L] [/LBn] [/N] [/T] [/W] [/nnnn] file1 file2');
            return;
        }
        this.terminal.print(`Comparing files ${args[0]} and ${args[1]}...`, 'command-output');
    }

    cmdFind(args) {
        if (args.length === 0) {
            this.terminal.printError('FIND [/V] [/C] [/N] [/I] "string" [[drive:][path]filename...]');
            return;
        }
        this.terminal.print(`Searching for "${args[0]}"...`, 'command-output');
    }

    cmdFormat(args) {
        if (args.length === 0) {
            this.terminal.printError('FORMAT drive: [/S] [/U] [/Q]');
            return;
        }
        this.terminal.print(`WARNING! All data on drive ${args[0]} will be erased.`, 'warning-output');
        this.terminal.print('Proceed with FORMAT (Y/N)? ', 'command-output');
    }

    cmdGoto(args) {
        if (args.length === 0) {
            this.terminal.printError('GOTO label');
            return;
        }
        this.terminal.print(`Jumping to ${args[0]}...`, 'command-output');
    }

    cmdGraphics(args) {
        this.terminal.print('Graphics mode initialized', 'success-output');
    }

    cmdHelpDos(args) {
        const help = `
MS-DOS 6.22 COMMANDS:

File Management:
  COPY source dest    - Copy files
  DEL/ERASE filename  - Delete file
  DIR [path]          - List directory
  TYPE filename       - Display file
  ATTRIB [+R] file    - Change attributes
  XCOPY src dst       - Copy directory tree
  MOVE source dest    - Move/rename file

Directory:
  CD [path]           - Change directory
  CHDIR               - Change directory
  MKDIR/MD            - Make directory
  RMDIR/RD            - Remove directory
  TREE [drive]        - Show directory tree

System:
  VER                 - Show version
  TIME                - Show time
  DATE                - Show date
  ECHO text           - Echo text
  CLS                 - Clear screen
  PROMPT $P$G         - Set prompt

Disk:
  CHKDSK [drive]      - Check disk
  DEFRAG [drive]      - Defragment
  FDISK [drive]       - Partition disk
  FORMAT drive:       - Format drive

Utilities:
  EDIT [file]         - Text editor
  FIND "text" file    - Search text
  SORT                - Sort text
  MODE                - Set display mode

Batch:
  GOTO label          - Jump to label
  IF condition cmd    - Conditional

For more: TYPE MANUAL.TXT
`;
        this.terminal.print(help, 'command-output');
    }

    cmdKeyb(args) {
        const layout = args[0] || 'us';
        this.terminal.print(`Keyboard layout: ${layout}`, 'command-output');
    }

    cmdLabel(args) {
        const label = args[0] || 'RETRODISK';
        this.terminal.print(`Volume label: ${label}`, 'command-output');
    }

    cmdLoadfix(args) {
        if (args.length === 0) {
            this.terminal.printError('LOADFIX [drive:][path]filename [parameters]');
            return;
        }
        this.terminal.print(`Loading ${args[0]}...`, 'command-output');
    }

    cmdMem(args) {
        this.terminal.print(`\nConventional Memory  : 640 KB`, 'command-output');
        this.terminal.print(`Upper Memory         : 0 KB`, 'command-output');
        this.terminal.print(`Extended Memory (XMS): 15360 KB`, 'command-output');
        this.terminal.print(`Expanded Memory (EMS): 0 KB`, 'command-output');
        this.terminal.print(`Total                : 16384 KB`, 'command-output');
    }

    cmdMode(args) {
        if (args.length === 0) {
            this.terminal.print('CO80 mode active (80 columns)', 'command-output');
            return;
        }
        this.terminal.print(`Mode set to: ${args[0]}`, 'success-output');
    }

    cmdMore(args) {
        if (args.length === 0) {
            this.terminal.printError('TYPE filename | MORE');
            return;
        }
        this.terminal.print('-- More --', 'command-output');
    }

    cmdPath(args) {
        if (args.length === 0) {
            this.terminal.print('PATH=C:\\;C:\\DOS;C:\\UTILS', 'command-output');
            return;
        }
        this.terminal.print(`PATH set to: ${args.join(';')}`, 'success-output');
    }

    cmdPause(args) {
        this.terminal.print('Press any key to continue...', 'command-output');
    }

    cmdPrintDos(args) {
        if (args.length === 0) {
            this.terminal.printError('PRINT [/D:device] filename');
            return;
        }
        this.terminal.print(`Printing ${args[0]}...`, 'success-output');
    }

    cmdPrompt(args) {
        const prompt = args.length > 0 ? args[0] : '$P$G';
        this.terminal.print(`Prompt set to: ${prompt}`, 'success-output');
    }

    cmdQbasic(args) {
        this.terminal.print('Microsoft QuickBASIC 4.5', 'command-output');
        this.terminal.print('Loading IDE...', 'command-output');
    }

    cmdRem(args) {
        // Comment - do nothing
    }

    cmdRen(args) {
        if (args.length < 2) {
            this.terminal.printError('REN [drive:][path]oldname newname');
            return;
        }
        this.terminal.print(`${args[0]} renamed to ${args[1]}`, 'success-output');
    }

    cmdReplace(args) {
        if (args.length < 2) {
            this.terminal.printError('REPLACE source [dest] [/A] [/P] [/R] [/W]');
            return;
        }
        this.terminal.print(`Replacing files...`, 'command-output');
    }

    cmdSetver(args) {
        this.terminal.print(`DOS Version: 6.22`, 'command-output');
    }

    cmdSet(args) {
        if (args.length === 0) {
            this.terminal.print(`COMSPEC=C:\\COMMAND.COM`, 'command-output');
            this.terminal.print(`PATH=C:\\DOS`, 'command-output');
            this.terminal.print(`PROMPT=$P$G`, 'command-output');
            return;
        }
        this.terminal.print(`${args.join('=')}`, 'success-output');
    }

    cmdShare(args) {
        this.terminal.print('File sharing enabled', 'success-output');
    }

    cmdShift(args) {
        this.terminal.print('Command line arguments shifted', 'command-output');
    }

    cmdSort(args) {
        this.terminal.print('Sorting input...', 'command-output');
    }

    cmdSys(args) {
        if (args.length === 0) {
            this.terminal.printError('SYS drive:');
            return;
        }
        this.terminal.print(`System files transferred to ${args[0]}`, 'success-output');
    }

    cmdTime(args) {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour12: true });
        this.terminal.print(`Current time is ${timeStr}`, 'command-output');
    }

    cmdTree(args) {
        const drive = args[0] || 'C:';
        this.terminal.print(`${drive}`, 'command-output');
        this.terminal.print('│', 'command-output');
        this.terminal.print('├───DOS', 'command-output');
        this.terminal.print('├───UTILS', 'command-output');
        this.terminal.print('└───PROGRAMS', 'command-output');
    }

    cmdType(args) {
        if (args.length === 0) {
            this.terminal.printError('TYPE [drive:][path]filename');
            return;
        }
        this.terminal.terminal.cmdType(args);
    }

    cmdVer(args) {
        this.terminal.print(`MS-DOS Version 6.22`, 'command-output');
    }

    cmdVol(args) {
        this.terminal.print(`Volume in drive C is RETRODISK`, 'command-output');
        this.terminal.print(`Volume Serial Number is 1234-5678`, 'command-output');
    }

    cmdXcopy(args) {
        if (args.length < 2) {
            this.terminal.printError('XCOPY source dest [/S] [/E] [/V] [/R] [/P] [/D] [/Y]');
            return;
        }
        this.terminal.print(`Copying ${args[0]} to ${args[1]}...`, 'command-output');
    }

    cmdCall(args) {
        if (args.length === 0) {
            this.terminal.printError('CALL [drive:][path]filename [batch-parameters]');
            return;
        }
        this.terminal.print(`Calling ${args[0]}...`, 'command-output');
    }

    cmdDeviceHigh(args) {
        if (args.length === 0) {
            this.terminal.printError('DEVICEHIGH=[drive:][path]filename [device parameters]');
            return;
        }
        this.terminal.print(`${args[0]} loaded in Upper Memory`, 'success-output');
    }

    cmdLh(args) {
        if (args.length === 0) {
            this.terminal.printError('LH [/L:region1,minsize] [/S] [/U] command [parameters]');
            return;
        }
        this.terminal.print(`${args[0]} loaded high`, 'success-output');
    }

    cmdLoadhigh(args) {
        this.cmdLh(args);
    }
}

module.exports = DOSEmulator;