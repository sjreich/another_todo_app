json.tasks @tasks do |task|
  json.partial!('task', task: task)
end
