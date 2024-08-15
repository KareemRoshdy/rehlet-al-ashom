interface CourseImageAndDescriptionProps {
  title: string;
  description: string;
  imageUrl: string;
}

const CourseImageAndDescription = ({
  title,
  imageUrl,
  description,
}: CourseImageAndDescriptionProps) => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-72 overflow-hidden sm:h-80 lg:h-full rounded-md  shadow-md">
            <img
              alt={title}
              src={imageUrl}
              className="absolute inset-0 h-full w-full object-cover hover:scale-105 hover:rotate-1 transition"
            />
          </div>

          <div className="lg:py-16">
            <article className="space-y-4 text-gray-600">
              <p>{description}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseImageAndDescription;
