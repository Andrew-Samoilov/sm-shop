import { TyreTitleProps } from "@/types";
import { getSeasonLabel } from "@/lib";


export function TyreTitle({ country, date, season, applicability, diskProtection }: TyreTitleProps) {
  return (
    <p className="md:flex flex-col">
      {season && (
        <span title="Сезон" className="text-light ">{" "}{getSeasonLabel(season)} </span>
      )}
      {country && (
        <span title="Країна виробництва" className="text-light text-sm" >
          {country}{" "}
        </span>)}
      {date && (
        <span title="Номер тижня та рік виробництва" className="text-light  text-sm">{date} </span>
      )}
      {applicability && (
        <span title="Застосовуваність" className="text-light  text-sm">{applicability}</span>
      )}
      {diskProtection && (
        <span title="Захист диска" className="text-light  text-sm">{diskProtection}</span>
      )}



    </p>
  );
}
