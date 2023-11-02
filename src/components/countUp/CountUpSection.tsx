/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { useGetStatsQuery } from "../../redux/features/stat/statApi";

const CountUpSection = () => {
  const [counterOn, setCounterOn] = useState(false);
  const { data: stats } = useGetStatsQuery(undefined);

  const { userCount, orderCount, serviceCount } = stats?.data || {};

  return (
    // @ts-ignore
    <ScrollTrigger
      onEnter={() => setCounterOn(true)}
      onExit={() => setCounterOn(false)}
    >
      <div>
        <div className="stats stats-vertical lg:stats-horizontal shadow w-full text-center mt-12">
          <div className="stat">
            <div className="stat-title">Total Services</div>
            <div className="stat-value text-primary">
              {counterOn && <CountUp start={100} end={serviceCount} />}
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">Trusted Clients</div>
            <div className="stat-value text-primary">
              {counterOn && <CountUp start={100} end={userCount} />}
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">Completed Orders</div>
            <div className="stat-value text-primary">
              {counterOn && <CountUp start={100} end={orderCount} />}
            </div>
          </div>
        </div>
      </div>
    </ScrollTrigger>
  );
};

export default CountUpSection;
