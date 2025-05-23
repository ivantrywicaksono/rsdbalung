import type { Route } from "./+types/home";
import axios from "axios";

import pelayananNyamanIcon from "~/assets/pelayanan-nyaman.svg";
import kualitasTerbaikIcon from "~/assets/kualitas-terbaik.svg";
import penangananCepatIcon from "~/assets/penanganan-cepat.svg";
import layananRamahIcon from "~/assets/layanan-ramah.svg";

import shortcutDokterIcon from "~/assets/shortcut-dokter.svg";
import shortcutJadwalIcon from "~/assets/shortcut-jadwal-dokter.svg";
import shortcutAduanIcon from "~/assets/shortcut-aduan.svg";

import waveImage from "~/assets/waves.svg";

import Banner from "~/components/Banner";
import MapsEmbed from "~/components/MapsEmbed";
import InstagramEmbed from "~/components/InstagramEmbed";
import NewsCard from "~/components/NewsCard";
import TextWithRect from "~/components/TextWithRect";
import LayananUnggulanCard from "~/components/LayananUnggulanCard";
import Slider from "~/components/Slider";

import type { News } from "~/models/News";
import type { BannerModel } from "~/models/Banner";

import { handleLoader, type LoaderResult } from "~/utils/handleLoader";
import type { Unggulan } from "~/models/Unggulan";
import HomeShortcut from "~/components/HomeShortcut";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Rumah Sakit Daerah Balung" },
    {
      name: "description",
      content: "Selamat Datang Di Website Rumah Sakit Daerah Balung!",
    },
  ];
}

export async function loader(): Promise<LoaderResult> {
  const bannerRequest = new URL(`${import.meta.env.VITE_API_URL}/banner/`);
  const unggulanRequest = new URL(
    `${import.meta.env.VITE_API_URL}/layanan-unggulan/`,
  );
  const newsRequest = new URL(`${import.meta.env.VITE_API_URL}/berita?page=1`);

  const bannerResponse = await handleLoader(() =>
    axios.get(bannerRequest.href),
  );
  const unggulanResponse = await handleLoader(() =>
    axios.get(unggulanRequest.href),
  );
  const newsResponse = await handleLoader(() => axios.get(newsRequest.href));

  // return handleLoader(() =>
  //   Promise.all([axios.get(newsRequest.href), axios.get(bannerRequest.href)]),
  // );
  const data = {
    banners: bannerResponse.data,
    unggulan: unggulanResponse.data,
    news: newsResponse.data,
  };

  return {
    success: true,
    message: "Selesai mendapatkan data",
    data,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const data = loaderData.data;
  const banners: BannerModel[] = data.banners || [];
  const unggulanData: Unggulan = loaderData?.data?.unggulan ?? {};
  const news = (data.news?.berita as News[]) || []; //{ berita: News[]; pagination: Pagination };

  const bannerList = Array.isArray(banners) ? banners.map((b) => b.gambar) : [];

  return (
    <>
      <Banner bannersSrc={bannerList} />
      {/* <img
        src={waveImage}
        className="absolute bottom-0 z-10 h-full w-full object-cover"
        alt="Waves"
      /> */}
      <section className="mt-8 flex flex-col items-center justify-center gap-4 min-md:flex-row">
        {/* <img
          src={waveImage}
          className="absolute z-10 h-full w-full object-cover"
          alt="Waves"
        /> */}
        <div className="flex flex-col items-center ps-6 min-md:items-start">
          <p className="text-xl text-blue-400 min-md:text-2xl">
            Selamat Datang di
          </p>
          <h1 className="text-4xl font-black text-persian-blue-950 uppercase min-md:text-5xl">
            RSD Balung
          </h1>
        </div>

        <div className="flex h-auto flex-wrap gap-2 p-6">
          {[
            { icon: shortcutDokterIcon, name: "Dokter", url: "/dokter" },
            {
              icon: shortcutJadwalIcon,
              name: "Jadwal Dokter",
              url: "/jadwal-dokter",
            },
            { icon: shortcutAduanIcon, name: "Aduan", url: "/aduan" },
          ].map((item, index) => (
            <HomeShortcut
              key={index}
              icon={item.icon}
              name={item.name}
              url={item.url}
            />
          ))}
        </div>
      </section>
      <section className="mt-8 flex flex-col items-center">
        <TextWithRect>KAMI BERKOMITMEN</TextWithRect>
        <div className="grid grid-cols-1 gap-6 p-8 lg:max-w-2/3 lg:grid-cols-2 lg:grid-rows-2">
          {[
            {
              icon: pelayananNyamanIcon,
              title: "Pelayanan Nyaman",
              description:
                "Didukung dengan fasilitas lengkap dan ruang perwatan yang bersih, memberikan kenyamanan maksimal bagi pasien.",
            },
            {
              icon: kualitasTerbaikIcon,
              title: "Kualitas Terbaik",
              description:
                "Pemeriksaan menyeluruh dan penanganan tepat oleh tenaga medis berpengalaman, membantu pemulihan lebih cepat.",
            },
            {
              icon: penangananCepatIcon,
              title: "Penanganan Cepat",
              description:
                "Dengan sistem pelayanan yang efisien, pasien mendapatkan perawatan tanpa harus menunggu lama.",
            },
            {
              icon: layananRamahIcon,
              title: "Layanan Ramah",
              description:
                "Keramahan dan kepedulian tim medis RSD Balung menjadikan pengalaman berobat lebih tenang dan menyenangkan.",
            },
          ].map((item, index) => (
            <article key={index} className="flex gap-4">
              <div className="aspect-square h-12 w-12 rounded-full bg-yellow-400 p-2">
                <img src={item.icon} className="h-full w-full" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-persian-blue-950">
                  {item.title}
                </h2>
                <p className="text-justify text-gray-600">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center p-4 max-sm:gap-y-2 lg:flex-row lg:gap-x-26 lg:p-16">
        <div className="lg:flex-1">
          <TextWithRect>{unggulanData.judul}</TextWithRect>
          <h2 className="text-2xl font-black text-persian-blue-950 lg:text-4xl">
            Layanan Unggulan Kami
          </h2>

          <p className="text-justify text-sm text-gray-600 lg:text-lg">
            {unggulanData.deskripsi}
          </p>
        </div>

        <div className="bg-sky-0 w-full overflow-hidden lg:flex-1">
          {Array.isArray(unggulanData?.gambarCaptions) &&
          unggulanData.gambarCaptions.length > 0 ? (
            <Slider>
              {unggulanData.gambarCaptions.map((item, index) => (
                <LayananUnggulanCard
                  key={index}
                  description={item.caption}
                  image={item.gambar}
                />
              ))}
            </Slider>
          ) : (
            <p className="text-gray-500">
              Belum ada layanan unggulan tersedia.
            </p>
          )}
        </div>
      </section>

      <section className="flex flex-col items-center bg-gradient-to-b from-dark-blue-900 to-dark-blue-950 p-4 max-sm:gap-y-2 lg:flex-row lg:gap-x-26 lg:p-16">
        <div className="h-full lg:flex-1">
          <TextWithRect textColor="text-white">INSTAGRAM</TextWithRect>
          <h2 className="text-2xl font-black text-white lg:text-4xl">
            Informasi Seputar Kesehatan dan Momen Lainnya
          </h2>

          <p className="text-justify text-sm text-white lg:text-lg">
            Ikuti kami di Instagram untuk mendapatkan informasi seputar
            kesehatan, layanan terbaru, dan momen menarik lainnya.
          </p>
        </div>

        {/* Slider cannot move the embed */}
        <div className="bg-sky-0 flex w-full items-center gap-2 overflow-x-auto lg:flex-1">
          <InstagramEmbed url="https://www.instagram.com/p/DILIx7czwOo/" />
          <InstagramEmbed url="https://www.instagram.com/p/DILIx7czwOo/" />
        </div>
      </section>

      <section className="p-5 lg:p-16">
        <TextWithRect>BERITA</TextWithRect>
        <p className="text-justify text-sm text-gray-600 lg:text-lg">
          Warta RSD Balung: Mengabari, Melayani, Menginspirasi
        </p>
        <div className="w-full">
          {news?.length > 0 ? (
            <Slider overlapSize={16}>
              {news.map((berita, index) => (
                <NewsCard
                  key={index}
                  id={berita.id}
                  title={berita.judul}
                  description={berita.ringkasan}
                  image={berita.gambar_sampul}
                  date={berita.tanggal_dibuat}
                />
              ))}
            </Slider>
          ) : (
            <p className="text-gray-500">{data.message}</p>
          )}
        </div>
      </section>

      <div className="flex w-full flex-col justify-between gap-4 p-4 min-md:flex-row min-md:px-20">
        <div className="flex flex-1 flex-col justify-between gap-4">
          <div className="rounded-lg bg-gradient-to-r from-blue-900 to-blue-300 px-8 py-4 text-white">
            <div className="text-white">
              <TextWithRect
                textColor="white"
                fontSize="min-md:text-2xl text-xl"
              >
                ALAMAT KAMI
              </TextWithRect>
            </div>
            <p className="font-light min-md:text-lg">
              Jl. Rambipuji, Kebonsari, Balung Lor, Kec. Balung, Jember, Jawa
              Timur 68161
            </p>
          </div>
          <div className="rounded-lg bg-gradient-to-r from-blue-900 to-blue-300 px-8 py-4 text-white">
            <TextWithRect textColor="white" fontSize="min-md:text-2xl text-xl">
              EMAIL KAMI
            </TextWithRect>
            <p className="font-light min-md:text-lg">
              rsd.balung@jemberkab.go.id
            </p>
          </div>
        </div>
        <div className="flex-1">
          <MapsEmbed />
        </div>
      </div>
      {/* 
      <h2 className="mt-4 mb-2 text-center text-2xl font-extrabold text-persian-blue-950 uppercase lg:text-3xl">
        Maps
      </h2>
      <div className="px-3 lg:px-10">
        <MapsEmbed />
      </div>

      <section className="mt-2 flex flex-col gap-2 p-1 text-center text-sm text-persian-blue-950 lg:font-semibold">
        <p>
          Jl. Rambipuji, Kebonsari, Balung Lor, Kec. Balung, Jember, Jawa Timur
          68161
        </p>

        <p>rsd.balung@jemberkab.go.id</p>
      </section> */}
    </>
  );
}
