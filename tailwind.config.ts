import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#C15F3C', // Terracotta — tombol aktif, harga, teks brand, nav active, chatbot icon bg
          hero: '#FDEAE4', // Peach muda — background hero section
          'img-placeholder': '#F1DFD9', // Pink-beige — placeholder gambar makanan
        },
        surface: {
          page: '#F4F3EE', // Cream off-white — background utama halaman & card
          card: '#F4F3EE', // Sama dengan page (flat design)
          'chatbot-overlay': 'rgba(177, 173, 161, 0.1)', // Glassmorphism chatbot teaser
        },
        border: {
          DEFAULT: '#DCC1B8', // Warm beige — card border, header/nav divider
          chip: '#89726B', // Medium brown — inactive chip/button outline
          chatbot: '#B1ADA1', // Warm gray — chatbot teaser border
        },
        content: {
          primary: '#231916', // Near-black warm brown — heading, body text utama
          secondary: '#56423C', // Medium warm brown — rating, subtext
          muted: '#615E54', // Warm gray — deskripsi, inactive nav label
          inverse: '#FFFFFF', // White — teks di atas brand.primary
        },
      },
      fontFamily: {
        sans: ['"42dot Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'nav': ['10px', { lineHeight: '15px', letterSpacing: '1px' }],
        'caption': ['14px', { lineHeight: '20px' }],
        'body': ['16px', { lineHeight: '24px' }],
        'heading': ['18px', { lineHeight: '28px' }],
      },
      borderRadius: {
        'card': '12px',
        'pill': '9999px',
      },
      spacing: {
        'page': '20px', // Padding kiri-kanan halaman
        'card-gap': '16px', // Gap antar food card
        'section-gap': '32px', // Gap antar section
      },
    },
  },
  plugins: [],
};
export default config;
