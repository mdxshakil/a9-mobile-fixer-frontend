type IProps = {
  title: string;
  subTitle: string;
};

const SectionTitle = ({ title, subTitle }: IProps) => {
  return (
    <div className="mb-12 text-accent text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-1">
        {title}
      </h1>
      <p>{subTitle}</p>
    </div>
  );
};

export default SectionTitle;
