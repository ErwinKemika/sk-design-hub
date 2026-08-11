export const IMAGES = {
  hero1: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80",
  hero2: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80",
  hero3: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
  about: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  civil: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80",
  steel: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
  interior: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
  furniture: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
  page: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80",
  contact: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80",
} as const;

export const CATEGORIES = ["All", "Sipil", "Konstruksi Baja", "Interior", "Furniture"] as const;

const GOOGLE_MAPS_QUERY =
  "Sk.+Interior,+Jl.+Bayangkara+Pusdiklantas,+Paku+Jaya,+Kec.+Serpong+Utara,+Kota+Tangerang+Selatan,+Banten+15324";
const GOOGLE_MAPS_FTID = "0x2e69fbca24e9c1e5:0x5e0606a36c9798e2";

export const CONTACT = {
  address:
    "Jl. Bayangkara Pusdiklantas, Paku Jaya, Kec. Serpong Utara, Kota Tangerang Selatan, Banten 15324",
  phoneDisplay: "0813-8492-0084",
  whatsappUrl: "https://wa.me/6281384920084",
  email: "skinterior.design26@gmail.com",
  hours: "Senin – Minggu · 07.00 – 22.00 WIB",
  serviceArea: "Jabodetabek & sekitarnya",
  // Pinned to the exact "Sk. Interior" Google Business Profile, not just an address search.
  mapsUrl: `https://maps.google.com/maps?q=${GOOGLE_MAPS_QUERY}&ftid=${GOOGLE_MAPS_FTID}`,
  mapEmbedUrl: `https://www.google.com/maps?q=${GOOGLE_MAPS_QUERY}&ftid=${GOOGLE_MAPS_FTID}&output=embed`,
} as const;
