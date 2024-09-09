const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.banner.create({
      data: {
        title: "مرحبا بكم في",
        subTitle: "رحلة الأسهم",
        description:
          "اكتشف أحدث استراتيجيات التداول، نصائح الأسهم، وتوصيات الخبراء التي تضعك في صدارة النجاح المالي. مع خططنا المدروسة بعناية، نحن هنا لنساعدك على تحقيق أفضل النتائج في عالم الاستثمار. انضم إلينا اليوم وابدأ رحلتك نحو مستقبل مالي مزدهر!",
        imageUrl:
          "https://utfs.io/f/ec1032bc-6e62-4e30-8f5e-f0dc8239f02c-juod9m.jpeg",
      },
    });
    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database Banner", error);
  } finally {
    await database.$disconnect();
  }
}

main();
