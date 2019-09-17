/**
 * ######## Reading file contents ########
 * 1. mkdir terminal
 * 2. cd terminal
 * 3. touch filea.txt
 * 4. vim filea.txt
 *      "In my experience,
 *      "
 * 5. touch fileb.txt
 * 6. vim fileb.txt
 *      "there is no such thing as luck.
 *      "
 * 7. cat filea.txt
 * 8. cat fileb.txt
 * 9. cat filea.txt fileb.txt
 * 10. cat filea.txt fileb.txt > filec.txt
 * 11. cat filec.txt
 * 12. cat filea.txt fileb.txt > filec.txt (it will overwrite filec.txt)
 * 13. cat filea.txt fileb.txt >> filec.txt (it will append to filec.txt)
 * 14. cat filec.txt 
 * 15. cat -n filec.txt
 * Warning: Redirecting a file back to itself is a bad idea unless you’re very careful. For example, if you ran cat filea.txt > filea.txt you would end up with a completely blank file. This is because your terminal prepares the redirect before anything else happens, which means the first thing it does is clear filea.txt. So, by the time the cat filea.txt part executes, the file is already empty.
 * 
 * ######## Paging through output ########
 * 1. add article from wikipedia to filec.txt ( )
 * 2. less filec.txt
 * 3. use 'q' to exit
 * 4. less -N filec.txt
 * 5. less -M filec.txt
 * 6. less -NM filec.txt
 * 7. /the
 * 8. less +/the filec.txt
 * 
 * ######## Printing parts of files: head and tail ########
 * 1. head filec.txt
 * 2. tail filec.txt
 * 3. head -n 3 filec.txt
 * 
 * ######## Counting lines and words ########
 * 1. wc filec.txt
 * 2. wc -w filec.txt
 * 
 * ######## Listing files intelligently ########
 * 1. ls D*
 * 2. ls *.md
 * 3. ls *.txt *.xml
 * 4. ls f*a*
 * 5. ls *.{txt,xml,md} == ls *.txt *.xml *.md
 * 6. ls file?.txt
 * These wildcards become much more valuable when you realize they are a feature of the terminal, not of ls.
 * 
 * ######## Options for listing ########
 * 1. ls -a
 * 2. ls -1
 * 3. ls -l
 * 4. ls -lh
 * -rw-r--r--@ are the permissions for this file.
 * 1 means the number of hard links pointing to this file.
 * YuryShkoda is the user owner of the file.
 * staff is the group owner of the file.
 * 39 is the size of the file.
 * 23 May 18:43 is the last modified time of the file.
 * filec.txt is the file name being listed.
 * 
 * Let’s break down one of the permission lines: -rw-r--r--@. The first - means it’s a file rather than a directory (directories have d there), rw- means I can read and write the file but not execute it, r-- means people in my user group can read it but not write or execute it, the second r-- means people outside my user group can read it but not write or execute it, and @ means it has macOS extended attributes. macOS lets programs save attributes about files separately from the file itself, so a text editor might save the position you were at last time you opened a file, or Finder might attach labels.
 * 5. ls -lhS
 * 6. ls -lht
 * 7. ls -lhrt
 * 
 * ######## Piping one command into another ########
 * "|" - pipe symbol. It takes the output from one program and redirects it to another.
 * 1. ls -lS | head -n 3
 * 2. ls | wc -1
 * 
 * ######## Finding files based on search criteria ########
 * find somewhere -iname somefile.txt
 * 1. find . -iname filea.txt
 * 2. find . -iname *.txt - wildcard expansion is performed by your terminal
 * 3. find . -iname "*.txt" - wildcard expansion is performed by "find"
 * 4. find . -size 10k
 * 5. find . -size +1k
 * 6. find . -size -1k
 * 7. find . -size +1G
 * 8. find . -name "*.zip" -size +1G
 * 9. find ~/ -size +100M | wc -l
 * 
 * ######## Executing output ########
 *  -exec starts the command to execute on each file.
 * {} (an open brace then a close brace) is replaced by the name of the matching file.
 * \; (a backslash them a semi-colon) ends the command to execute.
 * 1. find . -iname "*.txt" -exec cat {} \;
 * 2. find . -iname "*.txt" -exec cat {} \; > output
 * create a combined file that contains all the other text files combined
 * 
 * Important: If you use this technique, make sure you don’t redirect to a file that matches the search criteria, otherwise you’ll get into a recursive loop until you run out of disk space!
 * 3. find . -iname "*.txt" -ok cat {} \; > output
 * Ask you whether the command should be executed for each matching file
 * 
 * ######## Searching for text with grep ########
 * "Globally search a Regular Expression and Print the results."
 * 1. grep "luck" *
 * 2. grep --color "luck" *
 * 3. grep -ri --color "luck" *
 * r- recursively
 * i- case insensitive
 * n- line number
 * l- only the name of matching file
 * c- the name of each file that was searched along with the number of matches in each file
 * 4. grep -v "luck" *
 * v- inverts your search, which means this command will return all lines that don’t contain the text "luck"
 * 5. grep "luck" * | grep -v "test" | wc -l
 * 
 * ######## Copying, moving, and deleting files ########
 * 1. cp filec.txt filed.txt
 * 2. mv filed.txt filez.txt
 * 3. cp -R somedirectory nameofcopy
 * 4. rm filez.txt
 * 5. rm -rf somedirectory
 * 
 * ######## Reading file information ########
 * 1. which ls
 * That will print out “/bin/ls”, telling you where the ls command is. This is useful because commands are frequently in various places around the filesystem depending on what they do. For example, commands stored in “/bin” are those critical to the running of the system, commands stored in “/usr/bin” are non-critical, and commands stored in “/usr/local/bin” are those installed by the user and not the system. In practice all three are searched for commands you run, so using which can tell you exactly what will run.
 * 2. file filea.txt 
 * 3. file img.png
 * 4. mv img.png img
 * 5. file img
 * 
 * ######## Combining commands ########
 * There’s a command called tee that effectively combines > and | into one. It’s called tee because it works like a T-junction: you come in on one path, but there’s a turn to the left and a turn to the right. The magic of tee is that it allows you to take both turns: it writes your output to a file (like >) and also sends it to output so it can be piped somewhere else.
 * 1. ls -S | tee step1.txt | head -n 5 | tee step2.txt | cat -n | tee step3.txt
 * 1.1 ls -S: print the list of files in the current directory, largest first.
 * 1.2 tee step1.txt: save the output to step1.txt but also print it to the screen.
 * 1.3 head -n 5: take the top five items in the listing
 * 1.4 tee step2.txt: save the output to step2.txt but also print it to the screen.
 * 1.5 cat -n: add numbers to each line
 * 1.6 tee step3.txt: save the output to step3.txt but also print it to the screen.
 * 
 * If you want to combine the two operations together – find the location of the ls command but print only its directory - then you would use backticks, like this:
 * 2. dirname `which ls`
 * Terminal will evaluate the command inside backticks first, and will get back “/bin/ls”. That output then gets placed into the original command.
 * 3. dirname $(which ls)
 * 4. ls $(dirname $(which ls)) | wc
 * 4.1 finds the location of ls
 * 4.2 pulls out only the directory information, 
 * 4.3 writes a list of all commands in the same directory as ls, then 
 * 4.4 counts each command.
 * 
 * ######## Sorting and de-duping ########
 * sort by default use general alphabetical sort
 * -n - numeric
 * -r - reversed
 * uniq - removes duplicate lines
 * 1. touch filed.txt
 * 2. give filed.txt content:
 * abc
 * abc
 * 123
 * abc
 * ABC
 * 123
 * 123
 * 456
 * 123
 * 3. uniq filed.txt
 * 4. sort filed.txt | uniq
 * 
 * uniq parameters:
 * -i - case insensitive
 * -c - how often each item appeared in the input
 * -u - prints only items that appear exactly once
 * 
 * 5. sort file1 file2 | uniq
 * When combined with uniq this means we can merge two files, sort them, then strip out duplicates, giving us the combined list of unique lines in each file.
 * 
 * ######## Terminal tips and tricks ########
 *    ##### Record your sessions #####
 * As good as your terminal history is, it only stores the commands you executed rather than their outputs. However, if you run the script command it will start up a terminal logger that will record everything you type as well as its output, meaning that you can create comprehensive logs for everything you do. To stop logging, run exit, then view your log using less typescript.
 * 1. script
 * 2. ls -l
 * 3. uname -a
 * 4. exit
 * 5. less typescript
 * 
 *    ##### Write text to file #####
 * 1. echo "Hello, world"
 * 2. echo "Hello, world" > filename.txt
 * 3. echo "This is a multiline string.
 * Oh yes it is.
 * And it's very nice" > multiline.txt
 * 
 *    ##### Fix a bad terminal #####
 * 1. reset
 * 
 *    ##### Search your history for a specific command #####
 * 1. history
 * 2. history | grep "sort"
 * 
 *    ##### Save that one for later #####
 * 1. #grep "luck" * | grep -v "test" | wc -1
 * 
 *    ##### Repeat a command with root previliges #####
 * 1. sudo !!
 * 
 *    ##### Time a program's execution #####
 * 1. time grep "luck" * | grep -v "test" | wc -l
 * 
 *    ##### Clear a file quickly #####
 * 1. > file.txt
 * 
 *    ##### Create delays in pipes #####
 * Unix command piping is actually quite complicated behind the scenes, and it’s easy to get into race conditions because your commands aren’t executed linearly from left to right. For example, a command like this one has a race condition that many people are blissfully unaware of:
 * 1. cat somefile.txt | tee somefile.txt
 * In practice, that command will work just fine maybe 90% of the time. The other 10% of the time, it will wipe the contents of somefile.txt, and output nothing. This is called a race condition: both cat and tee are racing to execute as fast as they can, and if tee begins execution first (which can happen) it will delete the contents of somefile.txt ready for its new input. Then, when cat runs, it will find no input to read, so nothing will happen.
 * 2. cat somefile.txt | (sleep 0.1; tee somefile.txt)
 * 
 *    ##### Clear the sudo cache #####
 * After running sudo and entering your password, it will be cached for a period of time so that you don't have to keep on entering it each time you want to run another command. This is helpful for most people, but it's also a security risk: anyone with access to your keyboard can use sudo to cause untold destruction to your system.
 * 1. sudo -K
 * 
 *    ##### Find files modified today #####
 * 1. find . -type f -mtime 0
 * 
 *    ##### Fix a typo quickly #####
 * 1. ls filf*
 * 2. ^filf^file
 * 
 *  ######## Challenges ########
 * 1. List the five most recently modified files.
 * 2. Count how many Markdown files are on your desktop or any subdirectory.
 * 3. Count how many files were modified on the 13th of May.
 * 4. Count how often the word “JavaScript” appears in any “.txt” file on your desktop.
 * 5. Go through every “.txt” file in the current directory, and print out lines that contain the word “test”, numbering the output.
 * 
 * Solutions:
 * 1. ls -t | head -n 5
 * 2. find . -iname "*.md" | wc -l
 * 3. ls -l | grep "13 May"
 * 4. grep "JavaScript" *.txt | wc -l
 * 5. grep "test" *.txt | cat -n
 */