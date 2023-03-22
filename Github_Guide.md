**To track a remote branch with a local branch:**

1. create and enter a new branch with the same name as the remote branch.

Ex. If I have a remote branch named origin/feature/hello

I will create a local branch and enter it with **git checkout -b feature/hello**

2. Track the remote branch with the local branch by using **git push --set-upstream origin feature/[your branch]

Ex. Using the same remote branch as earlier, I will **git push --set-upstream origin feature/hello**