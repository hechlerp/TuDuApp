json.array!(@todos) do |todo|
	json.partial!('api/todos/todo', todo: todo, show_list: false)
end
