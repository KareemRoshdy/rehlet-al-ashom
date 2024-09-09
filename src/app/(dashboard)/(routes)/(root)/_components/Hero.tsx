import prisma from "@/lib/db";

const Hero = async () => {
  const banner = await prisma.banner.findFirst();

  return (
    <section
      id="home"
      className="relative bg-fixed bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${
          banner?.imageUrl ||
          "https://utfs.io/f/ec1032bc-6e62-4e30-8f5e-f0dc8239f02c-juod9m.jpeg"
        })`,
      }}
    >
      <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            {banner?.title}
            <strong className="block font-extrabold text-rose-500 mt-4">
              {banner?.subTitle}
            </strong>
          </h1>

          <p className="mt-5 max-w-lg text-white sm:text-xl/relaxed">
            {banner?.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
