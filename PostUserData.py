def postData(first, last, new_user_id, new_user_passwd):
    with open('FakeDatabase_Users.txt', 'a') as fake_database:
        # print("System: Writing to file")
        construct_line = new_user_id + "\t\t" + new_user_passwd + "\n"
        fake_database.write(construct_line)
