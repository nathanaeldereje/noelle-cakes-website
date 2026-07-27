import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

function App() {
  const [status, setStatus] = useState('Connecting to Supabase...')

  useEffect(() => {
    async function testConnection() {
      // Try to fetch categories from your new table
      const { data, error } = await supabase.from('categories').select('*')
      
      if (error) {
        console.error("Error connecting:", error)
        setStatus('❌ Connection Failed! Check console.')
      } else {
        console.log("Supabase connected! Data:", data)
        setStatus('✅ Supabase Connected Successfully!')
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-brand-pink flex flex-col items-center justify-center p-8 text-center">
      <h1 className="font-heading text-brand-maroon text-5xl mb-4">
        Database Test
      </h1>
      <p className="font-body text-brand-body text-xl bg-white px-6 py-3 rounded-lg shadow-sm">
        {status}
      </p>
    </div>
  )
}

export default App