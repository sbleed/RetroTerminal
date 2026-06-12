/**
 * Linux Command Emulator
 * Comprehensive Linux/Unix command set
 */

class LinuxEmulator {
    constructor(terminal) {
        this.terminal = terminal;
        this.processes = [];
        this.environment = {
            USER: 'retro',
            HOME: '/home/retro',
            SHELL: '/bin/bash',
            PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
            PWD: '/'
        };
    }

    // File System Commands
    cmdLs(args) {
        this.terminal.terminal.cmdLs(args);
    }

    cmdCd(args) {
        this.terminal.terminal.cmdCd(args);
    }

    cmdPwd(args) {
        this.terminal.print(this.terminal.terminal.currentDirectory || '/', 'command-output');
    }

    cmdMkdir(args) {
        if (args.length === 0) {
            this.terminal.printError('mkdir: missing operand');
            return;
        }
        this.terminal.terminal.cmdMkdir(args);
    }

    cmdRmdir(args) {
        if (args.length === 0) {
            this.terminal.printError('rmdir: missing operand');
            return;
        }
        this.terminal.terminal.cmdRmdir(args);
    }

    cmdRm(args) {
        if (args.length === 0) {
            this.terminal.printError('rm: missing operand');
            return;
        }
        this.terminal.terminal.cmdRm(args);
    }

    cmdTouch(args) {
        if (args.length === 0) {
            this.terminal.printError('touch: missing file operand');
            return;
        }
        this.terminal.terminal.cmdTouch(args);
    }

    cmdCat(args) {
        if (args.length === 0) {
            this.terminal.printError('cat: missing file operand');
            return;
        }
        this.terminal.terminal.cmdCat(args);
    }

    cmdCp(args) {
        if (args.length < 2) {
            this.terminal.printError('cp: missing file operand');
            return;
        }
        this.terminal.print(`${args[0]} -> ${args[1]}`, 'success-output');
    }

    cmdMv(args) {
        if (args.length < 2) {
            this.terminal.printError('mv: missing operand');
            return;
        }
        this.terminal.print(`${args[0]} renamed to ${args[1]}`, 'success-output');
    }

    cmdGrep(args) {
        if (args.length === 0) {
            this.terminal.printError('grep: missing pattern');
            return;
        }
        this.terminal.print(`Searching for: ${args[0]}`, 'command-output');
    }

    cmdFind(args) {
        if (args.length === 0) {
            this.terminal.printError('find: paths not specified');
            return;
        }
        this.terminal.print(`Searching in ${args[0]}...`, 'command-output');
    }

    cmdLocate(args) {
        if (args.length === 0) {
            this.terminal.printError('locate: no pattern specified');
            return;
        }
        this.terminal.print(`${args[0]}: not found`, 'command-output');
    }

    // File Content Commands
    cmdHead(args) {
        if (args.length === 0) {
            this.terminal.printError('head: missing file operand');
            return;
        }
        this.terminal.print(`First 10 lines of ${args[0]}`, 'command-output');
    }

    cmdTail(args) {
        if (args.length === 0) {
            this.terminal.printError('tail: missing file operand');
            return;
        }
        this.terminal.print(`Last 10 lines of ${args[0]}`, 'command-output');
    }

    cmdWc(args) {
        if (args.length === 0) {
            this.terminal.printError('wc: missing file operand');
            return;
        }
        this.terminal.print(`  100  250 1500 ${args[0]}`, 'command-output');
    }

    cmdFile(args) {
        if (args.length === 0) {
            this.terminal.printError('file: missing file operand');
            return;
        }
        this.terminal.print(`${args[0]}: ASCII text`, 'command-output');
    }

    cmdSort(args) {
        if (args.length === 0) {
            this.terminal.printError('sort: no such file or directory');
            return;
        }
        this.terminal.print(`Sorting ${args[0]}...`, 'command-output');
    }

    cmdUniq(args) {
        if (args.length === 0) {
            this.terminal.printError('uniq: missing operand');
            return;
        }
        this.terminal.print(`Unique lines in ${args[0]}`, 'command-output');
    }

    cmdDiff(args) {
        if (args.length < 2) {
            this.terminal.printError('diff: missing operand');
            return;
        }
        this.terminal.print(`Comparing ${args[0]} and ${args[1]}...`, 'command-output');
    }

    // User & Permission Commands
    cmdWhoami(args) {
        this.terminal.print('retro', 'command-output');
    }

    cmdId(args) {
        this.terminal.print('uid=1000(retro) gid=1000(retro) groups=1000(retro)', 'command-output');
    }

    cmdWho(args) {
        this.terminal.print('retro     tty1         2026-06-12 10:30', 'command-output');
    }

    cmdW(args) {
        this.terminal.print(' 10:35:42 up 2:30, 1 user, load average: 0.12, 0.15, 0.10', 'command-output');
        this.terminal.print('USER     TTY  FROM             LOGIN@  IDLE JCPU PCPU WHAT', 'command-output');
        this.terminal.print('retro    tty1                10:30   2:30 0.05s 0.02s -bash', 'command-output');
    }

    cmdSudo(args) {
        if (args.length === 0) {
            this.terminal.printError('sudo: missing command');
            return;
        }
        this.terminal.print(`[sudo] password for retro:`, 'command-output');
    }

    cmdChmod(args) {
        if (args.length < 2) {
            this.terminal.printError('chmod: missing operand');
            return;
        }
        this.terminal.print(`${args[1]} permissions changed`, 'success-output');
    }

    cmdChown(args) {
        if (args.length < 2) {
            this.terminal.printError('chown: missing operand');
            return;
        }
        this.terminal.print(`${args[1]} ownership changed to ${args[0]}`, 'success-output');
    }

    cmdChgrp(args) {
        if (args.length < 2) {
            this.terminal.printError('chgrp: missing operand');
            return;
        }
        this.terminal.print(`${args[1]} group changed to ${args[0]}`, 'success-output');
    }

    // Process Commands
    cmdPs(args) {
        this.terminal.print('PID   TTY  STAT TIME COMMAND', 'command-output');
        this.terminal.print('1234  pts/0 S   0:00 bash', 'command-output');
        this.terminal.print('5678  pts/0 R   0:01 node terminal.js', 'command-output');
    }

    cmdTop(args) {
        this.terminal.print('top - 10:35:42 up 2:30, 1 user, load average: 0.12, 0.15, 0.10', 'command-output');
        this.terminal.print('Tasks: 42 total, 1 running, 41 sleeping', 'command-output');
    }

    cmdKill(args) {
        if (args.length === 0) {
            this.terminal.printError('kill: missing operand');
            return;
        }
        this.terminal.print(`Process ${args[0]} terminated`, 'success-output');
    }

    cmdBg(args) {
        this.terminal.print('[1]+ Running...', 'command-output');
    }

    cmdFg(args) {
        this.terminal.print('[1]+ Foreground...', 'command-output');
    }

    cmdJobs(args) {
        this.terminal.print('[1]- Running  command1', 'command-output');
        this.terminal.print('[2]+ Running  command2', 'command-output');
    }

    cmdNice(args) {
        if (args.length === 0) {
            this.terminal.printError('nice: missing command');
            return;
        }
        this.terminal.print(`Running ${args[0]} with low priority...`, 'command-output');
    }

    // System Information
    cmdUname(args) {
        if (args.includes('-a')) {
            this.terminal.print('Linux retroterminal 5.10.0 #1 SMP x86_64 GNU/Linux', 'command-output');
        } else {
            this.terminal.print('Linux', 'command-output');
        }
    }

    cmdHostname(args) {
        this.terminal.print('retroterminal', 'command-output');
    }

    cmdUptime(args) {
        this.terminal.print(' 10:35:42 up 2:30, 1 user, load average: 0.12, 0.15, 0.10', 'command-output');
    }

    cmdDf(args) {
        this.terminal.print('Filesystem     1K-blocks    Used Available Use% Mounted on', 'command-output');
        this.terminal.print('/dev/sda1       10485760 2097152  8388608  20% /', 'command-output');
        this.terminal.print('/dev/sda2        5242880  524288  4718592  10% /home', 'command-output');
    }

    cmdDu(args) {
        if (args.length === 0) {
            this.terminal.print('Total: 2500 MB', 'command-output');
            return;
        }
        this.terminal.print(`${args[0]}: 500 MB`, 'command-output');
    }

    cmdFree(args) {
        this.terminal.print('              total     used     free   shared  buffers   cached', 'command-output');
        this.terminal.print('Mem:       8388608 4194304 4194304        0   524288  1048576', 'command-output');
        this.terminal.print('-/+ buffers/cache:    2621440 5767168', 'command-output');
        this.terminal.print('Swap:      2097152        0 2097152', 'command-output');
    }

    // Package Management
    cmdApt(args) {
        if (args.length === 0) {
            this.terminal.print('apt update/install/remove/upgrade', 'command-output');
            return;
        }
        this.terminal.print(`apt: executing ${args[0]}...`, 'command-output');
    }

    cmdYum(args) {
        if (args.length === 0) {
            this.terminal.print('yum update/install/remove', 'command-output');
            return;
        }
        this.terminal.print(`yum: executing ${args[0]}...`, 'command-output');
    }

    // Text Processing
    cmdEcho(args) {
        this.terminal.print(args.join(' '), 'command-output');
    }

    cmdPrintf(args) {
        if (args.length === 0) {
            this.terminal.printError('printf: missing format');
            return;
        }
        this.terminal.print(args[0], 'command-output');
    }

    cmdSed(args) {
        if (args.length === 0) {
            this.terminal.printError('sed: missing pattern');
            return;
        }
        this.terminal.print(`Stream editing with: ${args[0]}`, 'command-output');
    }

    cmdAwk(args) {
        if (args.length === 0) {
            this.terminal.printError('awk: missing pattern');
            return;
        }
        this.terminal.print(`Pattern: ${args[0]}`, 'command-output');
    }

    cmdCut(args) {
        if (args.length === 0) {
            this.terminal.printError('cut: missing operand');
            return;
        }
        this.terminal.print(`Cutting columns...`, 'command-output');
    }

    cmdPaste(args) {
        if (args.length < 2) {
            this.terminal.printError('paste: missing file operand');
            return;
        }
        this.terminal.print(`Pasting ${args[0]} and ${args[1]}...`, 'command-output');
    }

    cmdTr(args) {
        if (args.length === 0) {
            this.terminal.printError('tr: missing operand');
            return;
        }
        this.terminal.print(`Translating characters...`, 'command-output');
    }

    // Archive Commands
    cmdTar(args) {
        if (args.length === 0) {
            this.terminal.printError('tar: missing file operand');
            return;
        }
        this.terminal.print(`Processing archive ${args[0]}...`, 'command-output');
    }

    cmdZip(args) {
        if (args.length === 0) {
            this.terminal.printError('zip: no archive operand');
            return;
        }
        this.terminal.print(`Creating archive ${args[0]}...`, 'command-output');
    }

    cmdUnzip(args) {
        if (args.length === 0) {
            this.terminal.printError('unzip: no archive operand');
            return;
        }
        this.terminal.print(`Extracting ${args[0]}...`, 'command-output');
    }

    cmdGzip(args) {
        if (args.length === 0) {
            this.terminal.printError('gzip: missing file operand');
            return;
        }
        this.terminal.print(`Compressing ${args[0]}...`, 'command-output');
    }

    cmdGunzip(args) {
        if (args.length === 0) {
            this.terminal.printError('gunzip: missing file operand');
            return;
        }
        this.terminal.print(`Decompressing ${args[0]}...`, 'command-output');
    }

    // Network Commands
    cmdIfconfig(args) {
        this.terminal.print('eth0: flags=UP,BROADCAST,RUNNING', 'command-output');
        this.terminal.print('      inet addr:192.168.1.100  Bcast:192.168.1.255  Mask:255.255.255.0', 'command-output');
    }

    cmdPing(args) {
        if (args.length === 0) {
            this.terminal.printError('ping: missing host');
            return;
        }
        this.terminal.print(`PING ${args[0]} (127.0.0.1) 56(84) bytes of data.`, 'command-output');
        this.terminal.print('64 bytes from ${args[0]}: icmp_seq=1 ttl=64 time=0.123 ms', 'command-output');
    }

    cmdNetstat(args) {
        this.terminal.print('Active Internet connections (w/o servers)', 'command-output');
        this.terminal.print('Proto Recv-Q Send-Q Local Address Foreign Address State', 'command-output');
    }

    cmdSsh(args) {
        if (args.length === 0) {
            this.terminal.printError('ssh: missing hostname');
            return;
        }
        this.terminal.print(`Connecting to ${args[0]}...`, 'command-output');
    }

    cmdScp(args) {
        if (args.length < 2) {
            this.terminal.printError('scp: missing file operand');
            return;
        }
        this.terminal.print(`Copying ${args[0]} to ${args[1]}...`, 'command-output');
    }

    cmdFtp(args) {
        if (args.length === 0) {
            this.terminal.printError('ftp: missing hostname');
            return;
        }
        this.terminal.print(`Connecting to ${args[0]}...`, 'command-output');
    }

    cmdCurl(args) {
        if (args.length === 0) {
            this.terminal.printError('curl: no URL specified');
            return;
        }
        this.terminal.print(`Fetching ${args[0]}...`, 'command-output');
    }

    cmdWget(args) {
        if (args.length === 0) {
            this.terminal.printError('wget: missing URL');
            return;
        }
        this.terminal.print(`Downloading ${args[0]}...`, 'command-output');
    }

    // Miscellaneous
    cmdMan(args) {
        if (args.length === 0) {
            this.terminal.printError('man: no page specified');
            return;
        }
        this.terminal.print(`${args[0]}(1)  - Manual page for ${args[0]}`, 'command-output');
    }

    cmdInfo(args) {
        if (args.length === 0) {
            this.terminal.print('GNU Info for Unix/Linux commands', 'command-output');
            return;
        }
        this.terminal.print(`Info on ${args[0]}...`, 'command-output');
    }

    cmdHelp(args) {
        const help = `
LINUX/UNIX COMMANDS:

File Operations:
  ls, cd, pwd, mkdir, rmdir, rm, touch, cat, cp, mv, grep

File Properties:
  file, wc, head, tail, sort, uniq, diff

User & Permissions:
  whoami, id, who, w, sudo, chmod, chown, chgrp

Process Management:
  ps, top, kill, bg, fg, jobs, nice

System Info:
  uname, hostname, uptime, df, du, free

Package Management:
  apt, yum

Text Processing:
  echo, printf, sed, awk, cut, paste, tr

Archives:
  tar, zip, unzip, gzip, gunzip

Networking:
  ifconfig, ping, netstat, ssh, scp, ftp, curl, wget

Help:
  man, info, help

For more help: man <command>
`;
        this.terminal.print(help, 'command-output');
    }
}

module.exports = LinuxEmulator;