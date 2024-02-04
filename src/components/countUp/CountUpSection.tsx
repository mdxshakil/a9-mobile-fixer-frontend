/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { useGetStatsQuery } from "../../redux/features/stat/statApi";

const CountUpSection = () => {
  const [counterOn, setCounterOn] = useState(false);
  const { data: stats, isLoading } = useGetStatsQuery(undefined);

  const { userCount, orderCount, serviceCount } = stats?.data || {};

  return (
    // @ts-ignore
    <ScrollTrigger
      onEnter={() => setCounterOn(true)}
      onExit={() => setCounterOn(false)}
    >
      <div className="px-4 md:px-8">
        <div className="stats stats-vertical lg:stats-horizontal shadow-sm shadow-primary/50 w-full text-center">
          <div className="stat">
            <div className="stat-title">Total Services</div>
            {isLoading ? (
              <div className="skeleton w-1/3 h-6 rounded-lg mx-auto"></div>
            ) : (
              <div className="stat-value text-accent">
                {counterOn && <CountUp start={100} end={serviceCount} />}
              </div>
            )}
          </div>

          <div className="stat">
            <div className="stat-title">Trusted Clients</div>

            {isLoading ? (
              <div className="skeleton w-1/3 h-6 rounded-lg mx-auto"></div>
            ) : (
              <div className="stat-value text-accent">
                {counterOn && <CountUp start={100} end={userCount} />}
              </div>
            )}
          </div>

          <div className="stat">
            <div className="stat-title">Completed Orders</div>
            {isLoading ? (
              <div className="skeleton w-1/3 h-6 rounded-lg mx-auto"></div>
            ) : (
              <div className="stat-value text-accent">
                {counterOn && <CountUp start={100} end={orderCount} />}
              </div>
            )}
          </div>
        </div>
      </div>
    </ScrollTrigger>
  );
};

export default CountUpSection;
