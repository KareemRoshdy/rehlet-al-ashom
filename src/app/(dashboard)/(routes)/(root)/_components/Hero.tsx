const Hero = () => {
  return (
    <section
      id="home"
      className="relative bg-fixed bg-[url(https://utfs.io/f/10bc6b4d-7d73-442d-a18c-45d2081b8cad-n3ch5g.jpg)] bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            مرحبا بكم في
            <strong className="block font-extrabold text-rose-500 mt-4">
              رحلة الأسهم
            </strong>
          </h1>

          <p className="mt-5 max-w-lg text-white sm:text-xl/relaxed">
            اكتشف أحدث استراتيجيات التداول، نصائح الأسهم، وتوصيات الخبراء التي
            تضعك في صدارة النجاح المالي. مع خططنا المدروسة بعناية، نحن هنا
            لنساعدك على تحقيق أفضل النتائج في عالم الاستثمار. انضم إلينا اليوم
            وابدأ رحلتك نحو مستقبل مالي مزدهر!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
