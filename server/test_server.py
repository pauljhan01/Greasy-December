import server
import pytest_check as check

# checkpoint 2 backend test cases

#1. sign up as new user (userid/password)
def test_sign_up_user():
    username = 'A123'
    password = 'p456'
    x = server.createUser(username, password)
    assert check.is_equal(x, 'Success')

#2. sign in with correct userid/password
def test_log_in():
    username = 'A123'
    password = 'p456'
    x = server.login(username, password)
    assert check.is_equal(x, 'Success')

#3. sign in with wrong combination userid/password
def test_log_in_fail():
    username = 'A123'
    password = 'q789'
    x = server.login(username, password)
    assert check.is_equal(x, 'Fail')

#4. create new project (new project id)
def test_create_project():
    projectName = 'P123'
    projectDescription = 'test project'
    x = server.createProject(projectName, projectDescription)
    assert check.is_equal(x, 'Success')

#5. try creating a new project with existing project id
def test_create_existing_project():
    projectName = 'P123'
    projectDescription = 'test project'
    x = server.createProject(projectName, projectDescription)
    assert check.is_equal(x, 'Fail')

#6. join an existing project with project id
def test_join_existing_project():
    projectId = 1000
    x = server.projects_getByID(projectId)
    assert check.is_equal(x.get('Name'), 'P123')

#7. checkout hardware set 1
def test_checkout_set1():
    hwset = 1
    projectId = 1000
    quantity = 10
    x = server.HWSets_checkout(hwset, projectId, quantity)
    assert check.is_equal(x, 'Success')

#8. checkout hardware set 2
def test_checkout_set2():
    hwset = 2
    projectId = 1000
    quantity = 20
    x = server.HWSets_checkout(hwset, projectId, quantity)
    assert check.is_equal(x, 'Success')

#9. see if available quantities are reduced
def test_reduced_quantities():
    hwset = 1
    initialCap = 100
    x = server.HWSets_getOne(hwset)
    assert check.less(x[hwset][1], initialCap)

#10. try checkout out more than available
def test_checkout_more():
    hwset = 1
    projectId = 1000
    quantity = 110 
    x = server.HWSets_checkout(hwset, projectId, quantity)
    assert check.is_equal(x, 'Fail')

#11. check in hardware set 1 unit
def test_checkin_hw1():
    hwset = 1
    projectId = 1000
    quantity = 1
    x = server.HWSets_checkIn(hwset, projectId, quantity)
    assert check.is_equal(x, 'Success')

#12. see if available quanitties are increased
def test_increased_availability():
    hwset = 1
    prevAvailable = 90
    x = server.HWSets_getOne(hwset)
    assert check.greater(x[hwset][1], prevAvailable)

#13. logoff

#14. log in again and see if state persists
def test_log_in_again():
    username = 'A123'
    password = 'p456'
    x = server.login(username, password)
    hwset = 1
    y = server.HWSets_getOne(hwset)
    assert check.is_equal(y[hwset][1], 91)

#15. TA to create new id, login 

#16. try to create project with existing id
    #same as 5 I think

#17. join project id with existing id. Test if authorization works
def test_join_project_authorization():
    projectId = 1000
    x = server.projects_getByID(projectId)
    assert check.is_equal(x.get('Name'), 'P123')

#18. check in hardware set 2 (checkout by first user)
def test_checkin_hw2():
    hwset = 2
    projectId = 1000
    quantity = 10
    x = server.HWSets_checkIn(hwset, projectId, quantity)
    assert check.is_equal(x, 'Success')

#19. see if available quantities are increased
def test_increased_availability2():
    hwset = 2
    prevAvailable = 80
    x = server.HWSets_getOne(hwset)
    assert check.greater(x[hwset][1], prevAvailable)

#20. checkout hardware