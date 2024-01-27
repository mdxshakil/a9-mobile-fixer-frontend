import { PropsWithChildren } from "react";

const Container = ({ children }: PropsWithChildren) => {
  return <div className="max-w-[1367px] mx-auto">{children}</div>;
};

export default Container;
