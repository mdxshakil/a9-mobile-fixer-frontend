import { PropsWithChildren } from "react";

const Container = ({ children }: PropsWithChildren) => {
  return <div className="max-w-[1367px] mx-auto px-3">{children}</div>;
};

export default Container;
