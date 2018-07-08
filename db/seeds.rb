user_1 = User.create(username: 'testuser1', email: 'email1@gmail.com', password: 'password')
user_2 = User.create(username: 'testuser2', email: 'email2@gmail.com', password: 'password')

Task.create(title: 'title', user: user_1)
Task.create(title: 'Longer title', description: 'This is a long description', user: user_1)
Task.create(title: 'Completed', completed_at: Time.current, user: user_1)

Task.create(title: 'title', user: user_2)
