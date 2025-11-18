import { TyreTitleProps } from "@/types";
import { getSeasonLabel } from "@/lib";


export function TyreTitle({ title, country, date, season, applicability }: TyreTitleProps) {
  return (
    <p>
      {title}
      {season && (
        <span title="Сезон" className="text-light ">{" "}{getSeasonLabel(season)} </span>
      )}
      {country && (
        <span title="Країна виробництва" className="text-light text-sm" >
          {country}
        </span>)}
      {date && (
        <span title="Номер тижня та рік виробництва" className="text-light  text-sm">{" "}{date} </span>
      )}
      {applicability && (
        <span title="Застосовуваність" className="text-light  text-sm">{applicability}</span>
      )}

    </p>
  );
}
