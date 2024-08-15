interface HeadingProps {
  title: string;
  icon?: React.ReactNode;
}

const Heading = ({ title, icon: Icon }: HeadingProps) => {
  return (
    <div className="text-center m-auto py-20">
      <div className="w-fit flex items-center m-auto md:m-0 gap-x-1 py-2 px-3 text-sm border rounded-full  border-sky-700 transition">
        {Icon && <span className="text-xl md:text-3xl">{Icon}</span>}
        <h2 className="text-md md:text-xl  text-center font-bold font-Cairo text-sky-700">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default Heading;
