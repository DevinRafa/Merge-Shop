
export default function HomePage() {
  const foods = [
    {
      name: "Ayam Geprek Spesial",
      rating: 4.8,
      desc: "Pedasnya nendang...",
      price: "12.000",
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Nasi Rames Bu Siti",
      rating: 4.5,
      desc: "Dijamin kenyang",
      price: "10.000",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Rice Bowl Rejo",
      rating: 4.9,
      desc: "Saus sambal spesial",
      price: "10.000",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f6f1ea] font-switzer">
      {/* Mobile Container */}
      <section className="mx-auto flex min-h-screen w-full max-w-sm flex-col bg-[#f7f1ea]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-3 pt-5">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#c46b4b]" />
            <span className="text-sm font-medium text-[#7c4a3c]">
              Blater
            </span>
          </div>

          <button className="rounded-full p-1 text-[#c46b4b]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7h16M4 12h16M4 17h16"
              />
            </svg>
          </button>
        </div>

        {/* Banner */}
        <div className="px-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#d88a39] to-[#d76b2f] p-4 text-white">
            <div className="relative z-10 max-w-[180px]">
              <p className="text-2xl font-bold leading-tight">
                Nyatuin Rasa,
                <br />
                Kenyangin Mahasiswa
              </p>

              <p className="mt-2 text-[11px] opacity-90">
                Diskon terbaik
              </p>

              <p className="mt-1 text-xs font-medium">
                CASHBACK SAMPAI DENGAN
              </p>

              <h1 className="text-5xl font-extrabold leading-none">
                25.000
              </h1>
            </div>

            {/* Decorative Circle */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
            <div className="absolute bottom-0 right-0 h-28 w-28 rounded-full bg-black/10" />

            {/* Character Placeholder */}
            <div className="absolute bottom-0 right-3 flex items-end gap-2">
              <div className="h-24 w-16 rounded-t-full bg-[#2f2f2f]" />
              <div className="h-20 w-14 rounded-t-full bg-[#ffe4cf]" />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mt-5 flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-hide">
          <button className="rounded-full bg-[#bb6a49] px-5 py-2 text-sm font-semibold text-white shadow-sm">
            Paling Laku
          </button>

          <button className="rounded-full border border-[#d8c8bb] bg-[#f7f1ea] px-5 py-2 text-sm text-[#7d6f66]">
            Promo
          </button>

          <button className="rounded-full border border-[#d8c8bb] bg-[#f7f1ea] px-5 py-2 text-sm text-[#7d6f66]">
            Terdekat
          </button>
        </div>

        {/* Food List */}
        <div className="mt-4 flex flex-1 flex-col gap-4 px-4 pb-28">
          {foods.map((food, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-2xl border border-[#e6ddd5] bg-[#f8f3ed] p-2 shadow-[0_2px_10px_rgba(0,0,0,0.03)]"
            >
              <img
                src={food.image}
                alt={food.name}
                className="h-24 w-24 rounded-xl object-cover"
              />

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="text-[15px] font-semibold text-[#3b2b24]">
                    {food.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-1 text-sm text-[#7b7069]">
                    <span>⭐</span>
                    <span>{food.rating}</span>
                  </div>

                  <p className="mt-1 text-xs text-[#9b9087]">
                    {food.desc}
                  </p>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <p className="text-base font-bold text-[#c8643d]">
                    Rp {food.price}
                  </p>

                  <button className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d8c8bb] text-[#c8643d] transition hover:bg-[#c8643d] hover:text-white">
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-1/2 z-50 flex w-full max-w-sm -translate-x-1/2 items-center justify-around rounded-t-3xl border-t border-[#e5d8cc] bg-[#f4ece4] px-6 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <button className="flex flex-col items-center gap-1 text-[#c8643d]">
            <div className="rounded-xl bg-[#c8643d] p-2 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2L2 8h2v8h5v-5h2v5h5V8h2L10 2z" />
              </svg>
            </div>

            <span className="text-[10px] font-semibold">HOME</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-[#8d8178]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            <span className="text-[10px]">SEARCH</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-[#8d8178]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A9 9 0 1118.88 17.8M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            <span className="text-[10px]">ACCOUNT</span>
          </button>
        </nav>
      </section>
    </main>
  );
}
