# Greasy-December

User Documentation

This app is a hardware management system, where users can create accounts and log in/out, create and join projects, and checkout/checkin two kinds of hardware assets. The frontend uses ReactJs and the backend uses a Python Flask framework. 

Creating an account:
to create an account, in the username field, enter your desired username. in the password field, enter your password. Select the create account button. Your account has now been created and added to the database.

Logging in:
to log into an existing account, enter the appropriate username and corresponding password into the username and password fields, then select the log in button to enter your account.

Creating a project:
to create a project, enter the project name and a description of the project into the corresponding fields under the project box. Select create project. Upon successful creation, the project will appear below and be added to the database.

Joining a project:
to join an existing project, enter the project id into the appropriate field in the project box. Upon joining, the project will be displayed in the projects section.

Checking out hardware:
to check out hardware for a specific project, enter the quantity you want to check out into the input box for either HW1 or HW2, depending on which you want to check out. Select the check out button to check out the selected hardware. If checkout is successful, the displayed availability should decrease by the number you checked out. If you attempt to check out more hardware than is available, only the amount available will be checked out.

Checking in hardware:
to check in hardware for a specific project, enter the quantity you want to check in into the input box for either HW1 or HW2, depending on which you want to check in. Select the check in button to check in the selected hardware. If checkin is successful, the displayed availability should increase by the number you checked in. You may not check in more hardware than you have currently checked out.
