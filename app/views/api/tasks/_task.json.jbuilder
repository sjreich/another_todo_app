json.ignore_nil!

json.id task.id
json.title task.title
json.description task.description
json.is_complete task.complete?
json.created_at task.created_at
