
const supabaseUrl = "JOUW_URL"
const supabaseKey = "JOUW_ANON_KEY"

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)

// Taken ophalen
async function loadTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')

  const list = document.getElementById('taskList')
  list.innerHTML = ""

  data.forEach(task => {
    const li = document.createElement('li')
    li.textContent = task.title
    list.appendChild(li)
  })
}

// Taak toevoegen
async function addTask() {
  const input = document.getElementById('taskInput')

  await supabase
    .from('tasks')
    .insert([{ title: input.value }])

  input.value = ""
  loadTasks()
}

// Initial load
loadTasks()
