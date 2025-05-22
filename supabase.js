// Initialize Supabase client
// const supabaseUrl = 'YOUR_SUPABASE_URL'
// const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

const supabaseUrl = 'https://svhjupycgwsooohqhhyl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2aGp1cHljZ3dzb29vaHFoaHlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NjMzNTYsImV4cCI6MjA2MzQzOTM1Nn0.g1ReajhRDJbFwUDcFlniuncGqUy9BTNictz9FoEKzIs'
const supabase = supabase.createClient(supabaseUrl, supabaseKey)

// Handle form submission
document.querySelector('.email-form').addEventListener('submit', async (e) => {
  e.preventDefault()
  
  const emailInput = document.querySelector('.email-input')
  const email = emailInput.value.trim()
  
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email }])
    
    if (error) throw error
    
    // Clear the input and show success message
    emailInput.value = ''
    alert('Thank you for joining our waitlist!')
  } catch (error) {
    console.error('Error:', error.message)
    alert('Sorry, there was an error. Please try again.')
  }
}) 