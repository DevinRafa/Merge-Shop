import type { ChatMessage } from '@/lib/types'

const RESPONSE_MAP: Record<string, string[]> = {
  ayam: [
    'Mau ayam? Cobain Ayam Geprek Spesial di Warung Bu Tini! Rating 4.9, cuma Rp 12.000. Buka sampai jam 21:00.',
    'Warung Bu Tini punya Ayam Penyet dan Ayam Geprek, sambalnya bisa request level pedasnya. Recommended banget!',
  ],
  soto: [
    'Soto Riyanto adalah pilihan terbaik! Rating 4.8, kuah bening gurih, buka sampai jam 20:00. Porsi soto daging mulai Rp 18.000.',
    'Kalau mau soto, Soto Riyanto udah jadi legenda di Purbalingga. Jangan lupa pesan soto ayam campurnya!',
  ],
  bakso: [
    'Bakso Pak Broto top! Rating 4.6, bakso kompletnya Rp 15.000. Ada varian bakso isi keju yang lagi viral!',
    'Pak Broto bawa resep bakso dari Solo — kenyal dan kuahnya autentik. Buka jam 09:00-17:00.',
  ],
  nasi: [
    'Nasi Goreng Rejo hits banget buat malam hari. Rice Bowl-nya juga enak! Buka mulai jam 17:00 sampai tengah malam.',
    'Warung Mbah Darmi punya Nasi Rames Spesial yang komplit, harga Rp 15.000 sudah dapat nasi + 3 sayur + lauk.',
  ],
  murah: [
    'Pilihan hemat: Es Teh Manis Rp 3.000 di Warung Mbah Darmi, Soto Ayam Rp 12.000 di Soto Riyanto, atau Nasi Rames Rp 15.000.',
    'Budget makan siang Rp 20.000? Coba Nasi Rames Mbah Darmi (Rp 15.000) + Es Teh (Rp 3.000) = Rp 18.000, kenyaaang!',
  ],
  buka: [
    'Yang buka paling malam: Nasi Goreng Rejo (sampai jam 24:00 Jumat-Sabtu) dan Warung Bu Tini (sampai 21:00).',
    'Warung yang buka lama: Soto Riyanto 08:00-20:00 · Bu Tini 10:00-21:00 · Nasi Goreng Rejo 17:00-23:00.',
  ],
  tradisional: [
    'Warung Mbah Darmi (sejak 1987) dan Soto Riyanto (sejak 1995) adalah warung tradisional terpercaya di Purbalingga!',
  ],
  minum: [
    'Es Dawet Bu Sari di Pasar Segamas paling segar! Hanya Rp 5.000. Atau Es Jeruk Peras di Bu Tini Rp 5.000.',
  ],
  dawet: [
    'Es Dawet Bu Sari sudah berjalan sejak 1975! Santan segar, dawet kenyal, harga Rp 5.000. Buka pagi sampai siang.',
  ],
  rekomendasi: [
    'Top pick MINJAN hari ini: 🍗 Ayam Geprek Bu Tini · 🍜 Soto Riyanto · 🍚 Nasi Goreng Rejo. Semua rating 4.6+!',
  ],
  dekat: [
    'Semua UMKM di Blater berada di pusat Purbalingga, radius 5km. Warung Mbah Darmi, Soto Riyanto, dan Bu Tini berdekatan di area Alun-Alun.',
  ],
}

const TIME_GREETINGS: Record<string, string> = {
  pagi: 'Selamat pagi! Sarapan dulu yuk? Warung Mbah Darmi buka dari jam 07:00.',
  siang: 'Sudah waktunya makan siang! MINJAN rekomendasikan Soto Riyanto atau Nasi Rames Mbah Darmi.',
  sore: 'Sore-sore lapar? Warung Bu Tini dan Bakso Pak Broto masih buka sampai malam!',
  malam: 'Lapar malam? Nasi Goreng Rejo buka sampai jam 23:00, cocok buat dinner!',
}

export function getTimeBasedGreeting(): string {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 11) return TIME_GREETINGS.pagi
  if (hour >= 11 && hour < 15) return TIME_GREETINGS.siang
  if (hour >= 15 && hour < 18) return TIME_GREETINGS.sore
  return TIME_GREETINGS.malam
}

export function getAutoSuggestions(): string[] {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 11) {
    return ['Rekomendasi sarapan', 'Warung yang buka pagi', 'Nasi rames murah']
  }
  if (hour >= 11 && hour < 15) {
    return ['Makan siang hemat', 'Soto enak', 'Warung dekat sini']
  }
  if (hour >= 15 && hour < 18) {
    return ['Jajanan sore', 'Minuman segar', 'Es dawet']
  }
  return ['Warung buka malam', 'Nasi goreng', 'Bakso enak']
}

export function getMockAIResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase()

  for (const [keyword, responses] of Object.entries(RESPONSE_MAP)) {
    if (msg.includes(keyword)) {
      return responses[Math.floor(Math.random() * responses.length)]
    }
  }

  const fallbacks = [
    'Hmm, MINJAN belum punya info spesifik tentang itu. Coba tanya tentang: ayam geprek, soto, bakso, nasi goreng, atau pilihan warung murah!',
    'Mau MINJAN bantu cariin apa? Bisa tanya soal harga, jam buka, atau rekomendasi menu di Purbalingga.',
    'Wah, pertanyaan menarik! Untuk info lebih lengkap, coba fitur Search ya. Tapi kalau mau rekomendasi makanan enak, MINJAN siap bantu!',
  ]

  return fallbacks[Math.floor(Math.random() * fallbacks.length)]
}

export function getStoreChatResponse(storeName: string, userMessage: string): string {
  const msg = userMessage.toLowerCase()

  if (msg.includes('menu') || msg.includes('ada apa') || msg.includes('makanan')) {
    return `${storeName} punya berbagai pilihan menu yang bisa kamu lihat di bawah halaman ini. Ada yang mau direkomendasikan?`
  }
  if (msg.includes('buka') || msg.includes('jam') || msg.includes('tutup')) {
    return `Kamu bisa lihat jam operasional ${storeName} di bagian atas halaman ini. Kalau ada perubahan mendadak, biasanya diumumkan di status toko.`
  }
  if (msg.includes('lokasi') || msg.includes('alamat') || msg.includes('mana')) {
    return `Lokasi ${storeName} sudah tertera di halaman ini. Kamu juga bisa buka peta dengan tap ikon lokasi di atas!`
  }
  if (msg.includes('enak') || msg.includes('favorit') || msg.includes('popular') || msg.includes('laris')) {
    return `Menu paling laris di ${storeName} ditandai dengan label 🔥 LARIS di fotonya. Biasanya itu yang paling banyak dipesan pelanggan!`
  }
  if (msg.includes('pesan') || msg.includes('order') || msg.includes('beli')) {
    return `Untuk pesan, tinggal tap tombol + di menu yang kamu mau, lalu cek keranjang di pojok kanan atas. Bayar bisa pakai QRIS atau cash!`
  }

  return `Ada yang bisa saya bantu tentang ${storeName}? Kamu bisa tanya soal menu, harga, jam buka, atau cara pesan!`
}

export const INITIAL_BOT_MESSAGE: ChatMessage = {
  role: 'bot',
  content: 'Halo! Saya MINJAN 🤖 AI asisten kuliner Purbalingga. Mau cari makanan apa hari ini? Tanya aja, saya bantu rekomendasikan!',
}
