import { IMAGES } from "@/lib/site-data";
import type { PortfolioCategory } from "@/lib/supabase";

export interface ServiceDetail {
  slug: string;
  tag: string;
  title: string;
  category: PortfolioCategory;
  img: string;
  shortDesc: string;
  heroSubtitle: string;
  seoTitle: string;
  seoDescription: string;
  intro: string[];
  items: string[];
  process: { title: string; desc: string }[];
}

export const SERVICES: ServiceDetail[] = [
  {
    slug: "custom-furniture",
    tag: "01",
    title: "Custom Furniture",
    category: "Furniture",
    img: IMAGES.furniture,
    shortDesc:
      "Furniture dirancang khusus untuk ukuran, material, dan gaya ruang Anda. Presisi milimeter, hasil akhir yang rapi dan tahan lama.",
    heroSubtitle:
      "Setiap detail furniture dirancang khusus mengikuti ukuran ruang, kebutuhan fungsi, dan karakter interior Anda.",
    seoTitle: "Jasa Custom Furniture | SK.INTERIOR.DESIGN",
    seoDescription:
      "Custom furniture presisi milimeter: kitchen set, wardrobe, meja kerja, hingga furniture custom lainnya. Konsultasi, desain, produksi, dan instalasi oleh tim berpengalaman sejak 2003.",
    intro: [
      "Furniture custom SK.INTERIOR.DESIGN dirancang untuk menjawab kebutuhan yang tidak bisa dipenuhi furniture pabrikan, ukuran ruang yang presisi, karakter material yang sesuai gaya hidup, dan detail fungsi yang benar-benar terpakai sehari-hari.",
      "Dari kitchen set, wardrobe, hingga meja kerja, setiap unit dibuat berdasarkan pengukuran langsung di lokasi dan gambar kerja yang disetujui bersama, sehingga hasil akhir presisi milimeter dan pas dengan ruang Anda.",
      "Sejak 2003, kami telah menangani ratusan proyek furniture custom untuk rumah tinggal maupun ruang komersial, dengan standar produksi dan finishing yang konsisten di setiap proyek.",
    ],
    items: [
      "Kitchen set custom",
      "Lemari & wardrobe custom",
      "Meja kerja, meja makan, meja custom",
      "Pilihan material: HPL, duco, solid wood, multiplex",
      "Furniture custom lainnya sesuai kebutuhan",
    ],
    process: [
      {
        title: "Survey & Konsultasi",
        desc: "Tim kami datang mengukur ruang secara langsung dan mendiskusikan kebutuhan, gaya, dan budget Anda.",
      },
      {
        title: "Desain & Pemilihan Material",
        desc: "Kami buatkan gambar kerja beserta rekomendasi material sesuai fungsi, tampilan, dan daya tahan yang diinginkan.",
      },
      {
        title: "Produksi di Workshop",
        desc: "Furniture diproduksi presisi milimeter di workshop kami dengan quality control di setiap tahap.",
      },
      {
        title: "Pengiriman & Instalasi",
        desc: "Pemasangan dilakukan oleh tim berpengalaman, memastikan hasil akhir rapi dan sesuai gambar kerja.",
      },
    ],
  },
  {
    slug: "sipil",
    tag: "02",
    title: "Jasa Pekerjaan Sipil",
    category: "Sipil",
    img: IMAGES.civil,
    shortDesc:
      "Layanan konstruksi sipil menyeluruh, dari pondasi hingga finishing struktur bangunan. Kami menangani proyek residensial dan komersial dengan pendekatan teknis yang matang.",
    heroSubtitle:
      "Konstruksi sipil menyeluruh dari pondasi hingga finishing, ditangani dengan pendekatan teknis yang matang.",
    seoTitle: "Jasa Pekerjaan Sipil | SK.INTERIOR.DESIGN",
    seoDescription:
      "Jasa konstruksi sipil untuk proyek residensial dan komersial: pembangunan struktur baru, renovasi, pondasi, hingga manajemen proyek end-to-end sejak 2003.",
    intro: [
      "Layanan konstruksi sipil menyeluruh, dari pondasi hingga finishing struktur bangunan. Kami menangani proyek residensial dan komersial dengan pendekatan teknis yang matang, mulai dari perencanaan hingga serah terima.",
      "Setiap proyek diawali dengan survey lokasi dan perhitungan struktur yang matang, sehingga rencana anggaran biaya dan timeline yang disepakati benar-benar mencerminkan kondisi lapangan, bukan sekadar estimasi di atas kertas.",
      "Sejak 2003, kami telah menangani berbagai proyek sipil, dari pembangunan rumah tinggal hingga renovasi ruko dan bangunan komersial, dengan standar pengawasan mutu yang konsisten di setiap tahap pengerjaan.",
    ],
    items: [
      "Pembangunan struktur baru",
      "Renovasi & pengembangan bangunan",
      "Pondasi & pekerjaan beton",
      "Manajemen proyek end-to-end",
    ],
    process: [
      {
        title: "Survey & Perencanaan",
        desc: "Peninjauan lokasi dan penyusunan rencana teknis sesuai kebutuhan dan kondisi lahan.",
      },
      {
        title: "RAB & Kesepakatan",
        desc: "Penyusunan rencana anggaran biaya dan timeline yang disepakati bersama sebelum eksekusi.",
      },
      {
        title: "Pelaksanaan Konstruksi",
        desc: "Pengerjaan di lapangan dengan pengawasan teknis dan kontrol kualitas berkala.",
      },
      {
        title: "Serah Terima & Garansi",
        desc: "Pemeriksaan akhir bersama klien, dilanjutkan serah terima dengan masa garansi pengerjaan.",
      },
    ],
  },
  {
    slug: "konstruksi-baja",
    tag: "03",
    title: "Konstruksi Baja",
    category: "Konstruksi Baja",
    img: IMAGES.steel,
    shortDesc:
      "Struktur baja presisi untuk berbagai kebutuhan, mulai kanopi rumah hingga gudang industri berskala besar. Fabrikasi in-house dengan quality control ketat.",
    heroSubtitle:
      "Struktur baja presisi untuk kebutuhan rumah tinggal hingga industri, difabrikasi in-house dengan quality control ketat.",
    seoTitle: "Jasa Konstruksi Baja | SK.INTERIOR.DESIGN",
    seoDescription:
      "Fabrikasi dan instalasi konstruksi baja: kanopi, rangka atap, struktur gudang, mezzanine, hingga fabrikasi baja custom sesuai gambar kerja.",
    intro: [
      "Struktur baja presisi untuk berbagai kebutuhan, mulai kanopi rumah hingga gudang industri berskala besar. Fabrikasi in-house dengan quality control ketat memastikan setiap struktur kuat dan sesuai spesifikasi.",
      "Setiap struktur dihitung sesuai beban dan fungsi bangunan, lalu difabrikasi presisi di workshop sebelum dipasang di lokasi, sehingga proses instalasi lebih cepat dan hasil akhir lebih presisi dibanding pengerjaan konvensional di lapangan.",
      "Kami telah menangani berbagai skala proyek baja, dari kanopi rumah tinggal hingga struktur gudang dan pabrik berskala industri, dengan kontrol kualitas material dan pengelasan di setiap tahap fabrikasi.",
    ],
    items: [
      "Rangka atap & kanopi baja ringan/berat",
      "Struktur gudang & pabrik",
      "Mezzanine & platform baja",
      "Fabrikasi baja custom sesuai gambar",
    ],
    process: [
      {
        title: "Survey & Desain Struktur",
        desc: "Pengukuran lokasi dan perhitungan struktur baja sesuai beban dan kebutuhan fungsi.",
      },
      {
        title: "Fabrikasi di Workshop",
        desc: "Komponen baja difabrikasi presisi di workshop dengan pengawasan kualitas material dan pengelasan.",
      },
      {
        title: "Pengangkutan & Erection",
        desc: "Pemasangan struktur di lokasi oleh tim berpengalaman dengan standar keselamatan kerja.",
      },
      {
        title: "QC & Serah Terima",
        desc: "Pemeriksaan kekuatan dan kerapian struktur sebelum serah terima ke klien.",
      },
    ],
  },
  {
    slug: "interior",
    tag: "04",
    title: "Desain & Interior",
    category: "Interior",
    img: IMAGES.interior,
    shortDesc:
      "Menerjemahkan gaya hidup dan identitas brand Anda ke dalam ruang, dari konsep, 3D render, hingga eksekusi finishing yang matang.",
    heroSubtitle:
      "Menerjemahkan gaya hidup dan identitas Anda ke dalam ruang, dari konsep hingga eksekusi finishing yang matang.",
    seoTitle: "Jasa Desain Interior | SK.INTERIOR.DESIGN",
    seoDescription:
      "Jasa desain interior rumah tinggal dan ruang komersial: konsultasi konsep, moodboard, 3D render, hingga eksekusi finishing menyeluruh.",
    intro: [
      "Menerjemahkan gaya hidup dan identitas brand Anda ke dalam ruang, dari konsep, 3D render, hingga eksekusi finishing yang matang, untuk rumah tinggal maupun ruang komersial.",
      "Proses dimulai dari memahami kebutuhan dan gaya hidup Anda, dilanjutkan dengan visualisasi 3D dan pemilihan material, sehingga Anda bisa membayangkan hasil akhir sebelum eksekusi dimulai.",
      "Tim kami menangani interior rumah tinggal maupun ruang komersial dengan standar finishing yang konsisten, memastikan setiap detail, dari material hingga styling akhir, selaras dengan konsep yang telah disepakati.",
    ],
    items: [
      "Interior rumah tinggal",
      "Interior kantor & ruang komersial",
      "Konsultasi konsep & moodboard",
      "Finishing interior menyeluruh",
    ],
    process: [
      {
        title: "Konsultasi & Konsep",
        desc: "Menggali kebutuhan, gaya hidup, dan preferensi desain untuk menentukan arah konsep ruang.",
      },
      {
        title: "Desain 3D & Moodboard",
        desc: "Visualisasi ruang dalam bentuk 3D render dan moodboard material sebelum eksekusi.",
      },
      {
        title: "Eksekusi & Finishing",
        desc: "Pengerjaan di lapangan dengan pengawasan kualitas material dan detail finishing.",
      },
      {
        title: "Styling Akhir",
        desc: "Penataan akhir ruang agar sesuai visualisasi dan siap digunakan.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
