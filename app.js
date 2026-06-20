
const supabaseUrl = "https://gjuinclcenygdvgazaju.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqdWluY2xjZW55Z2R2Z2F6YWp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5ODE0ODQsImV4cCI6MjA5NzU1NzQ4NH0.oxHWZqDXI4vjyg2xJkQA1r17ruiBl_XP0SF3ZFgqMOY"

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
