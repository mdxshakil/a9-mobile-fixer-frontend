import { PropsWithChildren } from "react";

const Container = ({ children }: PropsWithChildren) => {
  return <div className="max-w-7xl mx-auto">{children}</div>;
};

export default Container;
