/*
    ************************ Basic Git Commands ************************
-1. mkdir git
0. cd git
1. set up your username
    git config --global user.name "Yury Shkoda"
2. set up your email address
    git config --global user.email "shkoda.yuri@gmail.com"
3. ask Git to color its output
    git config --global color.ui true
4. create testGit folder
5. cd testGit
6. git init
7. ls -la
8. open .git
9. echo '<p>Hello, world!</p>' >> index.html
10. git status
11. git add index.html
    git add .
12. git status
    The temporary area - where changes are queued up in preparation to be executed is knowing as staging
13. git commit
    13.1 press "i" (insert)
    13.2 type "This is my initial commit"
    13.3 press "esc" to exit insert mode
    13.4 type ":wq" (write then quit) and press return
14. git status
15. change index.html to have following context '<p>Hello, world?</p>'
16. git status
17. git add .
18. change index.html to have following context '<p>Goodbye, cruel world!</p>'
19. git status
    Notice that index.html is listed under "Changes to be committed” and also under "Changes not staged for commit”. This happens because Git cares about content not about files. When you ran git add . Git immediately took a copy of index.html as it looked at that precise point in time – you could delete index.html entirely and Git could still commit the changes it has queued up with no problems.
20. git commit -am 'Change message to goodbye'
    -a option, which means "stage any changes to tracked files then commit them immediately"
    -m option, which lets you write a commit message
21. echo '<p>Some Websites</p>' >> credits.html 
22. git status
23. git branch
    * - means that's the branch you are currently working on 
24. git branch credits
    credits branch is initially identical to master
25. git branch
26. git checkout credits
    Switched to branch 'credits'
27. git branch
28. git status
29. git add .
30. git commit -m 'Added credits.html'
31. git status
32. git checkout master
    credits.html disappeared
33. git status
34. git branch credits
    credits.html reappeared
* 35. git checkout master
36. git merge credits
37. git checkout credits
38. edit credits.html to have this content:
    <h1>Credits</h1>
    <p>Some Websites</p>
39. git commit -am 'Adding important heading.'
40. git checkout master
41. git merge credits
    It used to be difficult and sometime even dangerous to do multiple merges from a branch before Git
42. Challenge:
    42.1 Modify credits branch so that credits.html has your name in there
    42.2 Create a new branch called "contact" based off the credits branch
    42.3 In the contact branch create new file "contact.html" that contains text "Under construction".
    42.4 Merge contact into credits.
    42.5 Merge credits into master.
    Tip: you can combine "git branch" and "git checkout" into single commande "git checkout -b somebranch".

        ********************** From "begginer" to "veteran" **********************
    =========== Adding and removing files ===========
    1. cd ..
    2. mkdir adding
    3. cd adding
    4. git init
    5. echo "Cheese
    Eggs
    Strawberries
    Apples" > shopping.txt
    6. git add shopping.txt
    7. git commit -m "Added initial shopping list"
    8. Challenge: remove Eggs from shopping list using terminal only(5 min)
    9. grep "Eggs" shopping.txt
    10. grep -v "Eggs" shopping.txt
    11. grep -v "Eggs" shopping.txt > shopping.txt
    12. cat shooping.txt
    !!!! one of the few Git commands that can destroy your work !!!!
    13. git reset --hard
    14. grep -v "Eggs" shopping.txt | tee shopping.txt
        tee writes to disc without using redirect
    15. cat shopping.txt
        Piping in this way can cause race conditions, so it’s best to insert a tiny sleep call after the pipe to ensure things run in sequence.
    16. grep -v "Eggs" shopping.txt | (sleep 0.1; tee shopping.txt) 
    17. git status
    18. git add shopping.txt
    19. git status
    20. git reset shopping.txt
    21. git status
    22. git diff
    23. git diff shopping.txt
    24. git add .
    25. git diff
    26. git diff --staged
    27. git reset
        Git works with content rather than files!
    28. create new file called quotes.txt and give it this content:
    In my experience, there is no such thing as luck. – Obi-Wan Kenobi
    The needs of the many outweigh the needs of the few. – Spock
    Do, or do not. There is no try. – Yoda
    29. git add quotes.txt
    30. git commit -m 'Add quotes.txt to tracked files'
    31. Edit quotes.txt to have this content:
    Do what I do: hold tight and pretend it’s a plan! – The Doctor
    In my experience, there is no such thing as luck. – Obi-Wan Kenobi
    If we’re going to be damned, let’s be damned for what we really are. – Jean-Luc Picard
    The needs of the many outweigh the needs of the few. – Spock
    I swear by my pretty floral bonnet, I will end you. – Malcom Reynolds
    Do, or do not. There is no try. – Yoda
    32. git diff quotes.txt
    33. git add -p
        "patch add mode"
        "y” means "yes, stage this hunk”
        "n” means "no, don’t stage this hunk”
        "q” means "quit, don’t stage this hunk or any others following it”
        "a” means "stage this hunk and any others in the same file”
        "d” means "don’t stage this hunk or any others in the same file”
        "/" means "search for a hunk that matches a regex”
        "s” means "split up this hunk”
        "e” means "edit this hunk”
        "?” means "print help”
    34. press "s"
    35. press "y"
    36. press "n"
    37. press "d"
    38. press "a"
    39. git status
        we only staged part of quotes.txt
    40. git diff
    41. git diff --staged
    42. git commit -m 'Add one new quote and remove Eggs from shopping'
    43. git rm quotes.txt
    44. git rm -f quotes.txt
    45. git status
    46. git reset --hard
    47. git rm --cached quotes.txt
    48. git status
        "git rm -f" deletes a file from disk and from the repository, whereas "git rm --cached" removes a file from the repository but keeps it on disk
    49. git status -s
        M(odified)
        A(dded)
        D(eleted)
        R(enamed)
        C(opied)
        U(pdated but unmerged)
        ? to mean untracked

    =========== Commiting Changes ===========
    50. Example of good commit message:
        "Update shopping.txt to remove Eggs (up to 50 char)

        Management came back with a request to remove Eggs from the shopping.txt file because it was causing problems for vegan users."
    51. cd ..
    52. mkdir commiting
    53. cd commiting
    54. git init
    55. echo "Hello world" >> file.txt
    56. git add .
    57. git commit - 'Added shopping.txt'
    58. git commit --amend -m 'Added file.txt'
        If you want to add or change files, you can do that too – just stage them first.
    59. echo "Do or do not, there is no try - Yoda" >> quotes.txt
    60. git add quotes.txt
    61. git commit --amend -m 'Add file.txt and quotes.txt'

    =========== Working with the commit log ===========
    0. cd ..
    2. git clone https://github.com/BrainJS/brain.js
    3. cd brain.js
    4. git log
    5. git log -5
    6. git log --oneline
    7. git log --stat
    8. git log README.md
    9. git log --since=2.month
    10. git log --grep="Fix"
    11. git shortlog -10
    12. git shortlog -sn

    =========== Branching and merging ===========
    !!! What follows is a destructive command that will cause you to lose work. !!!
    You can use "git checkout yourfilename" to revert change back to the latest commit.
    1. cd ..
    2. mkdir branching
    3. cd branching
    4. git init
    5. echo "Testing 123" > test.txt
    6. git add .
    7. git commit -m 'Initial commit'
    8. git checkout -b testing
    9. echo "Blablabla" > test.txt
    10. git commit -am 'Changed test.txt'
    11. git checkout master
    12. git branch -d testing
        If you have merged the branch elsewhere this command will execute immediately and the branch will be gone, but if you have unmerged changes Git will refuse to comply because you’ll lose data.
    13. git branch -v
    14. git checkout testing
    14. git branch -m doomed_branch
    15. git checkout master
    16. git branch -D doomed_branch
    17. git checkout -b testing
    18. echo "Bla" > test.txt
    19. git commit -am 'Changed test.txt'
    20. git checkout master
    21. git merge testing
    22. git checkout -b risky
    23. echo "Fizz" > fizzbuzz.txt
    24. git add .
    25. git commit -m "Changed to Fizz"
    26. git checkout master
    27. echo "Buzz" > fizzbuzz.txt
    28. git add .
    29. git commit -m "Changed to Buzz"
    30. git merge risky
        Automatic merge failed; fix conflicts and then commit the result.
        Git doesn’t know which version is correct: Fizz or Buzz.
    31. cat fizzbuzz.txt
        <<<<<< HEAD
        Buzz
        =======
        Fizz
        >>>>>>> risky
    31. open fizzbuzz.txt
    32. leave "Fizz" only
    33. git add fizzbuzz.txt
    34. git commit -m "Fixed fizzbuzz.txt"
    35. git status
    36. git branch --merged
    37. git branch --no-nerged

    =========== Remotes ===========
    1. create new repository "testing" at GitHub
    2. cd ..
    3. mkdir remoteGit
    4. cd remoteGit
    5. echo "# testing" >> README.md
    6. git init 
    7. git add README.md
    8. git commit -m "first commit"
    9. git remote add origin https://github.com/YuryShkoda/testing.git
    10. git push -u origin master
    11. git remote -v
    12. !!! git remote remove origin - to remove origin
    13. use "git pull" to download changes from remote repository
    14. echo "Fizz" > fizzbuzz.txt
    15. git add .
    16. git commit -m "Added fizzbuz.txt"
    17. git push
    18. git branch -r
    19. git checkout -b newfeature
    20. echo "Testing" > test.txt
    21. git add .
    22. git commit -m "Writing to new feature branch."
    23. git push -u origin newfeature
        we use "git push origin newfeature" because we want to push the “newfeature” branch to the server, but also used "-u", which tells Git we want to set up tracking information at the same time. This means in the future we can just write “git push” or “git pull” from this branch and Git will know what to do.
    24. cd ~/Desktop
    25. mkdir testcopy
    26. cd testcopy
    27. git clone https://github.com/YuryShkoda/testing.git
    28. cd testing
    29. git branch
    30. git branch -a
    31. git checkout newfeature
    32. git branch -avv
    33. git push origin --delete newfeature
        will delete remote branch "newfeature"
    34. git branch -avv

        ************************ Tips and Techniques ************************
        Any file in your working directory will get noticed by Git, which means they’ll be staged when you run the git add . command. The problem is, some files really ought not to be tracked: log files that are constantly changing will clutter your commits, cache files that can be recreated will take up space, and you might have private files such as user credentials that you don’t want pushed externally.
    1. touch .gitignore
    2. open .gitignore
    3. edit content of .gitignore to be:
    server.log
    *.log
    !critical.log
    caches/
    # this is a comment
    4. The "git clean" command will look through your entire working directory for files that are not tracked, then delete them all. Because it’s destructive, git clean requires you to call it with "-f" for "force" mode, but as soon as that command is issued it will delete any and all untracked files it finds.
    */