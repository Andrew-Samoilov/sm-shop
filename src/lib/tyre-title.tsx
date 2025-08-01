import { TyreTitleProps } from "@/types";
import { getSeasonLabel } from "@/lib";


export function TyreTitle({ title, country, date, season, applicability, diskProtection }: TyreTitleProps) {
  return (
    <p>
      {title}
      {season && (
        <span title="Сезон" className="text-light text-sm">{" "}{getSeasonLabel(season)} </span>
      )}
      {
        country && (
          <span title="Країна виробництва" className="text-light text-sm" >
            {applicability && (
              <span title="Застосовуваність">{" "}{applicability}</span>
            )}
            {diskProtection && (
              <span title="Захист диска">{" "}{diskProtection}</span>
            )}
            {" "}{country}
            {date && (
              <span title="Номер тижня та рік виробництва" > {" "}{date} </span>
            )}

          </span>
        )
      }
    </p>
  );
}
