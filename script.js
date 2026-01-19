// Set up colors and fonts for the website
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'theme-dark': '#121212',      // Dark background color
                'theme-surface': '#1E1E1E',   // Card background color
                'theme-sand': '#E3D5CA',      // Text and border color
                'theme-pink': '#E94560',      // Accent color
                'theme-pink-hover': '#c22f48',
            },
            fontFamily: {
                'mono': ['Courier New', 'Courier', 'monospace'], 
            }
        }
    }
}
