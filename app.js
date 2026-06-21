
const supabaseUrl = "https://gjuinclcenygdvgazaju.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqdWluY2xjZW55Z2R2Z2F6YWp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5ODE0ODQsImV4cCI6MjA5NzU1NzQ4NH0.oxHWZqDXI4vjyg2xJkQA1r17ruiBl_XP0SF3ZFgqMOY"

const client = window.supabase.createClient(supabaseUrl, supabaseKey)

function formatDate(str) {
  const d = new Date(str)
  return d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

function renderTasks(tasks) {
  const list = document.getElementById('taskList')
  if (!tasks.length) {
    list.innerHTML = '<p style="text-align:center;color:#555577;padding:2rem 0;">Geen taken gevonden</p>'
    return
  }
  list.innerHTML = tasks.map(task => `
    <div class="task-item ${task.done ? 'done' : ''}">
      <div class="task-check ${task.done ? 'checked' : ''}" onclick="toggleTask(${task.id}, ${task.done})">
        ${task.done ? '<i class="ti ti-check" style="font-size:13px;color:#fff"></i>' : ''}
      </div>
      <span class="task-title">${task.title}</span>
      <span class="task-meta">${formatDate(task.created_at)}</span>
      <button class="task-delete" onclick="deleteTask(${task.id})">
        <i class="ti ti-trash"></i>
      </button>
    </div>
  `).join('')
}

async function loadTasks() {
  const { data, error } = await client
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) { console.error(error); return; }
  renderTasks(data)
}

async function addTask() {
  const input = document.getElementById('taskInput')
  if (!input.value.trim()) return
  await client
    .from('tasks')
    .insert([{ title: input.value.trim(), done: false }])
  input.value = ''
  loadTasks()
}

async function toggleTask(id, currentDone) {
  await client
    .from('tasks')
    .update({ done: !currentDone })
    .eq('id', id)
  loadTasks()
}

async function deleteTask(id) {
  await client
    .from('tasks')
    .delete()
    .eq('id', id)
  loadTasks()
}

loadTasks()