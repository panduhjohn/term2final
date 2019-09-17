/**
                        ***** Terminal Commands *****
    ls - list of files (*|?|-l|-h|-S|-t|r)
    cd - change directory
    pwd - print working directory
    cd .. - move to the parent directory
    cd ~ - move to home directory
    cd - - move to previous directory
    . - means current directory
    ctrl+r - search for previous command
    mkdir - make directory
    whatis - describe a command
    sudo - super user do
    cat - concatenate and print file (-s|-n)
    cat filea.txt fileb.txt > filec.txt - create file with content of filea and fileb
    cat filea.txt fileb.txt >> filec.txt - append content of filea and fileb to filec
    sed - stream editor
        's/cat/dog/' - (s- substitute) scan incoming text and replace every instance of the string “cat” with “dog”
    less - show content of file to the bounds of screen (-N|-M|+|/|?)
    head - prints the start of file
    tail - prints the end of file (-f -follow)
    wc - word, line, character, and byte count
    | - pipe the commands
    find somewhere -iname somefile.txt (-i -case-insensetive)
    find . -iname "*.txt" -exec cat {} \; > output
    grep - Globally search a Regular Expression and Print the results (-n|-l|-c|-v not contain)
    grep -ri --color "posts" *
    cp - copy (-R copy directory)
    mv - move or rename
    rm - delete (-rf to remove directory)
    which - location of file
    file - describe file
    tee - combines > and |
    ls -S | tee step1.txt | head -n 5 | tee step2.txt | cat -n | tee step3.txt
    grep -v "Eggs" shopping.txt | (sleep 0.1; tee shopping.txt)
    dirname
    sort filed.txt | uniq (-с|-u|-i)
    sort file1 file2 | uniq
    script - start logging (exit -end logging | less typescript - show log)
    echo "You will be iOS Developer" > 2018.txt
    mkfifo fifo_pipe
        tail -f fifo_pipe
            echo "Hello from the other side" >> fifo_pipe
    history | grep "command"
    # - comment a command
    sudo !! - repeat the command
    time - measure how long a program takes to run
    > file.txt - clear a file quickly
    sleep - delay execution
    sudo -K - clear the cash
    find . -type f -mtime 0 - finds all files modified in the last 24 hours
    ^filf^file - to correct a typo
    sudo apt-get install openssh-server - install OpenSSH server
    ssh remoteusername@yoursite.com - connect to SSH
    scp data.zip you@yoursite.com:/home/twostraws/Documents  - upload file to the remote directory
    sftp you@yoursite.com - create FTP-like transfer pipe (than use: put data.zip and get data.zip)

    grep -o "buy.html?type=\d" server.log | sort | uniq -c
 */