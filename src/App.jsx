function App() {
  return (
    <div className="min-h-screen bg-brand-pink flex flex-col items-center justify-center p-8 text-center">
      
      {/* 1. Testing Heading Font + Maroon Color */}
      <h1 className="font-heading text-brand-maroon text-6xl md:text-8xl mb-4">
        Noelle Cakes
      </h1>

      {/* 2. Testing Accent Font + Gold Accent Color */}
      <h2 className="font-accent text-brand-accent text-3xl md:text-4xl mb-6">
        Handcrafted with love
      </h2>

      {/* 3. Testing Body Font + Dark Body Color */}
      <p className="font-body text-brand-body max-w-md mx-auto text-lg leading-relaxed mb-8">
        yYIf the title looks like Betty's beautiful decorative font, the background is pale pink, and this text is a clean, readable font... then your Tailwind v4 setup is 100% flawless!
      </p>

      {/* 4. Testing Button (Maroon bg + Pink text) */}
      <button className="bg-brand-maroon text-brand-pink font-body px-8 py-3 rounded-md shadow-sm hover:opacity-90 transition-opacity">
        Looks Good!
      </button>
      
    </div>
  )
}

export default App