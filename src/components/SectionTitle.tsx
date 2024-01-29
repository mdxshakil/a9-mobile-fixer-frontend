type IProps = {
  title: string;
  subTitle: string;
  subTitleClasses?: string;
  titleClasses?: string;
};

const SectionTitle = ({
  title,
  subTitle,
  subTitleClasses,
  titleClasses,
}: IProps) => {
  return (
    <div className="mb-6 md:mb-12 text-accent text-center">
      <h1
        className={`${titleClasses} text-3xl md:text-4xl font-bold text-center mb-1`}
      >
        {title}
      </h1>
      <p className={`${subTitleClasses} text-accent text-sm md:text-lg`}>{subTitle}</p>
    </div>
  );
};

export default SectionTitle;
