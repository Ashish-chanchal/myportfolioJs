const HeadingSec = ({title,description}:{title:string,description:string}) => {
  return (
    <div className=" md:pt-24 pt-16 relative">
      <div className="max-w-7xl mx-auto p-4 space-y-2">
        <h2 className="text-white text-3xl font-semibold">
          <span className="text-secondary">/</span>{title}
        </h2>
        <h3 className="text-white text-sm">{description}</h3>
      </div>
    </div>
  );
};

export default HeadingSec;
