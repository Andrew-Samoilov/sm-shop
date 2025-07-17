import { TyreTitleProps } from "@/types";


export function TyreTitle({ title, country, date, season }: TyreTitleProps) {
  return (
    <p>
      {title}
      {season && (
        <span title="Сезон" className="text-light text-sm">{" "}{season} </span>
      )}
      {
        country && (
          <span title="Країна виробництва" className="text-light text-sm" >
            {" "}{country}
            {
              date && (
                <span title="Номер тижня та рік виробництва" > {" "}{date} </span>
              )
            }
   
          </span>
        )
      }
    </p>
  );
}
